import React, {Dispatch, FC, SetStateAction} from 'react'
import {SelectMC} from '../../../helpers/form/SelectMC'
import {getAllGameModes, getAllGames} from '../../games/core/GameRequests'
import Select from 'react-select'
import {updateData} from '../../../helpers/form/FormHelper'
import {ErrorMessage, Field} from 'formik'
import {Activity} from '../models/Activity'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
}

const GameDetails: FC<Props> = ({activity, setActivity}) => {
  const handleGameChange = (object: any) => {
    updateData({game: object}, setActivity, activity)
  }
  const handleGameModeChange = (object: any) => {
    updateData({game_mode: object}, setActivity, activity)
  }

  return (
    <>
      <div className='row mb-6'>
        <div className='col-12'>
          <h4 className='text-dark'>Game Details</h4>
        </div>
      </div>

      <div className='row mb-6'>
        <SelectMC label={'Game'} api={getAllGames} onChangeData={handleGameChange} />
      </div>

      {activity?.game && (
        <div className='row mb-6'>
          <SelectMC
            label={'Game Mode'}
            api={() => getAllGameModes(activity?.game?.id)}
            onChangeData={handleGameModeChange}
          />
        </div>
      )}

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Rounds</label>
        <div className='col-lg-8 fv-row'>
          <Select
            name={'rounds'}
            isSearchable
            options={[
              {value: 1, label: 1},
              {value: 3, label: 3},
              {value: 5, label: 5},
            ]}
            onChange={(e: any) => updateData({rounds: e.value}, setActivity, activity)}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='name' />
          </div>
        </div>
      </div>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Cross Play</label>
        <div className='col-lg-8 fv-row'>
          <div className='form-check form-check-custom form-check-solid form-switch'>
            <Field
              className='form-check-input w-45px h-30px'
              type='checkbox'
              name={'is_cross_play'}
              checked={activity?.settings?.is_cross_play}
            />
          </div>
          <div className='text-danger mt-2'>
            <ErrorMessage name='is_cross_play' />
          </div>
        </div>
      </div>
    </>
  )
}

export {GameDetails}
