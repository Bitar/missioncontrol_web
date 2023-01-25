import {Field} from 'formik'
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {ScoringKey} from '../../../../models/game/scoring/ScoringKey'
import Select from 'react-select'
import {
  initScoringSetting,
  ScoringSettingForm,
} from '../../../../models/game/scoring/ScoringSettings'
import {updateData} from '../../../../helpers/form/FormHelper'
import {GameModeFormType} from '../../models/GameModeFormType'

type Props = {
  gameMode: GameModeFormType
  setGameMode: Dispatch<SetStateAction<GameModeFormType>>
  gameModeScoringSettings: ScoringSettingForm
  index: number
  removeSetting: any
  scoringKeys: ScoringKey[] | undefined
}

export const GameModeScoringSettings: FC<Props> = ({
  gameMode,
  setGameMode,
  gameModeScoringSettings,
  removeSetting,
  index,
  scoringKeys,
}) => {
  const [scoringSettingForm, setScoringSettingForm] = useState<ScoringSettingForm>(
    initScoringSetting(gameModeScoringSettings)
  )

  useEffect(() => {
    if (scoringSettingForm) {
      let items = gameMode?.scoring_settings
      items[index] = scoringSettingForm

      updateData({scoring_settings: items}, setGameMode, gameMode)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scoringSettingForm])

  return (
    <div className='row mb-8'>
      <div className='col-11'>
        <div className='row'>
          <div className='col-6'>
            <Select
              name='scoring_key_id'
              placeholder={'Choose a scoring Key'}
              options={scoringKeys}
              value={
                scoringKeys?.filter(
                  (scoringKey) => scoringKey?.id === scoringSettingForm.scoring_key_id
                )[0]
              }
              getOptionLabel={(scoringKey) => scoringKey?.key}
              getOptionValue={(scoringKey) => scoringKey?.id?.toString() || ''}
              menuPlacement={'top'}
              onChange={(e) => {
                updateData(
                  {
                    scoring_key_id: e?.id,
                  },
                  setScoringSettingForm,
                  scoringSettingForm
                )
              }}
            />
          </div>
          <div className='col-6'>
            <Field
              type='text'
              name={`game.mode.scoring-settings.${index}`}
              placeholder='Scoring value'
              className='form-control mb-lg-0'
              style={{
                padding: '0.55rem 1rem',
              }}
              autoComplete='off'
              value={gameModeScoringSettings?.scoring_values}
              onChange={(e: any) => {
                updateData(
                  {
                    scoring_values: e.target.value,
                  },
                  setScoringSettingForm,
                  scoringSettingForm
                )
              }}
            />
          </div>
        </div>
      </div>
      <div className='col-1'>
        <button
          type='button'
          className='btn btn-icon btn-sm btn-light-danger'
          onClick={() => removeSetting(index)}
        >
          <i className='fa fa-trash'></i>
        </button>
      </div>
    </div>
  )
}
