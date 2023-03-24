import clsx from 'clsx'
import {jsonToFormData, updateData} from '../../../../helpers/form/FormHelper'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import React from 'react'
import {useActivityForm} from '../../core/contexts/ActivityFormContext'
import {KTCard, KTCardBody, KTCardHeader} from '../../../../helpers/components'
import {activityDetailsSchema} from '../../../../models/activity/Activity'
import {FormAction} from '../../../../helpers/form/FormAction'
import {updateActivity} from '../../core/requests/ActivityRequests'
import toast from 'react-hot-toast'
import {useActivity} from '../../core/contexts/ActivityContext'

export const LocationDetail = () => {
  const {activity, setActivity} = useActivity()
  const {activityForm, setActivityForm} = useActivityForm()

  const handleLocationChange = (object: any, type: number) => {
    updateData(
      {
        location: {
          ...activityForm?.location,
          ...{
            type: type,
          },
        },
      },
      setActivityForm,
      activityForm
    )
  }

  const handleOnChange = async () => {}

  const handleSubmit = async () => {
    let data = jsonToFormData(activityForm)
    data.append('_method', 'PUT')

    await updateActivity(activity?.id, data)
      .then((response) => {
        toast.success('Activity updated Successfully!')
        setActivity(response)
      })
      .catch(function (e) {
        if (e.response) {
          let status = e.response.status

          if (status === 403) {
            toast.error('You are not allowed to do this update!')
          }
        }
      })
  }

  return (
    <KTCard border={true}>
      <KTCardHeader text={'General Details'} bg='mc-primary' text_color='white' />

      <Formik
        validationSchema={activityDetailsSchema}
        initialValues={activityForm!}
        onSubmit={handleSubmit}
        enableReinitialize>
        {({isSubmitting}) => (
          <Form onChange={handleOnChange} className='form' autoComplete='off'>
            <KTCardBody className='py-4'>
              <div className='d-flex flex-column pt-5 w-100'>
                <div className='row mb-6'>
                  <div className='col-lg-6'>
                    <div
                      className={clsx('bg-active-mc-secondary cursor-pointer mb-5', {
                        active: activityForm?.location?.type === 1,
                      })}
                      onClick={(event) => handleLocationChange(event, 1)}>
                      <div
                        className={clsx(
                          'align-items-center p-5 text-center bg-secondary bg-active-mc-secondary text-mc-primary text-active-white',
                          {active: activityForm?.location?.type === 1}
                        )}>
                        <span className='d-flex flex-column'>
                          <span className='fw-bolder fs-6'>Online</span>

                          <span className='fs-7'>Players Play Online On Their Own Consoles</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div
                      className={clsx('bg-active-mc-secondary cursor-pointer mb-5', {
                        active: activityForm?.location?.type === 2,
                      })}
                      onClick={(event) => handleLocationChange(event, 2)}>
                      <div
                        className={clsx(
                          'align-items-center p-5 text-center bg-secondary bg-active-mc-secondary text-mc-primary text-active-white',
                          {active: activityForm?.location?.type === 2}
                        )}>
                        <span className='d-flex flex-column'>
                          <span className='fw-bolder fs-6'>Local</span>

                          <span className='fs-7'>Players Play at a Location You Choose</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {activityForm?.location?.type === 2 && (
                  <div className='row mb-6'>
                    <label className='col-lg-4 required col-form-label fw-bold fs-6'>Where?</label>
                    <div className='col-lg-8 fv-row'>
                      <Field
                        type='text'
                        id='location_input'
                        value={activityForm?.location?.locate}
                        placeholder='Where?'
                        className='form-control mb-3 mb-lg-0'
                        autoComplete='off'
                        onChange={(e: any) => {
                          updateData(
                            {
                              location: {
                                ...activityForm?.location,
                                ...{
                                  locate: e.target.value,
                                },
                              },
                            },
                            setActivityForm,
                            activityForm
                          )
                        }}
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='location.locate' />
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
