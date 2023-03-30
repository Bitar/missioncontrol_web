import {Field, Form, Formik} from 'formik'
import React, {FC, useEffect, useState} from 'react'
import {initialQueryState} from '../../../helpers/crud-helper/models'
import {useQueryRequest} from '../../../modules/table/QueryRequestProvider'
import {Col, Collapse, Row} from 'react-bootstrap'
import {createFilterQueryParam} from '../../../helpers/requests'
import {genericOnChangeHandler} from '../../../helpers/form'
import FilterFormFooter from '../../../components/form/FilterFormFooter'

const initCommunityFilterObj = {
  first_name: '',
  last_name: '',
  email: '',
}

type CommunityFilterObj = {
  first_name: string
  last_name: string
  email: string
}

interface Props {
  showFilter: boolean
  setExportQuery: React.Dispatch<React.SetStateAction<string>>
}

const CommunityActivityFilters: FC<Props> = ({showFilter, setExportQuery}) => {
  const {updateState} = useQueryRequest()
  const [communityFilters, setCommunityFilters] =
    useState<CommunityFilterObj>(initCommunityFilterObj)

  const [reset, setReset] = useState<boolean>(false)

  const resetFilter = () => {
    setCommunityFilters(initCommunityFilterObj)
    setReset(true)
  }

  const handleFilter = () => {
    setExportQuery(createFilterQueryParam(communityFilters))

    updateState({
      filter: reset ? undefined : communityFilters,
      ...initialQueryState,
    })
  }

  useEffect(() => {
    handleFilter()
    setReset(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset])

  const handleOnChange = (e: any) =>
    genericOnChangeHandler(e, communityFilters, setCommunityFilters)

  return (
    <Collapse in={showFilter}>
      <Row id='#communities-users-list-filter'>
        <Col>
          <div className='card-rounded bg-primary bg-opacity-5 p-10 mb-15'>
            <Formik initialValues={communityFilters} onSubmit={handleFilter} enableReinitialize>
              <Form onChange={handleOnChange} className='form'>
                <div className='row'>
                  <div className='col-lg-4 mb-5'>
                    <Field
                      type='text'
                      name='title'
                      placeholder='Title'
                      className={'form-control mb-3 mb-lg-0'}
                      autoComplete='off'
                    />
                  </div>

                  <div className='col-lg-4 mb-5'>
                    <Field
                      type='text'
                      name='last_name'
                      placeholder='Last Name'
                      className={'form-control mb-3 mb-lg-0'}
                      autoComplete='off'
                    />
                  </div>

                  <div className='col-lg-4 mb-5'>
                    <Field
                      type='text'
                      name='email'
                      placeholder='Email'
                      className={'form-control mb-3 mb-lg-0'}
                      autoComplete='off'
                    />
                  </div>
                </div>
                <FilterFormFooter resetFilter={resetFilter} />
              </Form>
            </Formik>
          </div>
        </Col>
      </Row>
    </Collapse>
  )
}

export default CommunityActivityFilters
