import clsx from 'clsx'
import {updateData} from '../../../../helpers/form/FormHelper'
import {Form, Formik} from 'formik'
import React from 'react'
import {useActivityForm} from '../../core/contexts/ActivityFormContext'
import {KTCard, KTCardBody, KTCardHeader} from '../../../../helpers/components'
import {activityDetailsSchema} from '../../models/Activity'
import {FormAction} from '../../../../helpers/form/FormAction'

export const LocationDetail = () => {
  const {activityForm, setActivityForm} = useActivityForm()

  const handleLocationChange = (object: any, type: number) => {
    updateData(
      {
        location: {
          ...activityForm?.location,
          ...{
            type: type,
            locate: '',
          },
        },
      },
      setActivityForm,
      activityForm
    )
  }

  const handleOnChange = async () => {}

  const handleSubmit = async () => {}

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
              <div className='d-flex flex-column pt-5 w-100'>
                <div className='row mb-6'>
                  <div className='col-lg-6'>
                    <div
                      className={clsx('bg-active-mc-secondary cursor-pointer mb-5', {
                        active: activityForm?.location?.type === 1,
                      })}
                      onClick={(event) => handleLocationChange(event, 1)}
                    >
                      <div
                        className={clsx(
                          'align-items-center p-5 text-center bg-secondary bg-active-mc-secondary text-mc-primary text-active-white',
                          {active: activityForm?.location?.type === 1}
                        )}
                      >
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
                      onClick={(event) => handleLocationChange(event, 2)}
                    >
                      <div
                        className={clsx(
                          'align-items-center p-5 text-center bg-secondary bg-active-mc-secondary text-mc-primary text-active-white',
                          {active: activityForm?.location?.type === 2}
                        )}
                      >
                        <span className='d-flex flex-column'>
                          <span className='fw-bolder fs-6'>Local</span>

                          <span className='fs-7'>Players Play at a Location You Choose</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </KTCardBody>
            <FormAction text={'Update Activity'} isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </KTCard>
  )
}
