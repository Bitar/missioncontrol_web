import {Activity} from '../models/Activity'
import React, {Dispatch, FC, SetStateAction, useState} from 'react'
import {Button, ButtonGroup} from '@mui/material'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
}

const TeamDetails: FC<Props> = ({activity, setActivity}) => {
  const [players, setPlayers] = useState(0)
  const [minTeam, setMinTeam] = useState(0)
  const [maxTeam, setMaxTeam] = useState(0)

  return (
    <>
      <div className='row mb-6'>
        <div className='col-12'>
          <h4 className='text-dark'>Team Details</h4>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Players per team</label>
        <div className='col-lg-8 fv-row'>
          <ButtonGroup size='small' aria-label='small outlined button group'>
            <button
              type={"button"}
              className='btn btn-icon btn-sm btn-mc-secondary rounded-0'
              onClick={() => (players !== 0 ? setPlayers(players - 1) : setPlayers(0))}
            >
              <i className='fa fa-minus'></i>
            </button>
            <Button disabled={true} className={'text-dark fs-4'}>
              {players}
            </Button>
            <button
              type={"button"}
              className='btn btn-icon btn-sm btn-mc-secondary rounded-0'
              onClick={() => setPlayers(players + 1)}
            >
              <i className='fa fa-plus'></i>
            </button>
          </ButtonGroup>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Minimum Team</label>
        <div className='col-lg-8 fv-row'>
          <ButtonGroup size='small' aria-label='small outlined button group'>
            <button
              type={"button"}
              className='btn btn-icon btn-sm btn-mc-secondary rounded-0'
              onClick={() => (minTeam !== 0 ? setMinTeam(minTeam - 1) : setMinTeam(0))}
            >
              <i className='fa fa-minus'></i>
            </button>
            <Button disabled={true} className={'text-dark fs-4'}>
              {minTeam}
            </Button>
            <button
              type={"button"}
              className='btn btn-icon btn-sm btn-mc-secondary rounded-0'
              onClick={() => setMinTeam(minTeam + 1)}
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
              type={"button"}
              className='btn btn-icon btn-sm btn-mc-secondary rounded-0'
              onClick={() => (maxTeam !== 0 ? setMaxTeam(maxTeam - 1) : setMaxTeam(0))}
            >
              <i className='fa fa-minus'></i>
            </button>
            <Button disabled={true} className={'text-dark fs-4'}>
              {maxTeam}
            </Button>
            <button
              type={"button"}
              className='btn btn-icon btn-sm btn-mc-secondary rounded-0'
              onClick={() => setMaxTeam(maxTeam + 1)}
            >
              <i className='fa fa-plus'></i>
            </button>
          </ButtonGroup>
        </div>
      </div>

      {/*<div className='row mb-6'>*/}
      {/*  <label className='col-lg-4 col-form-label required fw-bold fs-6'>Minimum Teams</label>*/}
      {/*  <div className='col-lg-8 fv-row'>*/}
      {/*    <Field*/}
      {/*      type='number'*/}
      {/*      name='team_settings.min'*/}
      {/*      className='form-control mb-3 mb-lg-0'*/}
      {/*      value={activity?.team_settings?.min}*/}
      {/*    />*/}
      {/*    <div className='text-danger mt-2'>*/}
      {/*      <ErrorMessage name='team_settings.min' />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*<div className='row mb-6'>*/}
      {/*  <label className='col-lg-4 col-form-label required fw-bold fs-6'>Maximum Teams</label>*/}
      {/*  <div className='col-lg-8 fv-row'>*/}
      {/*    <Field*/}
      {/*      type='number'*/}
      {/*      name='team_settings.max'*/}
      {/*      className='form-control mb-3 mb-lg-0'*/}
      {/*      value={activity?.team_settings?.max}*/}
      {/*    />*/}
      {/*    <div className='text-danger mt-2'>*/}
      {/*      <ErrorMessage name='team_settings.max' />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  )
}

export { TeamDetails };
