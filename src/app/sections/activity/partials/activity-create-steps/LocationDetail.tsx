import {useActivityForm} from '../../core/contexts/ActivityFormContext'
import {updateData} from '../../../../helpers/form/FormHelper'
import clsx from 'clsx'
import React from 'react'
import { ErrorMessage, Field, useFormikContext } from "formik";

export const LocationDetail = () => {
  const {activityForm, setActivityForm} = useActivityForm()
  const {setFieldValue} = useFormikContext()

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

  return (
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

      {activityForm?.location?.type === 2 && (
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label fw-bold fs-6'>Where?</label>
          <div className='col-lg-8 fv-row'>
            <Field
              name='location.locate'
              type='text'
              placeholder='Where?'
              className='form-control mb-3 mb-lg-0'
              autoComplete='off'
              onChange={(e: any) => {
                updateData(
                  {
                    location: {
                      ...activityForm?.location,
                      ...{ locate: e.target.value}
                    }
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
  )
}
