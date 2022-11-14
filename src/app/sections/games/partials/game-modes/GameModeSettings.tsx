import React, {FC} from 'react'
import {Field} from 'formik'
import {GameSettings} from '../../../../models/game/GameSettings'

type Props = {
  gameModeSettings: GameSettings
  index: number
  removeSetting: any
}

export const GameModeSettings: FC<Props> = ({gameModeSettings, removeSetting, index}) => {
  return (
    <div className='row mb-8'>
      <div className='col-11'>
        <Field
          as='textarea'
          rows={2}
          type='text'
          name={`game.mode.settings.${index}`}
          placeholder='Game mode setting'
          className='form-control mb-lg-0'
          autoComplete='off'
          value={gameModeSettings?.setting}
        />
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
