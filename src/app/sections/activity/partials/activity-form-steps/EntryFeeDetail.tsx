import clsx from 'clsx'
import CurrencyInput from 'react-currency-input-field'
import {updateData} from '../../../../helpers/form/FormHelper'
import {ErrorMessage, Form, Formik} from 'formik'
import React from 'react'
import {useActivityForm} from '../../core/contexts/ActivityFormContext'
import {KTCard, KTCardBody, KTCardHeader} from '../../../../helpers/components'
import {activityDetailsSchema} from '../../models/Activity'
import {FormAction} from '../../../../helpers/form/FormAction'

export const EntryFeeDetail = () => {
  const {activityForm, setActivityForm} = useActivityForm()

  const handleEntryFeeChange = (object: any, type: number) => {
    updateData(
      {
        entry_fee: {
          ...activityForm?.entry_fee,
          ...{
            type: type,
            amount: 0,
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
                        active: activityForm?.entry_fee?.type === 1,
                      })}
                      onClick={(event) => handleEntryFeeChange(event, 1)}
                    >
                      <div
                        className={clsx(
                          'align-items-center p-5 text-center bg-secondary bg-active-mc-secondary text-mc-primary text-active-white',
                          {active: activityForm?.entry_fee?.type === 1}
                        )}
                      >
                        <span className='d-flex flex-column'>
                          <span className='fw-bolder fs-6'>Free</span>

                          <span className='fs-7'>Anyone can join</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div
                      className={clsx('bg-active-mc-secondary cursor-pointer mb-5', {
                        active: activityForm?.entry_fee?.type === 2,
                      })}
                      onClick={(event) => handleEntryFeeChange(event, 2)}
                    >
                      <div
                        className={clsx(
                          'align-items-center p-5 text-center bg-secondary bg-active-mc-secondary text-mc-primary text-active-white',
                          {active: activityForm?.entry_fee?.type === 2}
                        )}
                      >
                        <span className='d-flex flex-column'>
                          <span className='fw-bolder fs-6'>Paid</span>

                          <span className='fs-7'>You Choose The Price Per Player</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {activityForm?.entry_fee?.type === 2 && (
                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label fw-bold fs-6'>Amount</label>
                    <div className='col-lg-8 fv-row'>
                      <CurrencyInput
                        id='entry_fee_amount_input'
                        placeholder='Entry Fee'
                        className='form-control mb-3 mb-lg-0'
                        defaultValue={0}
                        decimalsLimit={2}
                        prefix={'$'}
                        onValueChange={(value) =>
                          updateData(
                            {
                              entry_fee: {
                                ...activityForm?.entry_fee,
                                ...{
                                  amount: value,
                                },
                              },
                            },
                            setActivityForm,
                            activityForm
                          )
                        }
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='entry_fee.amount' />
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
