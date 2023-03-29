import {Field, Form, Formik} from 'formik'
import React, {FC, useEffect, useRef, useState} from 'react'
import {useQueryRequest} from '../../../modules/table/QueryRequestProvider'
import {initialQueryState} from '../../../helpers/crud-helper/models'
import {updateData} from '../../../helpers/form/FormHelper'
import {Community} from '../../../models/community/Community'
import {getAllCommunities} from '../../community/core/CommunityRequests'
import Select from 'react-select'
import {isCommunityAdmin, isSuperAdmin} from '../../iam/user/core/User'
import {useAuth} from '../../../modules/auth'
import {Col, Collapse, Row} from 'react-bootstrap'
import {ActivityFilterForm, defaultActivityFilterForm} from '../core/ActivityFilterForm'
import {createFilterQueryParam} from '../../../helpers/requests'
import {genericOnChangeHandler} from '../../../helpers/form'
import FilterFormFooter from '../../../components/form/FilterFormFooter'

interface Props {
  showFilter: boolean
  setExportQuery: React.Dispatch<React.SetStateAction<string>>
}

const ActivityFilter: FC<Props> = ({showFilter, setExportQuery}) => {
  const {currentUser} = useAuth()
  const {updateState} = useQueryRequest()
  const [activityFilters, setActivityFilters] =
    useState<ActivityFilterForm>(defaultActivityFilterForm)
  const [communities, setCommunities] = useState<Community[]>()
  const [reset, setReset] = useState<boolean>(false)
  const statuses = [
    {
      value: 1,
      label: 'Registrations',
    },
    {
      value: 2,
      label: 'Active',
    },
    {
      value: 3,
      label: 'Pending',
    },
    {
      value: 4,
      label: 'Closed',
    },
    {
      value: 5,
      label: 'Match Generation In Queue',
    },
    {
      value: 6,
      label: 'Invalid Registrations',
    },
    {
      value: 7,
      label: 'Generating Matches In Progress',
    },
  ]
  const selectCommunityRef = useRef<any>(null)
  const selectStatusRef = useRef<any>(null)

  const resetFilter = () => {
    setActivityFilters(defaultActivityFilterForm)
    setReset(true)
  }

  useEffect(() => {
    handleFilter()
    selectCommunityRef.current?.clearValue()
    selectStatusRef.current?.clearValue()
    setReset(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset])

  useEffect(() => {
    getAllCommunities().then((response) => {
      setCommunities(response.data)
    })
  }, [])

  const handleFilter = () => {
    setExportQuery(createFilterQueryParam(activityFilters))

    updateState({
      filter: reset ? undefined : activityFilters,
      ...initialQueryState,
    })
  }

  const handleOnChange = (e: any) => genericOnChangeHandler(e, activityFilters, setActivityFilters)

  return (
    <Collapse in={showFilter}>
      <Row id='#activities-list-filter'>
        <Col>
          <div className='card-rounded bg-primary bg-opacity-5 p-10 mb-15'>
            <Formik initialValues={activityFilters} onSubmit={handleFilter} enableReinitialize>
              <Form onChange={handleOnChange} className='form'>
                <Row>
                  <Col md={4} className='mb-5'>
                    <Field
                      type='text'
                      name='title'
                      placeholder='Title'
                      className={'form-control mb-3 mb-lg-0'}
                      autoComplete='off'
                    />
                  </Col>
                  {currentUser && isSuperAdmin(currentUser) && (
                    <Col md={4} className='mb-5'>
                      <Select
                        ref={selectCommunityRef}
                        placeholder={'Community'}
                        options={communities}
                        getOptionLabel={(community) => community?.name}
                        getOptionValue={(community) => community?.id?.toString() || ''}
                        onChange={(e) => {
                          updateData(
                            {community_id: e?.id || ''},
                            setActivityFilters,
                            activityFilters
                          )
                        }}
                        isClearable={true}
                      />
                    </Col>
                  )}
                  <Col md={4} className='mb-5'>
                    <Select
                      ref={selectStatusRef}
                      placeholder={'Status'}
                      options={statuses}
                      onChange={(e) => {
                        updateData({status: e?.value || ''}, setActivityFilters, activityFilters)
                      }}
                      isClearable={true}
                    />
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

export {ActivityFilter}
