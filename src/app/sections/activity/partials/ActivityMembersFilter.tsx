import {useQueryRequest} from '../../../modules/table/QueryRequestProvider'
import React, {FC, useEffect, useState} from 'react'
import {initialQueryState} from '../../../helpers/crud-helper/models'
import {updateData} from '../../../helpers/form/FormHelper'
import {KTCardBody} from '../../../helpers/components'
import {Field, Form, Formik} from 'formik'
import {Col, Collapse, Row} from 'react-bootstrap'
import {createFilterQueryParam} from '../../../helpers/requests'
import FilterFormFooter from '../../../components/form/FilterFormFooter'

const initActivityMembersFilter = {
  team_name: '',
  first_name: '',
  last_name: '',
  email: '',
}

type ActivityMembersFilterObj = {
  team_name: string
  first_name: string
  last_name: string
  email: string
}

interface Props {
  showFilter: boolean
  setExportQuery: React.Dispatch<React.SetStateAction<string>>
}

const ActivityMembersFilter: FC<Props> = ({showFilter, setExportQuery}) => {
  const {updateState} = useQueryRequest()
  const [activityTeamFilters, setActivityTeamFilters] =
    useState<ActivityMembersFilterObj>(initActivityMembersFilter)
  const [reset, setReset] = useState<boolean>(false)

  const resetFilter = () => {
    setActivityTeamFilters(initActivityMembersFilter)
    setReset(true)
  }

  useEffect(() => {
    handleFilter()
    setReset(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset])

  const handleFilter = () => {
    setExportQuery(createFilterQueryParam(activityTeamFilters))

    updateState({
      filter: reset ? undefined : activityTeamFilters,
      ...initialQueryState,
    })
  }

  const handleOnChange = (e: any) => {
    if (e.target.name) {
      updateData({[e.target.name]: e.target.value}, setActivityTeamFilters, activityTeamFilters)
    }
  }

  return (
    <Collapse in={showFilter}>
      <Row id='#activity-users-list-filter'>
        <Col>
          <div className='card-rounded bg-primary bg-opacity-5 p-10 mb-15'>
            <Formik initialValues={activityTeamFilters} onSubmit={handleFilter} enableReinitialize>
              <Form onChange={handleOnChange} className='form'>
                <KTCardBody>
                  <div className='row mb-5'>
                    <div className='col-lg-4'>
                      <Field
                        type='text'
                        name='team_name'
                        placeholder='Team Name'
                        className={'form-control mb-3 mb-lg-0'}
                        autoComplete='off'
                      />
                    </div>
                    <div className='col-lg-4'>
                      <Field
                        type='text'
                        name='first_name'
                        placeholder='User first name'
                        className={'form-control mb-3 mb-lg-0'}
                        autoComplete='off'
                      />
                    </div>
                    <div className='col-lg-4'>
                      <Field
                        type='text'
                        name='last_name'
                        placeholder='User last name'
                        className={'form-control mb-3 mb-lg-0'}
                        autoComplete='off'
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-lg-4'>
                      <Field
                        type='text'
                        name='email'
                        placeholder='User email'
                        className={'form-control mb-3 mb-lg-0'}
                        autoComplete='off'
                      />
                    </div>
                  </div>
                  <FilterFormFooter resetFilter={resetFilter} />
                </KTCardBody>
              </Form>
            </Formik>
          </div>
        </Col>
      </Row>
    </Collapse>
  )
}

export {ActivityMembersFilter}
