import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react'
import {Activity} from './models/Activity'
import {ErrorMessage, Field} from 'formik'
import Select from 'react-select'
import {updateData} from '../../helpers/form/FormHelper'
import {SelectMC} from '../../helpers/form/SelectMC'
import {getAllCommunities} from '../community/core/CommunityRequests'

type Props = {
  method: string
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
}

let communitiesOptions: any[] = []
let gamesOptions: any[] = []

const ActivityForm: FC<Props> = ({method, activity, setActivity}) => {
  const [gameSelected, setGameSelected] = useState<any | null>(null)
  const gameLoaded = useRef(false)

  useEffect(() => {
    if (communitiesOptions.length === 0) {
      // getCommunities()
    }
    if (gamesOptions.length === 0) {
      // getGames()
    }
  }, [])

  const handleChange = (object: any) => {
    updateData({community: object}, setActivity, activity)
  }

  return (
    <>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Title</label>
        <div className='col-lg-8 fv-row'>
          <Field
            type='text'
            name='name'
            placeholder='Activity Title'
            className='form-control mb-3 mb-lg-0'
            autoComplete='off'
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='name' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Description</label>
        <div className='col-lg-8 fv-row'>
          <Field
            as='textarea'
            name='description'
            className='form-control mb-3 mb-lg-0'
            placeholder='Activity Description'
            rows={3}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='description' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <SelectMC label={'Community'} api={getAllCommunities} onChangeData={handleChange} />
      </div>

      <div className='separator separator-dashed my-6'></div>

      <div className='row mb-6'>
        <div className='col-12'>
          <h4 className='text-dark'>Game Details</h4>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Game</label>
        <div className='col-lg-8 fv-row'>
          {/*{(gameLoaded || method === "create") && (*/}
          {/*  <Select*/}
          {/*    isSearchable*/}
          {/*    defaultValue={gameSelected}*/}
          {/*    options={gamesOptions}*/}
          {/*    onChange={handleGameChange}*/}
          {/*  />*/}
          {/*)}*/}
          <div className='text-danger mt-2'>
            <ErrorMessage name='description' />
          </div>
        </div>
      </div>

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
          <Field
            className='form-check-input w-45px h-30px'
            type='checkbox'
            checked={activity?.settings?.is_cross_play}
            onChange={
              () => console.log('changing is Crossplay')
              // updateData({
              //   is_cross_play: !activity?.settings?.is_cross_play
              // }, setActivity, activity)
            }
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='name' />
          </div>
        </div>
      </div>
    </>
  )
}

export {ActivityForm}
