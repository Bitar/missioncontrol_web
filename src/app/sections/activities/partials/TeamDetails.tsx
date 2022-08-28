import {Activity} from '../models/Activity'
import React, {Dispatch, FC, SetStateAction} from 'react'
import {ErrorMessage, Field} from 'formik'
// import InputMask from "react-input-mask";

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
}

const TeamDetails: FC<Props> = ({activity, setActivity}) => {
  return (
    <>
      <div className='row mb-6'>
        <div className='col-12'>
          <h4 className='text-dark'>Team Details</h4>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Players per team</label>
        <div className='col-lg-8 fv-row'>
          <Field
            type='number'
            name='team_settings.players'
            className='form-control mb-3 mb-lg-0'
            value={activity?.team_settings?.players}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='team_settings.players' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Minimum Teams</label>
        <div className='col-lg-8 fv-row'>
          <Field
            type='number'
            name='team_settings.min'
            className='form-control mb-3 mb-lg-0'
            value={activity?.team_settings?.min}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='team_settings.min' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Maximum Teams</label>
        <div className='col-lg-8 fv-row'>
          <Field
            type='number'
            name='team_settings.max'
            className='form-control mb-3 mb-lg-0'
            value={activity?.team_settings?.max}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='team_settings.max' />
          </div>
        </div>
      </div>
    </>
  )
}

export {TeamDetails}
