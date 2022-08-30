import React, {FC, useEffect, useState} from 'react'
import {ErrorMessage, Field} from 'formik'
import Select from 'react-select'
import {getGames} from '../../games/core/GameRequests'
import {ACTIVITY_ROUNDS, selectCustomStyles} from '../core/_consts'
import {Activity, initialActivity} from '../models/Activity'

const gamesSelect: any[] = []
const platforms: any[] = []

const Step2: FC<React.PropsWithChildren<unknown>> = () => {
  //TODO: Change this so that it is a community Object
  const [data, setData] = useState<Activity>(initialActivity)

  const updateData = (fieldsToUpdate: Partial<Activity>) => {
    const updatedData = {...data, ...fieldsToUpdate}
    setData(updatedData)
  }

  useEffect(() => {
    getGames('per_page=200').then((response) => {
      response?.data?.forEach(function (value) {
        gamesSelect.push({
          value: value.id,
          label: value.title,
          image: value.image,
          description: value.description,
          platforms: value.platforms,
        })
      })
    })
  }, [])

  const updatePlatforms = (inputValue: any) => {
    console.log(inputValue.platforms)
    if (inputValue.platforms.length > 0) {
      inputValue.platforms.forEach(function (value: any) {
        platforms.push({
          value: value.id,
          label: value.name,
          abbreviation: value.abbreviation,
        })
      })
    }
  }

  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark'>Activity Info</h2>

        <div className='text-gray-400 fw-bold fs-6'>
          If you need more info, please check out
          <a href='/' className='link-primary fw-bolder' target={'_blank'}>
            
            Help Page
          </a>
          .
        </div>
      </div>

      <div className='mb-10 fv-row'>
        <label className='form-label mb-3'>Game</label>

        {gamesSelect.length > 0 && (
          <Select
            className='basic-single'
            classNamePrefix='select'
            isClearable={true}
            isSearchable={true}
            name='gameTitle'
            // onInputChange={updatePlatforms}
            onChange={updatePlatforms}
            options={gamesSelect}
            styles={selectCustomStyles}
            formatOptionLabel={(game) => (
              <div className='game-option'>
                <div className='row'>
                  <div className='col-3'>
                    <div className='game-image d-inline'>
                      <img src={game.image} alt={game.label} className='w-100 rounded d-block' />
                    </div>
                  </div>
                  <div className='col-8'>
                    <div className='game-content d-inline'>
                      <div className='game-title'>
                        <h4 className='d-inline'>{game.label}</h4>
                      </div>
                      <div className='game-description text-muted'>{game.description}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          />
        )}

        <div className='text-danger mt-2'>
          <ErrorMessage name='gameTitle' />
        </div>
      </div>

      <div className='mb-10 fv-row'>
        <label className='form-label mb-3'>Title</label>

        <Field
          type='text'
          className='form-control form-control-lg form-control-solid'
          name='activityTitle'
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='activityTitle' />
        </div>
      </div>

      <div className='mb-10 fv-row'>
        <label className='form-label mb-3'>Description</label>

        <Field
          as='textarea'
          name='description'
          className='form-control form-control-lg form-control-solid'
          rows={3}
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='description' />
        </div>
      </div>

      <div className='mb-10 fv-row'>
        <label className='form-label mb-3'>Rounds</label>

        <Select
          className='basic-single'
          classNamePrefix='select'
          isClearable={true}
          isSearchable={true}
          name='rounds'
          options={ACTIVITY_ROUNDS}
          styles={selectCustomStyles}
        />

        <div className='text-danger mt-2'>
          <ErrorMessage name='rounds' />
        </div>
      </div>

      {/* TODO: Check if the game has crossPlay option. */}
      <div className='mb-10 fv-row'>
        <div className='d-flex flex-stack'>
          <div className='d-flex'>
            <div className='d-flex flex-column'>
              <span className='fs-5 text-dark fw-bolder'>Enable CrossPlay</span>
              <div className='fs-6 fw-bold text-gray-400'>
                Description on what that means to enable cross play.
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-end'>
            <div className='form-check form-check-solid form-switch'>
              {/*<input*/}
              {/*    className='form-check-input w-45px h-30px'*/}
              {/*    type='checkbox'*/}
              {/*    id='googleswitch'*/}
              {/*    checked={data?.is_crossPlay}*/}
              {/*    onChange={() =>*/}
              {/*        updateData({*/}
              {/*            is_crossPlay: !data?.is_crossPlay,*/}
              {/*        })*/}
              {/*    }*/}
              {/*/>*/}
              <label className='form-check-label' htmlFor='googleswitch' />
            </div>
          </div>
        </div>
      </div>

      {/*{data.is_crossPlay && platforms.length > 0 &&*/}
      {/*    <div className='mb-10 fv-row'>*/}
      {/*        <label className='form-label mb-3'>Platforms</label>*/}

      {/*        {platforms.length > 0 &&*/}
      {/*            <Select*/}
      {/*                className="basic-single"*/}
      {/*                classNamePrefix="select"*/}
      {/*                isClearable={true}*/}
      {/*                isSearchable={true}*/}
      {/*                isMulti={true}*/}
      {/*                name="platforms"*/}
      {/*                options={platforms}*/}
      {/*                styles={selectCustomStyles}*/}
      {/*            />*/}
      {/*        }*/}

      {/*        <div className='text-danger mt-2'>*/}
      {/*            <ErrorMessage name='platforms'/>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*}*/}
    </div>
  )
}

export {Step2}
