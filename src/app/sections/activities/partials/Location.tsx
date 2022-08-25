import React, {Dispatch, FC, SetStateAction} from 'react'
import {Activity} from '../models/Activity'
import clsx from 'clsx'
import {ErrorMessage, Field} from 'formik'
import {updateData} from '../../../helpers/form/FormHelper'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
}

const Location: FC<Props> = ({activity, setActivity}) => {
  const handleLocationChange = (object: any, type: number) => {
    updateData(
      {
        location: {
          ...activity?.location,
          ...{
            type: type,
            location: '',
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
        <label className='fs-4 col-lg-4 col-form-label text-dark required fw-bold'>Location</label>
        <div className='col-lg-8 fv-row'>
          <div className='row'>
            <div className='col-lg-6'>
              <div
                className={clsx(
                  'border border-2 border-mc-secondary border-active cursor-pointer mb-5',
                  {active: activity?.location?.type === 1}
                )}
                onClick={(event) => handleLocationChange(event, 1)}
              >
                <div
                  className={clsx(
                    'align-items-center p-5 text-center bg-mc-primary bg-active-mc-secondary',
                    {active: activity?.location?.type === 1}
                  )}
                >
                  <span className='d-flex flex-column'>
                    <span className='fw-bolder fs-6 text-white'>Online</span>

                    <span className='fs-7 text-white'>On the line</span>
                  </span>
                </div>
              </div>
            </div>
            <div className='col-lg-6'>
              <div
                className={clsx(
                  'border border-2 border-mc-secondary border-active cursor-pointer mb-5',
                  {active: activity?.location?.type === 2}
                )}
                onClick={(event) => handleLocationChange(event, 2)}
              >
                <div
                  className={clsx(
                    'align-items-center p-5 text-center bg-mc-primary bg-active-mc-secondary',
                    {active: activity?.location?.type === 2}
                  )}
                >
                  <span className='d-flex flex-column'>
                    <span className='fw-bolder fs-6 text-white'>Local</span>

                    <span className='fs-7 text-white'>Good Ol' Days</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activity?.location?.type === 2 && (
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Place</label>
          <div className='col-lg-8 fv-row'>
            <Field
              type='text'
              name='location.location'
              className='form-control mb-3 mb-lg-0'
              value={activity?.location?.location || ''}
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='location.location' />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export {Location}
