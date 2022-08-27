import React, {Dispatch, FC, SetStateAction} from 'react'
import {Activity} from './models/Activity'
import {ErrorMessage, Field} from 'formik'
import {updateData} from '../../helpers/form/FormHelper'
import {SelectMC} from '../../helpers/form/SelectMC'
import {getAllCommunities} from '../community/core/CommunityRequests'
import {GameDetails} from './partials/GameDetails'
import {Location} from './partials/Location'
import {EntryFee} from './partials/EntryFee'
import {Schedule} from './partials/Schedule'
import {TeamDetails} from './partials/TeamDetails'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
}

const ActivityForm: FC<React.PropsWithChildren<Props>> = ({activity, setActivity}) => {
  const ActivityProps = {
    activity: activity,
    setActivity: setActivity,
  }

  const handleChange = (object: any) => {
    updateData({community: object}, setActivity, activity)
  }

  return (
    <>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Title</label>
        <div className='col-lg-8 fv-row'>
          <Field
            type='text'
            name='title'
            placeholder='Activity Title'
            className='form-control mb-3 mb-lg-0'
            autoComplete='off'
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='name' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Description</label>
        <div className='col-lg-8 fv-row'>
          <Field
            as='textarea'
            name='description'
            className='form-control mb-3 mb-lg-0'
            placeholder='Activity Description'
            rows={3}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='description' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        {/*TODO: Maybe Async here*/}
        <SelectMC label={'Community'} api={getAllCommunities} onChangeData={handleChange} />
      </div>

      <div className='separator separator-dashed my-6'></div>

      <Schedule {...ActivityProps} />

      <div className='separator separator-dashed my-6'></div>

      <GameDetails {...ActivityProps} />

      <div className='separator separator-dashed my-6'></div>

      <TeamDetails {...ActivityProps} />

      <div className='separator separator-dashed my-6'></div>

      <EntryFee {...ActivityProps} />

      <div className='separator separator-dashed my-6'></div>

      <Location {...ActivityProps} />

      <div className='separator separator-dashed my-6'></div>

      {/*  Prize  */}
      {/*  Scheduling  */}
      {/*  Score  */}
    </>
  )
}

export {ActivityForm}
