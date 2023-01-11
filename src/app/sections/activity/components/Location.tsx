import React, {Dispatch, FC, SetStateAction} from 'react'
import {ActivityForm} from '../models/ActivityForm'
import clsx from 'clsx'
import {updateData} from '../../../helpers/form/FormHelper'

type Props = {
  activity: ActivityForm
  setActivity: Dispatch<SetStateAction<ActivityForm>>
}

const Location: FC<Props> = ({activity, setActivity}) => {
  const handleLocationChange = (object: any, type: number) => {
    updateData(
      {
        location: {
          ...activity?.location,
          ...{
            type: type,
            locate: '',
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
            active: activity?.location?.type === 1,
          })}
          onClick={(event) => handleLocationChange(event, 1)}
        >
          <div
            className={clsx(
              'align-items-center p-5 text-center bg-secondary bg-active-mc-secondary text-mc-primary text-active-white',
              {active: activity?.location?.type === 1}
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
            active: activity?.location?.type === 2,
          })}
          onClick={(event) => handleLocationChange(event, 2)}
        >
          <div
            className={clsx(
              'align-items-center p-5 text-center bg-secondary bg-active-mc-secondary text-mc-primary text-active-white',
              {active: activity?.location?.type === 2}
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
  )
}

export {Location}
