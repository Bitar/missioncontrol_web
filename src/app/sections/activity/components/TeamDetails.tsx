import {ActivityForm} from '../models/Activity'
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {Button, ButtonGroup} from '@mui/material'
import {GameMode} from '../../../models/game/GameMode'
import {updateData} from '../../../helpers/form/FormHelper'

type Props = {
  activity: ActivityForm
  setActivity: Dispatch<SetStateAction<ActivityForm>>
  gameMode: GameMode | undefined
}

const TeamDetails: FC<Props> = ({activity, setActivity, gameMode}) => {
  const [players, setPlayers] = useState<number>(gameMode?.min_players || 0)
  const [minTeam, setMinTeam] = useState<number>(activity?.team?.min || 2)
  const [maxTeam, setMaxTeam] = useState<number>(activity?.team?.max || 2)

  const updateObject = (updateObj: object) => {
    updateData(
      {
        team: {
          ...activity?.team,
          ...updateObj,
        },
      },
      setActivity,
      activity
    )
  }

  useEffect(() => {
    let updateObj: {players?: number; min?: number; max?: number} = {
      players: gameMode?.min_players
    }

    // console.log(gameMode?.min_players)
    setPlayers(gameMode?.min_players || 0)

    updateObject(updateObj)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameMode?.min_players])

  const handleMinClick = (direction: string) => {
    let updateObj: {players?: number; min?: number; max?: number} = {
      players: players,
      min: minTeam,
      max: maxTeam,
    }

    if (direction === 'sub') {
      if (minTeam > 2) {
        setMinTeam(minTeam - 1)
        updateObj = {...updateObj, ...{min: minTeam - 1}}
      } else {
        updateObj = {...updateObj, ...{min: 2}}
      }
    } else {
      if (minTeam + 1 >= maxTeam) {
        setMaxTeam(minTeam + 1)
        updateObj = {...updateObj, ...{max: minTeam + 1}}
      }

      updateObj = {...updateObj, ...{min: minTeam + 1}}
      setMinTeam(minTeam + 1)
    }

    updateObject(updateObj)
  }

  const handleMaxClick = (direction: string) => {
    let updateObj: {players?: number; min?: number; max?: number} = {
      players: players,
      min: minTeam,
      max: maxTeam,
    }

    if (direction === 'sub') {
      if (maxTeam > 2) {
        if (maxTeam - 1 <= minTeam) {
          setMinTeam(maxTeam - 1)
          updateObj = {...updateObj, ...{min: maxTeam - 1}}
        }

        updateObj = {...updateObj, ...{max: maxTeam - 1}}
        setMaxTeam(maxTeam - 1)
      } else {
        setMaxTeam(2)
        setMinTeam(2)
        updateObj = {...updateObj, ...{max: 2, min: 2}}
      }
    } else {
      setMaxTeam(maxTeam + 1)
      updateObj = {...updateObj, ...{max: maxTeam + 1}}
    }

    updateObject(updateObj)
  }

  const handlePlayersClick = (direction: string) => {
    let updateObj: {min?: number; max?: number; players?: number} = {
      min: minTeam,
      max: maxTeam,
      players: players,
    }

    if (direction === 'sub') {
      if (players !== 0) {
        if (gameMode?.min_players) {
          if (players - 1 >= gameMode?.min_players) {
            setPlayers(players - 1)
            updateObj = {players: players - 1}
          }
        }
      } else {
        setPlayers(0)
        updateObj = {players: 0}
      }
    } else {
      if (gameMode?.max_players) {
        if (players + 1 <= gameMode?.max_players) {
          setPlayers(players + 1)
          updateObj = {players: players + 1}
        }
      }
    }

    updateData(
      {
        team: {
          ...activity?.team,
          ...updateObj,
        },
      },
      setActivity,
      activity
    )
  }

  return (
    <>
      <div className='row mb-6'>
        <div className='col-12'>
          <h4 className='text-dark'>Team Details</h4>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label'>
          <span className='fw-bold fs-6'>Players per team</span>
          <p className='text-muted m-0'>The number of players per team for the chosen game mode.</p>
        </label>
        <div className='col-lg-8 fv-row'>
          <ButtonGroup size='small' aria-label='small outlined button group'>
            <button
              type={'button'}
              className='btn btn-icon btn-sm btn-mc-secondary rounded-0'
              onClick={() => handlePlayersClick('sub')}
            >
              <i className='fa fa-minus'></i>
            </button>
            <Button disabled={true} className='text-dark fs-4 py-0'>
              {players}
            </Button>
            <button
              type={'button'}
              className='btn btn-icon btn-sm btn-mc-secondary rounded-0'
              onClick={() => handlePlayersClick('add')}
            >
              <i className='fa fa-plus'></i>
            </button>
          </ButtonGroup>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label'>
          <span className='fw-bold fs-6'>Minimum Teams</span>
          <p className='text-muted m-0'>Minimum of 2 teams is required</p>
        </label>
        <div className='col-lg-8 fv-row'>
          <ButtonGroup size='small' aria-label='small outlined button group'>
            <button
              type={'button'}
              className='btn btn-icon btn-sm btn-mc-secondary rounded-0'
              onClick={() => handleMinClick('sub')}
            >
              <i className='fa fa-minus'></i>
            </button>
            <Button disabled={true} className='text-dark fs-4 py-0'>
              {minTeam}
            </Button>
            <button
              type={'button'}
              className='btn btn-icon btn-sm btn-mc-secondary rounded-0'
              onClick={() => handleMinClick('add')}
            >
              <i className='fa fa-plus'></i>
            </button>
          </ButtonGroup>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Maximum Team</label>
        <div className='col-lg-8 fv-row'>
          <ButtonGroup size='small' aria-label='small outlined button group'>
            <button
              type={'button'}
              className='btn btn-icon btn-sm btn-mc-secondary rounded-0'
              onClick={() => handleMaxClick('sub')}
            >
              <i className='fa fa-minus'></i>
            </button>
            <Button disabled={true} className='text-dark fs-4 py-0'>
              {maxTeam}
            </Button>
            <button
              type={'button'}
              className='btn btn-icon btn-sm btn-mc-secondary rounded-0'
              onClick={() => handleMaxClick('add')}
            >
              <i className='fa fa-plus'></i>
            </button>
          </ButtonGroup>
        </div>
      </div>
    </>
  )
}

export {TeamDetails}
