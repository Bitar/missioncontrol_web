import {Activity} from '../models/Activity'
import React, {Dispatch, FC, SetStateAction} from 'react'
import TextField from '@mui/material/TextField'
import {ScoringSetting} from './ScoringSetting'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
}

const Scoring: FC<Props> = ({activity}) => {
  const players = () => {
    let minPlayers = activity?.game_mode?.min_players
    let maxPlayers = activity?.game_mode?.max_players

    if (minPlayers === maxPlayers) {
      return minPlayers
    }

    return minPlayers + ' - ' + maxPlayers
  }

  return (
    <>
      <div className='row mb-6'>
        <div className='col-12'>
          <h4 className='text-dark'>Scoring</h4>
        </div>
      </div>

      <div className='row mb-6'>
        <div className='col-12'>
          <TextField
            label='Type'
            variant='outlined'
            className='w-100'
            size='small'
            aria-readonly={true}
            value={activity?.game_mode?.scoring_type?.name}
          />
        </div>
      </div>

      <div className='row mb-6'>
        <div className='col-12'>
          <TextField
            label='Players'
            variant='outlined'
            className='w-100'
            size='small'
            aria-readonly={true}
            value={players()}
          />
        </div>
      </div>

      <div className='row mb-6'>
        <div className='col-12'>
          <TextField
            label='Game time'
            variant='outlined'
            className='w-100'
            size='small'
            aria-readonly={true}
            value={activity?.game_mode?.game_time}
          />
        </div>
      </div>

      <div className='row mb-6'>
        <div className='col-12'>
          <TextField
            label='Instructions'
            variant='outlined'
            className='w-100'
            multiline
            size='small'
            aria-readonly={true}
            value={activity?.game_mode?.instructions}
          />
        </div>
      </div>

      <div className='row mb-6'>
        <div className='col-12'>
          <TextField
            label='Instructions'
            variant='outlined'
            className='w-100'
            multiline
            size='small'
            aria-readonly={true}
            value={activity?.game_mode?.settings.map((value) => {
              return value.setting
            })}
          />
        </div>
      </div>

      {activity?.game_mode?.scoring_settings && (
        <div className='row mb-6'>
          <div className='col-12'>
            <span className='fs-6 fw-bold'>Scoring Settings</span>
          </div>
          <div className='col-12'>
            {activity?.game_mode?.scoring_settings.map((value) => (
              <ScoringSetting key={value.id} settings={value} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export {Scoring}
