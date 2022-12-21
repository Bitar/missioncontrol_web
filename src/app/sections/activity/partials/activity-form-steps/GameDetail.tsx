import {useActivityForm} from '../../core/contexts/ActivityFormContext'
import {useActivity} from '../../core/contexts/ActivityContext'
import {useParams} from 'react-router-dom'
import React, {useEffect, useRef, useState} from 'react'
import {KTCard, KTCardBody, KTCardHeader} from '../../../../helpers/components'
import {activityDetailsSchema} from '../../models/Activity'
import {ErrorMessage, Form, Formik} from 'formik'
import {FormAction} from '../../../../helpers/form/FormAction'
import Select from 'react-select'
import {jsonToFormData, updateData} from '../../../../helpers/form/FormHelper'
import {SwitchInput} from '../../../../components/SwitchInput/SwitchInput'
import {Scoring} from '../../components'
import {getAllGameModes, getAllGamePlatforms, getAllGames} from '../../../games/core/GameRequests'
import {Game} from '../../../../models/game/Game'
import {GameMode} from '../../../../models/game/GameMode'
import {Platform} from '../../../../models/game/Platform'
import {updateActivity} from '../../core/requests/ActivityRequests'
import toast from 'react-hot-toast'

export const GameDetail = () => {
  const params = useParams()
  // const { currentUser } = useAuth();
  const {activity, setActivity} = useActivity()
  const {activityForm, setActivityForm} = useActivityForm()

  const [games, setGames] = useState<Game[]>()
  const [modes, setModes] = useState<GameMode[]>()
  const [platforms, setPlatforms] = useState<Platform[]>()

  const selectGameModeRef = useRef<any>()
  const selectPlatformsRef = useRef<any>()

  useEffect(() => {
    getAllGames().then((response) => {
      setGames(response.data)
    })
  }, [])

  useEffect(() => {
    if (activityForm?.game_id) {
      updateModes(activityForm?.game_id)
    }
  }, [activityForm?.game_id])

  const updateModes = (gameId?: any) => {
    getAllGameModes(gameId).then((response) => {
      setModes(response.data)
    })

    getAllGamePlatforms(gameId).then((response) => {
      setPlatforms(response.data)
    })
  }

  const handleSubmit = async () => {
    let data = jsonToFormData(activityForm)
    data.append('_method', 'PUT')

    await updateActivity(params.id, data)
      .then((response) => {
        toast.success('Activity updated Successfully!')
        setActivity(response)
      })
      .catch(function (e) {
        if (e.response) {
        }
      })
  }

  const handleOnChange = async () => {}

  const handlePlatformChange = (e: any) => {
    let platform_ids = []

    if (Array.isArray(e)) {
      platform_ids = e.map((e) => e.id)
    } else {
      if (e) {
        platform_ids = [e.id]
      }
    }

    updateData({platform_ids: platform_ids}, setActivityForm, activityForm)
  }

  return (
    <KTCard border={true}>
      <KTCardHeader text={'General Details'} bg='mc-primary' text_color='white' />

      <Formik
        validationSchema={activityDetailsSchema}
        initialValues={activityForm!}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({isSubmitting}) => (
          <Form onChange={handleOnChange} className='form' autoComplete='off'>
            <KTCardBody className='py-4'>
              <div className='d-flex flex-column pt-5'>
                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>Games</label>
                  <div className='col-lg-8 fv-row'>
                    {activity?.game && (
                      <Select
                        name='game_id'
                        placeholder={'Choose a Game'}
                        defaultValue={activity?.game}
                        options={games}
                        getOptionLabel={(game) => game?.title}
                        getOptionValue={(game) => game?.id?.toString() || ''}
                        onChange={(e) => {
                          updateData({game_id: e?.id || ''}, setActivityForm, activityForm)
                          e?.id && updateModes(e.id)
                          selectGameModeRef.current.clearValue()
                        }}
                      />
                    )}
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='game_id' />
                    </div>
                  </div>
                </div>

                {activityForm?.game_id && (
                  <>
                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Game Mode</label>
                      <div className='col-lg-8 fv-row'>
                        {activity?.game_mode && (
                          <Select
                            name='game_mode_id'
                            ref={selectGameModeRef}
                            placeholder={'Choose a Game Mode'}
                            defaultValue={activity?.game_mode}
                            options={modes}
                            getOptionLabel={(mode) => mode?.name}
                            getOptionValue={(mode) => mode?.id?.toString() || ''}
                            onChange={(e) => {
                              updateData({game_mode_id: e?.id || ''}, setActivityForm, activityForm)
                            }}
                          />
                        )}
                        <div className='text-danger mt-2'>
                          <ErrorMessage name='game_mode_id' />
                        </div>
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Rounds</label>
                      <div className='col-lg-8 fv-row'>
                        {activity?.game_mode && (
                          <Select
                            name='rounds'
                            placeholder={'How many rounds?'}
                            defaultValue={{
                              value: activityForm?.rounds,
                              label: activityForm?.rounds,
                            }}
                            options={[
                              {value: 1, label: '1'},
                              {value: 3, label: '3'},
                              {value: 5, label: '5'},
                              {value: 7, label: '7'},
                            ]}
                            onChange={(e) => {
                              updateData({rounds: e?.value || ''}, setActivityForm, activityForm)
                            }}
                          />
                        )}
                        <div className='text-danger mt-2'>
                          <ErrorMessage name='rounds' />
                        </div>
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Crossplay</label>
                      <div className='col-lg-8 fv-row'>
                        <SwitchInput
                          isOn={activityForm?.is_cross_play}
                          handleToggle={() => {
                            selectPlatformsRef.current.clearValue()
                            updateData(
                              {is_cross_play: !activityForm?.is_cross_play},
                              setActivityForm,
                              activityForm
                            )
                          }}
                        />
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Platforms</label>
                      <div className='col-lg-8 fv-row'>
                        <Select
                          name='platform_ids'
                          placeholder={'Which Platform(s)'}
                          ref={selectPlatformsRef}
                          defaultValue={activity?.platforms}
                          isMulti={activityForm?.is_cross_play}
                          options={platforms}
                          getOptionLabel={(platform) => platform?.name}
                          getOptionValue={(platform) => platform?.id?.toString() || ''}
                          onChange={(e) => handlePlatformChange(e)}
                        />
                        <div className='text-danger mt-2'>
                          <ErrorMessage name='platform_ids' />
                        </div>
                      </div>
                    </div>

                    {activityForm?.game_mode_id && (
                      <Scoring
                        gameMode={
                          modes?.filter((mode) => mode.id === activityForm?.game_mode_id)[0]
                        }
                      />
                    )}
                  </>
                )}
              </div>
            </KTCardBody>
            <FormAction text={'Update Activity'} isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </KTCard>
  )
}
