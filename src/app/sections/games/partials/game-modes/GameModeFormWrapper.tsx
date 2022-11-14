import {ErrorMessage, Field} from 'formik'
import Select from 'react-select'
import {updateData} from '../../../../helpers/form/FormHelper'
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {ScoringType} from '../../../../models/game/scoring/ScoringType'
import {getScoringKeys, getScoringTypes} from '../../../misc/core/_requests'
import {ScoringKey} from '../../../../models/game/scoring/ScoringKey'
import {GameModeFormType} from '../../models/GameModeFormType'
import {GameModeSettings} from './GameModeSettings'
import {initGameSettings} from '../../../../models/game/GameSettings'
import {GameModeScoringSettings} from './GameModeScoringSettings'
import {initScoringSetting} from '../../../../models/game/scoring/ScoringSettings'

type Props = {
  gameModeForm: GameModeFormType
  setGameModeForm: Dispatch<SetStateAction<GameModeFormType>>
}

export const GameModeFormWrapper: FC<Props> = ({gameModeForm, setGameModeForm}) => {
  const [scoringTypes, setScoringTypes] = useState<ScoringType[]>()
  const [scoringKeys, setScoringKeys] = useState<ScoringKey[]>()

  useEffect(() => {
    getScoringTypes().then((response) => {
      setScoringTypes(response.data)
    })

    getScoringKeys().then((response) => {
      setScoringKeys(response.data)
    })
  }, [])

  const removeSettings = (index: number) => {
    let newFormValues = [...gameModeForm.settings]

    newFormValues.splice(index, 1)

    updateData(
      {
        settings: newFormValues,
      },
      setGameModeForm,
      gameModeForm
    )
  }

  const removeScoringSettings = (index: number) => {
    let newFormValues = [...gameModeForm.scoring_settings]

    newFormValues.splice(index, 1)

    updateData(
      {
        scoring_settings: newFormValues,
      },
      setGameModeForm,
      gameModeForm
    )
  }

  return (
    <>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Title</label>
        <div className='col-lg-8 fv-row'>
          <Field
            type='text'
            name='name'
            placeholder='Name'
            className='form-control mb-3 mb-lg-0'
            autoComplete='off'
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='name' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label fw-bold fs-6'>Description</label>
        <div className='col-lg-8 fv-row'>
          <Field
            as='textarea'
            name='description'
            className='form-control mb-3 mb-lg-0'
            placeholder='Game Mode Description'
            rows={3}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='description' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Scoring Type</label>
        <div className='col-lg-8 fv-row'>
          <Select
            name='scoring_type_id'
            placeholder={'Choose a Scoring Type'}
            options={scoringTypes}
            getOptionLabel={(scoringType) => scoringType?.name}
            getOptionValue={(scoringType) => scoringType?.id?.toString() || ''}
            onChange={(e) => {
              updateData(
                {
                  scoring_type_id: e?.id,
                },
                setGameModeForm,
                gameModeForm
              )
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='scoring_type_id' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label fw-bold fs-6'>Instructions</label>
        <div className='col-lg-8 fv-row'>
          <Field
            as='textarea'
            name='instructions'
            className='form-control mb-3 mb-lg-0'
            placeholder='Game Mode Instructions'
            rows={1}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='instructions' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Min Players</label>
        <div className='col-lg-8 fv-row'>
          <Field
            type='text'
            name='min_players'
            placeholder='Minimum Players per team'
            className='form-control mb-3 mb-lg-0'
            autoComplete='off'
            onChange={(e: any) => {
              const result = e.target.value.replace(/\D/g, '')
              updateData({[e.target.name]: result}, setGameModeForm, gameModeForm)
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='min_players' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Max Players</label>
        <div className='col-lg-8 fv-row'>
          <Field
            type='text'
            name='max_players'
            placeholder='Maximum Players per team'
            className='form-control mb-3 mb-lg-0'
            autoComplete='off'
            onChange={(e: any) => {
              const result = e.target.value.replace(/\D/g, '')
              updateData({[e.target.name]: result}, setGameModeForm, gameModeForm)
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='max_players' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Game Time</label>
        <div className='col-lg-8 fv-row'>
          <Field
            type='text'
            name='game_time'
            placeholder='Average game time'
            className='form-control mb-3 mb-lg-0'
            autoComplete='off'
            onChange={(e: any) => {
              const result = e.target.value.replace(/\D/g, '')
              updateData({[e.target.name]: result}, setGameModeForm, gameModeForm)
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='game_time' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label fw-bold fs-6'>Settings</label>
        <div className='col-lg-8 fv-row'>
          {gameModeForm?.settings?.map((settings, index) => (
            <GameModeSettings
              key={`game-mode-settings-${index}`}
              gameModeSettings={settings}
              index={index}
              removeSetting={removeSettings}
            />
          ))}

          <button
            type='button'
            className='btn btn-icon btn-sm btn-light-success w-100 py-8 fw-bold'
            style={{fontSize: '18px'}}
            onClick={() => {
              updateData(
                {
                  settings: [...gameModeForm.settings, initGameSettings()],
                },
                setGameModeForm,
                gameModeForm
              )
            }}
          >
            <i className='fa fa-plus-circle me-3'></i> Add new settings
          </button>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label fw-bold fs-6'>Scoring Settings</label>
        <div className='col-lg-8 fv-row'>
          {gameModeForm?.scoring_settings?.map((settings, index) => (
            <GameModeScoringSettings
              key={`game-mode-scoring-settings-${index}`}
              gameMode={gameModeForm}
              setGameMode={setGameModeForm}
              gameModeScoringSettings={settings}
              index={index}
              removeSetting={removeScoringSettings}
              scoringKeys={scoringKeys}
            />
          ))}

          <button
            type='button'
            className='btn btn-icon btn-sm btn-light-success w-100 py-8 fw-bold'
            style={{fontSize: '18px'}}
            onClick={() => {
              updateData(
                {
                  scoring_settings: [...gameModeForm.scoring_settings, initScoringSetting()],
                },
                setGameModeForm,
                gameModeForm
              )
            }}
          >
            <i className='fa fa-plus-circle me-3'></i> Add new scoring
          </button>
        </div>
      </div>
    </>
  )
}
