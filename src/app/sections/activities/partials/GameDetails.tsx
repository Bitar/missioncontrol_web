import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react'
import {getAllGameModes, getAllGamePlatforms, getAllGames} from '../../games/core/GameRequests'
import {updateData} from '../../../helpers/form/FormHelper'
import {ErrorMessage} from 'formik'
import {Activity} from '../models/Activity'
import FormControl from '@mui/material/FormControl'
import {MenuItem, Select, InputLabel, Switch, Autocomplete, TextField} from '@mui/material'
import Box from '@mui/material/Box'
import {Platform} from '../../../models/game/Platform'
import {Game} from '../../../models/game/Game'
import {GameMode} from '../../../models/game/GameMode'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
}

const GameDetails: FC<Props> = ({activity, setActivity}) => {
  const [rounds, setRounds] = useState('')
  const platformsObj = useRef<Platform[] | undefined>([])
  const [platforms, setPlatforms] = useState<Platform[]>([])

  const [games, setGames] = useState<Game[]>()

  const [selectedModes, setSelectedModes] = useState('')
  const [modes, setModes] = useState<GameMode[]>()

  const populatePlatforms = (gameId: number) => {
    getAllGamePlatforms(gameId).then((response) => {
      platformsObj.current = response?.data
    })
  }

  useEffect(() => {
    getAllGames().then((response) => {
      setGames(response.data)
    })
  }, [])

  useEffect(() => {
    if (activity?.game?.id) {
      setSelectedModes('')
      getAllGameModes(activity?.game?.id).then((response) => {
        setModes(response.data)
      })

      populatePlatforms(activity?.game?.id)
      setPlatforms([])
    }
  }, [activity?.game?.id])

  return (
    <>
      <div className='row mb-6'>
        <div className='col-12'>
          <h4 className='text-dark'>Game Details</h4>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Game</label>
        <div className='col-lg-8 fv-row'>
          <Box sx={{minWidth: 120}}>
            <FormControl fullWidth size='small'>
              {games && games.length > 0 && (
                <Autocomplete
                  size='small'
                  disablePortal
                  getOptionLabel={(game) => game.title}
                  options={games}
                  sx={{maxHeight: 300}}
                  isOptionEqualToValue={(option: any, value: any) => option.id === value.id}
                  renderInput={(params) => <TextField {...params} label='Game' />}
                  onChange={(e, game) => {
                    updateData(
                      {
                        game_id: game?.id,
                      },
                      setActivity,
                      activity
                    )

                    updateData(
                      {
                        game: {
                          ...activity?.game,
                          ...{
                            id: game?.id,
                          },
                        },
                      },
                      setActivity,
                      activity
                    )
                  }}
                />
              )}
            </FormControl>
          </Box>
        </div>
      </div>

      {activity?.game && (
        <>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'>Game Mode</label>
            <div className='col-lg-8 fv-row'>
              <Box sx={{minWidth: 120}}>
                <FormControl fullWidth size='small'>
                  <InputLabel id='games-select-label'>Game Mode</InputLabel>
                  <Select
                    labelId='game-mode-select-label'
                    id='game-mode-select'
                    value={selectedModes}
                    label='Game Mode'
                    MenuProps={{PaperProps: {sx: {maxHeight: 300}}}}
                    onChange={(e) => {
                      setSelectedModes(e.target.value as string)

                      updateData(
                        {
                          game_mode_id: e.target.value,
                        },
                        setActivity,
                        activity
                      )

                      modes?.forEach((mode: any) => {
                        if (mode.id === e.target.value) {
                          updateData(
                            {
                              game_mode: mode,
                            },
                            setActivity,
                            activity
                          )
                        }
                      })
                    }}
                  >
                    {modes &&
                      modes?.length > 0 &&
                      modes?.map((mode: any) => (
                        <MenuItem key={mode.id} value={mode.id}>
                          {mode.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'>Rounds</label>
            <div className='col-lg-8 fv-row'>
              <Box sx={{minWidth: 120}}>
                <FormControl fullWidth size='small'>
                  <InputLabel id='timezone-select-label'>Rounds</InputLabel>
                  <Select
                    labelId='timezone-select-label'
                    id='timezone-select'
                    value={rounds}
                    label='Rounds'
                    onChange={(e) => {
                      setRounds(e.target.value as string)

                      updateData(
                        {
                          settings: {
                            ...activity?.settings,
                            ...{
                              rounds: e.target.value,
                            },
                          },
                        },
                        setActivity,
                        activity
                      )
                    }}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <div className='text-danger mt-2'>
                <ErrorMessage name='rounds' />
              </div>
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'>Cross Play</label>
            <div className='col-lg-8 fv-row'>
              <div className='form-check form-check-custom form-check-solid form-switch'>
                <Switch
                  name='is_cross_play'
                  onChange={(e) => {
                    setPlatforms([])
                  }}
                />
              </div>
              <div className='text-danger mt-2'>
                <ErrorMessage name='is_cross_play' />
              </div>
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'>Platforms</label>
            <div className='col-lg-8 fv-row'>
              <Box sx={{minWidth: 120}}>
                <FormControl fullWidth size='small'>
                  <InputLabel id='platforms-select-label'>Platforms</InputLabel>
                  <Select
                    labelId='platforms-select-label'
                    label='platforms'
                    multiple
                    value={platforms}
                    onChange={(e: any) => {
                      let targetValue = e.target.value

                      if (activity?.settings?.is_cross_play) {
                        setPlatforms(targetValue)
                        console.log(targetValue)
                        updateData({platform_ids: targetValue}, setActivity, activity)
                      } else {
                        if (platforms.length === 0) {
                          setPlatforms(targetValue)
                          console.log(targetValue)
                          updateData({platform_ids: targetValue}, setActivity, activity)
                        } else {
                          let lastPlatform = targetValue[targetValue.length - 1]
                          setPlatforms([lastPlatform])
                          updateData({platform_ids: [lastPlatform]}, setActivity, activity)
                        }
                      }

                      if (targetValue.length === 0) {
                        setPlatforms([])
                        updateData({platform_ids: []}, setActivity, activity)
                      }
                    }}
                  >
                    {platformsObj.current &&
                      platformsObj.current.length > 0 &&
                      platformsObj.current.map((row: any) => (
                        <MenuItem key={row.id} value={row.id}>
                          {row.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export { GameDetails };
