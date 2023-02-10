import {Field, Form, Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {useQueryRequest} from '../../../modules/table/QueryRequestProvider'
import {initialQueryState} from '../../../helpers/crud-helper/models'
import {updateData} from '../../../helpers/form/FormHelper'
import {Community} from '../../../models/community/Community'
import {getAllCommunities} from '../../community/core/CommunityRequests'
import Select from 'react-select'
import {isCommunityAdmin} from '../../../models/iam/User'
import {useAuth} from '../../../modules/auth'
import { Button } from 'react-bootstrap'

const initActivity = {
  title: '',
  community_id: '',
  status: '',
}

type ActivityFilterObj = {
  title: string
  community_id: number | string
  status: number | string
}

const ActivityFilter = () => {
  const {currentUser} = useAuth()
  const {updateState} = useQueryRequest()
  const [activityFilters, setActivityFilters] = useState<ActivityFilterObj>(initActivity)
  const [communities, setCommunities] = useState<Community[]>()
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

  useEffect(() => {
    getAllCommunities().then((response) => {
      setCommunities(response.data)
    })
  }, [])

  const filterData = () => {
    updateState({
      filter: activityFilters,
      ...initialQueryState,
    })
  }

  const handleOnChange = (e: any) => {
    if (e.target.name) {
      updateData({[e.target.name]: e.target.value}, setActivityFilters, activityFilters)
    }
  }

  return (
    <div id='filter-container' className='bg-primary bg-opacity-5 p-10 mb-15 card-rounded'>
      <Formik initialValues={activityFilters} onSubmit={filterData} enableReinitialize>
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
            {currentUser && !isCommunityAdmin(currentUser) && (
              <div className='col-lg-4 mb-5'>
                <Select
                  placeholder={'Community'}
                  options={communities}
                  getOptionLabel={(community) => community?.name}
                  getOptionValue={(community) => community?.id?.toString() || ''}
                  onChange={(e) => {
                    updateData({community_id: e?.id || ''}, setActivityFilters, activityFilters)
                  }}
                  isClearable={true}
                />
              </div>
            )}
            <div className='col-lg-4 mb-5'>
              <Select
                placeholder={'Status'}
                options={statuses}
                onChange={(e) => {
                  updateData({status: e?.value || ''}, setActivityFilters, activityFilters)
                }}
                isClearable={true}
              />
            </div>
            {/*<div className="col-lg-4 mb-5">*/}
            {/*  <Select*/}
            {/*    placeholder={"Created/Updated"}*/}
            {/*    options={createdUpdatedAt}*/}
            {/*    onChange={(e) => {*/}
            {/*      updateData({ modified_at: e?.value || "" }, setActivityFilters, activityFilters);*/}
            {/*    }}*/}
            {/*    isClearable={true}*/}
            {/*  />*/}
            {/*</div>*/}
          </div>
          <Button variant="primary" type="submit">Filter</Button>
          {/*<div className='card-footer d-flex justify-content-end py-6 px-9'>*/}
          {/*  <button type='submit' className='btn btn-mc-secondary btn-active-mc-secondary btn-sm'>*/}
          {/*    <span className='indicator-label'>Filter</span>*/}
          {/*  </button>*/}
          {/*</div>*/}
        </Form>
      </Formik>
    </div>
  )
}

export { ActivityFilter };
