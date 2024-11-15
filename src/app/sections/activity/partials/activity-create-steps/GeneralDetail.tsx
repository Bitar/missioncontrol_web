import {ErrorMessage, Field} from 'formik'
import React, {FC, useEffect, useState} from 'react'
import {Community} from '../../../../models/community/Community'
import {useActivityForm} from '../../core/contexts/ActivityFormContext'
import {isSuperAdmin} from '../../../../models/iam/User'
import Select from 'react-select'
import {updateData} from '../../../../helpers/form/FormHelper'
import {useAuth} from '../../../../modules/auth'
import {getAllCommunities} from '../../../community/core/CommunityRequests'
import {ActivityType} from '../../../../models/activity/ActivityType'
import {getActivityTypes} from '../../../misc/core/_requests'

const GeneralDetail: FC = () => {
  const {activityForm, setActivityForm} = useActivityForm()
  const {currentUser} = useAuth()
  const [communities, setCommunities] = useState<Community[]>()
  const [activityTypes, setActivityTypes] = useState<ActivityType[]>()

  useEffect(() => {
    if (currentUser && isSuperAdmin(currentUser)) {
      getAllCommunities().then((response) => {
        setCommunities(response.data)
      })
    }

    getActivityTypes().then((response) => {
      setActivityTypes(response?.data)
    })
  }, [currentUser])

  return (
    <div className='d-flex flex-column pt-5 w-100'>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label fw-bold required fs-6'>Type</label>
        <div className='col-lg-8 fv-row'>
          <Select
            name='type_id'
            placeholder={'What type?'}
            getOptionLabel={(activityType) => activityType?.name}
            getOptionValue={(activityType) => activityType?.id?.toString() || ''}
            options={activityTypes}
            onChange={(e) => {
              updateData({type_id: e?.id || ''}, setActivityForm, activityForm)
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='type_id' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Title</label>
        <div className='col-lg-8 fv-row'>
          <Field
            type='text'
            name='title'
            placeholder='Title'
            className='form-control mb-3 mb-lg-0'
            autoComplete='off'
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='title' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Description</label>
        <div className='col-lg-8 fv-row'>
          <Field
            as='textarea'
            name='description'
            className='form-control mb-3 mb-lg-0'
            placeholder='Description'
            rows={5}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='description' />
          </div>
        </div>
      </div>

      {currentUser && isSuperAdmin(currentUser) && (
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Community</label>
          <div className='col-lg-8 fv-row'>
            <Select
              name='community_id'
              placeholder={'Choose a Community'}
              options={communities}
              getOptionLabel={(community) => community?.name}
              getOptionValue={(community) => community?.id?.toString() || ''}
              onChange={(e) => {
                updateData({community_id: e?.id || ''}, setActivityForm, activityForm)
              }}
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='community_id' />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export {GeneralDetail}
