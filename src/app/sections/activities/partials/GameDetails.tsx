import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {SelectMC} from '../../../helpers/form/SelectMC'
import {getAllGameModes, getAllGamePlatforms, getAllGames} from '../../games/core/GameRequests'
// import Select from 'react-select'
import {updateData} from '../../../helpers/form/FormHelper'
import {ErrorMessage, Field} from 'formik'
import {Activity} from '../models/Activity'
import {roundList} from '../../../models/game/Game'
import Select, {GroupBase} from 'react-select'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
}

let platformsObject: any[] = []

const GameDetails: FC<Props> = ({activity, setActivity}) => {
  const [selected, setSelected] = useState([])
  const [platforms, setPlatforms] = useState([])

  // useEffect(() => {
  //     if (platformsObject.length === 0) {
  //         getAllGamePlatforms(activity?.game?.id).then((response) => {
  //             response?.data?.forEach(function (value) {
  //                 let option = {value: value.id, label: value.name, isSelected: false}
  //                 platformsObject.push(option)
  //             })
  //         })
  //     }
  // }, [activity?.game?.id])

  const populatePlatforms = (gameId: number) => {
    getAllGamePlatforms(gameId).then((response) => {
      response?.data?.forEach(function (value) {
        let option = {value: value.id, label: value.name, isSelected: false}
        platformsObject.push(option)
      })
    })
  }

  const handleGameChange = (object: any) => {
    populatePlatforms(object.id)
    updateData({game: object}, setActivity, activity)
  }

  const handleGameModeChange = (object: any) => {
    updateData({game_mode: object}, setActivity, activity)
  }

  const handlePlatformChange = (selectedOption: any) => {
    // console.log(selectedOption)
    let platformIds: any[] = []
    platformsObject = selectedOption.map((option: any) => {
      platformIds.push(option.value)
      return {
        id: option.value,
        name: option.label,
      }
    })

    // console.log(platformIds)
    // console.log(platformsObject)
    //
    // setSelected(platformsObject)

    updateData({platform_ids: platformsObject}, setActivity, activity)
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
            key={activity?.game?.id}
            label='Game Mode'
            api={() => getAllGameModes(activity?.game?.id)}
            onChangeData={() => handleGameModeChange}
          />
        </div>
      )}

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Rounds</label>
        <div className='col-lg-8 fv-row'>
          <select
            name='rounds'
            className='form-select form-select-white form-select-sm'
            defaultValue='1'
            onChange={(e: any) => updateData({rounds: e.target.value}, setActivity, activity)}
          >
            <option value='1'>1</option>
            <option value='2'>3</option>
            <option value='3'>5</option>
            <option value='4'>7</option>
          </select>
          <div className='text-danger mt-2'>
            <ErrorMessage name='rounds' />
          </div>
        </div>
      </div>

      {activity?.game && (
        <>
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
          {activity?.settings?.is_cross_play && (
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Platforms</label>
              <div className='col-lg-8 fv-row'>
                <Select
                  // key={activity?.game?.id}
                  isMulti
                  isSearchable
                  defaultValue={selected}
                  options={platformsObject}
                  onChange={handlePlatformChange}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export {GameDetails}
