import React, {Dispatch, FC, SetStateAction} from 'react'
import {Activity} from '../models/Activity'
import clsx from 'clsx'
import {updateData} from '../../../helpers/form/FormHelper'
import {ErrorMessage, Field} from 'formik'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
}

const EntryFee: FC<React.PropsWithChildren<Props>> = ({activity, setActivity}) => {
  const handleEntryFeeChange = (object: any, type: number) => {
    updateData(
      {
        entry_fee: {
          ...activity?.entry_fee,
          ...{
            type: type,
            amount: 0,
          },
        },
      },
      setActivity,
      activity
    )
  }

  return (
    <>
      <div className='row mb-6'>
        <label className='fs-4 col-lg-4 col-form-label text-dark required fw-bold'>Entry</label>
        <div className='col-lg-8 fv-row'>
          <div className='row'>
            <div className='col-lg-6'>
              <div
                className={clsx(
                  'border border-2 border-mc-secondary border-active cursor-pointer mb-5',
                  {active: activity?.entry_fee?.type === 1}
                )}
                onClick={(event) => handleEntryFeeChange(event, 1)}
              >
                <div
                  className={clsx(
                    'align-items-center p-5 text-center bg-mc-primary bg-active-mc-secondary',
                    {active: activity?.entry_fee?.type === 1}
                  )}
                >
                  <span className='d-flex flex-column'>
                    <span className='fw-bolder fs-6 text-white'>Free</span>

                    <span className='fs-7 text-white'>Anyone can join</span>
                  </span>
                </div>
              </div>
            </div>
            <div className='col-lg-6'>
              <div
                className={clsx(
                  'border border-2 border-mc-secondary border-active cursor-pointer mb-5',
                  {active: activity?.entry_fee?.type === 2}
                )}
                onClick={(event) => handleEntryFeeChange(event, 2)}
              >
                <div
                  className={clsx(
                    'align-items-center p-5 text-center bg-mc-primary bg-active-mc-secondary',
                    {active: activity?.entry_fee?.type === 2}
                  )}
                >
                  <span className='d-flex flex-column'>
                    <span className='fw-bolder fs-6 text-white'>Paid</span>

                    <span className='fs-7 text-white'>Make the money rain</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activity?.entry_fee?.type === 2 && (
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Price</label>
          <div className='col-lg-8 fv-row'>
            <Field
              type='number'
              name='entry_fee.amount'
              className='form-control mb-3 mb-lg-0'
              value={activity?.entry_fee?.amount || 0}
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='entry_fee.amount' />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export {EntryFee}
