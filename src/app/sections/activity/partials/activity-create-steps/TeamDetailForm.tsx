import React, {useEffect, useMemo, useState} from 'react'
import {Button, ButtonGroup} from 'react-bootstrap'
import {updateData} from '../../../../helpers/form/FormHelper'
import {useActivityForm} from '../../core/contexts/ActivityFormContext'

export const TeamDetailForm = () => {
  const {activityForm, setActivityForm, gameModes} = useActivityForm()

  const gameMode = useMemo(
    () => gameModes?.filter((gameMode) => gameMode.id === activityForm?.game_mode_id)[0],
    [activityForm?.game_mode_id, gameModes]
  )

  const [players, setPlayers] = useState<number>(gameMode?.min_players || 0)
  const [minTeam, setMinTeam] = useState<number>(activityForm?.team?.min || 2)
  const [maxTeam, setMaxTeam] = useState<number>(activityForm?.team?.max || 2)

  const updateObject = (updateObj: object) => {
    updateData(
      {
        team: {
          ...activityForm?.team,
          ...updateObj,
        },
      },
      setActivityForm,
      activityForm
    )
  }

  useEffect(() => {
    let updateObj: {players?: number; min?: number; max?: number} = {
      players: gameMode?.min_players,
      min: activityForm?.team?.min || 2,
      max: activityForm?.team?.max || 2,
    }

    setPlayers(gameMode?.min_players || 0)
    setMinTeam(activityForm?.team?.min || 2)
    setMaxTeam(activityForm?.team?.max || 2)

    updateObject(updateObj)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameMode?.min_players])

  useEffect(() => {
    if (activityForm?.team) {
      setMinTeam(activityForm?.team?.min)
      setMaxTeam(activityForm?.team?.max)
    }
  }, [activityForm?.team])

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
          ...activityForm?.team,
          ...updateObj,
        },
      },
      setActivityForm,
      activityForm
    )
  }

  return (
    <div className='d-flex flex-column pt-5 w-100'>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label'>
          <span className='fw-bold fs-6'>Players per team</span>
          <p className='text-muted m-0'>The number of players per team for the chosen game mode.</p>
        </label>
        <div className='col-lg-8 fv-row'>
          <ButtonGroup aria-label='small outlined button group'>
            <button
              type={'button'}
              className='btn btn-icon btn-sm btn-mc-secondary rounded-0'
              onClick={() => handlePlayersClick('sub')}>
              <i className='fa fa-minus'></i>
            </button>
            <Button disabled={true} className='text-dark fs-4 py-0' variant={"light"}>
              {players}
            </Button>
            <button
              type={'button'}
              className='btn btn-icon btn-sm btn-mc-secondary rounded-0'
              onClick={() => handlePlayersClick('add')}>
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
          <ButtonGroup aria-label='small outlined button group'>
            <button
              type={'button'}
              className='btn btn-icon btn-sm btn-mc-secondary rounded-0'
              onClick={() => handleMinClick('sub')}>
              <i className='fa fa-minus'></i>
            </button>
            <Button disabled={true} className='text-dark fs-4 py-0' variant={"light"}>
              {minTeam}
            </Button>
            <button
              type={'button'}
              className='btn btn-icon btn-sm btn-mc-secondary rounded-0'
              onClick={() => handleMinClick('add')}>
              <i className='fa fa-plus'></i>
            </button>
          </ButtonGroup>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label fw-bold fs-6'>Maximum Team</label>
        <div className='col-lg-8 fv-row'>
          <ButtonGroup aria-label='small outlined button group'>
            <button
              type={'button'}
              className='btn btn-icon btn-sm btn-mc-secondary rounded-0'
              onClick={() => handleMaxClick('sub')}>
              <i className='fa fa-minus'></i>
            </button>
            <Button disabled={true} className='text-dark fs-4 py-0' variant={"light"}>
              {maxTeam}
            </Button>
            <button
              type={'button'}
              className='btn btn-icon btn-sm btn-mc-secondary rounded-0'
              onClick={() => handleMaxClick('add')}>
              <i className='fa fa-plus'></i>
            </button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  )
}
