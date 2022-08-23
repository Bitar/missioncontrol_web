import React, {Dispatch, FC, SetStateAction} from 'react'
import {Activity} from '../models/Activity'
import {RegistrationDatePicker} from './RegistrationDatePicker'
import {MatchPlayDatePicker} from './MatchPlayDatePicker'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
}

const Schedule: FC<React.PropsWithChildren<Props>> = ({activity, setActivity}) => {
  return (
    <>
      <div className='row mb-6'>
        <div className='col-12'>
          <h4 className='text-dark'>Schedule</h4>
        </div>
      </div>

      <div className='row mb-6'>
        <div className='col-lg-4'>
          <span className='required fw-bold fs-6'>Registration Dates</span>
        </div>
        <div className='col-lg-8 fv-row'>
          <RegistrationDatePicker activity={activity} setActivity={setActivity} />
        </div>
      </div>
      <div className='row mb-6'>
        <div className='col-lg-4'>
          <span className='required fw-bold fs-6'>Match Play Dates</span>
        </div>
        <div className='col-lg-8 fv-row'>
          <MatchPlayDatePicker activity={activity} setActivity={setActivity} />
        </div>
      </div>
    </>
  )
}
export {Schedule}
