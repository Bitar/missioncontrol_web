import React, {FC, useEffect, useState} from 'react'
import {useQueryRequest} from '../../../../modules/table/QueryRequestProvider'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {initialQueryState} from '../../../../helpers/crud-helper/models'
import {updateData} from '../../../../helpers/form/FormHelper'
import {Col, Collapse, Row} from 'react-bootstrap'
import {createFilterQueryParam} from '../../../../helpers/requests'
import FilterFormFooter from '../../../../components/form/FilterFormFooter'
import {defaultUserFilterForm, UserFilterForm} from '../core/UserFilterForm'

interface Props {
  showFilter: boolean
  setExportQuery: React.Dispatch<React.SetStateAction<string>>
}

const UserFilter: FC<Props> = ({showFilter, setExportQuery}) => {
  const {updateState} = useQueryRequest()

  const [userFilters, setUserFilters] = useState<UserFilterForm>(defaultUserFilterForm)
  const [reset, setReset] = useState<boolean>(false)
  const resetFilter = () => {
    setUserFilters(defaultUserFilterForm)
    setReset(true)
  }

  useEffect(() => {
    handleFilter()
    setReset(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset])

  const handleFilter = () => {
    setExportQuery(createFilterQueryParam(userFilters))

    updateState({
      filter: reset ? undefined : userFilters,
      ...initialQueryState,
    })
  }

  const handleOnChange = (e: any) =>
    updateData({[e.target.name]: e.target.value}, setUserFilters, userFilters)

  return (
    <Collapse in={showFilter}>
      <Row id='#users-list-filter'>
        <Col>
          <div className='card-rounded bg-primary bg-opacity-5 p-10 mb-15'>
            <Formik initialValues={userFilters} onSubmit={handleFilter} enableReinitialize>
              <Form onChange={handleOnChange} className='form'>
                <Row>
                  <Col md={4}>
                    <Field
                      type='text'
                      name='first_name'
                      placeholder='First Name'
                      className={'form-control mb-3 mb-lg-0'}
                      autoComplete='off'
                    />
                    <div className='mt-1 text-danger'>
                      <ErrorMessage name='first_name' className='mt-2' />
                    </div>
                  </Col>
                  <Col md={4}>
                    <Field
                      type='text'
                      name='last_name'
                      placeholder='Last Name'
                      className={'form-control mb-3 mb-lg-0'}
                      autoComplete='off'
                    />
                    <div className='mt-1 text-danger'>
                      <ErrorMessage name='last_name' className='mt-2' />
                    </div>
                  </Col>
                  <Col md={4}>
                    <Field
                      type='text'
                      name='email'
                      placeholder='Email'
                      className={'form-control mb-3 mb-lg-0'}
                      autoComplete='off'
                    />
                    <div className='mt-1 text-danger'>
                      <ErrorMessage name='email' className='mt-2' />
                    </div>
                  </Col>
                </Row>
                <FilterFormFooter resetFilter={resetFilter} />
              </Form>
            </Formik>
          </div>
        </Col>
      </Row>
    </Collapse>
  )
}

export {UserFilter}
