import { Activity, ActivityForm } from "../models/Activity";
import React, {Dispatch, FC, SetStateAction} from 'react'
import TextField from '@mui/material/TextField'
import {ScoringSetting} from './ScoringSetting'
import { GameMode } from "../../../models/game/GameMode";

type Props = {
  activity: ActivityForm
  setActivity: Dispatch<SetStateAction<ActivityForm>>
  gameMode: GameMode | undefined
}

const Scoring: FC<Props> = ({activity, gameMode}) => {
  const players = () => {
    let minPlayers = gameMode?.min_players
    let maxPlayers = gameMode?.max_players

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
            fullWidth
            size='small'
            aria-readonly={true}
            value={gameMode?.scoring_type?.name}
            hiddenLabel={true}
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
            hiddenLabel={true}
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
            value={gameMode?.game_time}
            hiddenLabel={true}
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
            value={gameMode?.instructions}
            hiddenLabel={true}
          />
        </div>
      </div>
      
      <div className='row mb-6'>
        <div className='col-12'>
          <TextField
            label='Settings'
            variant='outlined'
            className='w-100'
            multiline
            size='small'
            aria-readonly={true}
            defaultValue={gameMode?.settings.map((value) => {
              return value.setting
            })}
            hiddenLabel={true}
          />
        </div>
      </div>
      
      {gameMode?.scoring_settings && (
        <div className='row mb-6'>
          <div className='col-12'>
            <span className='fs-6 fw-bold'>Scoring Settings</span>
          </div>
          <div className='col-12'>
            {gameMode?.scoring_settings.map((value) => (
              <ScoringSetting key={value.id} settings={value} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export {Scoring}
