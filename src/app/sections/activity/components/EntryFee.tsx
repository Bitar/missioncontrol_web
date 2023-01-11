import React, {Dispatch, FC, SetStateAction} from 'react'
import clsx from 'clsx'
import {updateData} from '../../../helpers/form/FormHelper'
import {ActivityForm} from '../models/ActivityForm'

type Props = {
  activity: ActivityForm
  setActivity: Dispatch<SetStateAction<ActivityForm>>
}

const EntryFee: FC<Props> = ({activity, setActivity}) => {
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
    <div className='row'>
      <div className='col-lg-6'>
        <div
          className={clsx('bg-active-mc-secondary cursor-pointer mb-5', {
            active: activity?.entry_fee?.type === 1,
          })}
          onClick={(event) => handleEntryFeeChange(event, 1)}
        >
          <div
            className={clsx(
              'align-items-center p-5 text-center bg-secondary bg-active-mc-secondary text-mc-primary text-active-white',
              {active: activity?.entry_fee?.type === 1}
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
            active: activity?.entry_fee?.type === 2,
          })}
          onClick={(event) => handleEntryFeeChange(event, 2)}
        >
          <div
            className={clsx(
              'align-items-center p-5 text-center bg-secondary bg-active-mc-secondary text-mc-primary text-active-white',
              {active: activity?.entry_fee?.type === 2}
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
  )
}

export {EntryFee}
