import {ErrorMessage, Field, Form, Formik} from 'formik'
import React, {FC, useEffect, useState} from 'react'
import {KTCard, KTCardBody, KTCardHeader} from '../../../../helpers/components'
import {Community} from '../../../community/models/Community'
import {useActivityForm} from '../../core/contexts/ActivityFormContext'
import {isCommunityAdmin} from '../../../identity/user/models/User'
import Select from 'react-select'
import {jsonToFormData, updateData} from '../../../../helpers/form/FormHelper'
import {useAuth} from '../../../../modules/auth'
import {useActivity} from '../../core/contexts/ActivityContext'
import {getAllCommunities} from '../../../community/core/CommunityRequests'
import {FormAction} from '../../../../helpers/form/FormAction'
import {activityDetailsSchema} from '../../models/Activity'
import {updateActivity} from '../../core/requests/ActivityRequests'
import toast from 'react-hot-toast'
import {useParams} from 'react-router-dom'

const GeneralDetail: FC = () => {
  const {activityForm, setActivityForm} = useActivityForm()
  const {currentUser} = useAuth()
  const {activity, setActivity} = useActivity()
  const [communities, setCommunities] = useState<Community[]>()
  const params = useParams()

  useEffect(() => {
    if (currentUser && !isCommunityAdmin(currentUser)) {
      getAllCommunities().then((response) => {
        setCommunities(response.data)
      })
    }
  }, [currentUser])

  const handleSubmit = async () => {
    let data = jsonToFormData(activityForm)
    data.append('_method', 'PUT')

    await updateActivity(params.id, data)
      .then((response) => {
        toast.success('Activity updated Successfully!')
        setActivity(response)
      })
      .catch(function (e) {
        if (e.response) {
        }
      })
  }

  const handleOnChange = (e: any) => {
    let targetName = e.target.name
    let targetValue = e.target.value

    updateData({[targetName]: targetValue}, setActivityForm, activityForm)
  }

  return (
    <KTCard border={true}>
      <KTCardHeader text={'General Details'} bg='mc-primary' text_color='white' />
      <Formik
        validationSchema={activityDetailsSchema}
        initialValues={activityForm!}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({isSubmitting}) => (
          <Form onChange={handleOnChange} className='form' autoComplete='off'>
            <KTCardBody className='py-4'>
              <div className='d-flex flex-column pt-5'>
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
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>Description</label>
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

                {currentUser && !isCommunityAdmin(currentUser) && (
                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label fw-bold fs-6'>Community</label>
                    <div className='col-lg-8 fv-row'>
                      {activity?.community && (
                        <Select
                          name='community_id'
                          placeholder={'Choose a Community'}
                          defaultValue={activity?.community}
                          options={communities}
                          getOptionLabel={(community) => community?.name}
                          getOptionValue={(community) => community?.id?.toString() || ''}
                          onChange={(e) => {
                            updateData({community_id: e?.id || ''}, setActivityForm, activityForm)
                          }}
                        />
                      )}
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='community_id' />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </KTCardBody>
            <FormAction text={'Update Activity'} isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </KTCard>
  )
}

export {GeneralDetail}
