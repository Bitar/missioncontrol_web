import React, {FC, useEffect, useState} from 'react'
import {ActivityForm, activitySchema, initialActivityForm} from './models/Activity'
import {jsonToFormData, updateData} from '../../helpers/form/FormHelper'
import {createActivity} from './core/ActivityRequests'
import {KTCard, KTCardBody} from '../../../_metronic/helpers'
import {Form, Formik} from 'formik'
import {FormAction} from '../../helpers/form/FormAction'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import {
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
} from '@mui/material'
import {Community} from '../community/models/Community'
import {getAllCommunities} from '../community/core/CommunityRequests'
import {TextFieldWrapper} from '../../helpers/form/TextFieldWrapper'
import {Game} from '../../models/game/Game'
import {getAllGameModes, getAllGamePlatforms, getAllGames} from '../games/core/GameRequests'
import {GameMode} from '../../models/game/GameMode'
import {Platform} from '../../models/game/Platform'
import {
  EntryFee,
  Location,
  MatchPlayDatePicker,
  RegistrationDatePicker,
  Scoring,
  TeamDetails,
} from './components'
import {TimeOfDayPicker} from './components/TimeOfDayPicker'
import {getTimeZones} from '../misc/core/_requests'
import {TimeZone} from '../../models/misc/TimeZone'
import TextField from '@mui/material/TextField'
import {PrizeWrapper} from './components/prize/PrizeWrapper'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import {useAuth} from '../../modules/auth'
import {isUserCommunityAdmin} from '../identity/user/models/User'
import {FormErrorAlert} from '../../modules/errors/partials/FormErrorAlert'

const ActivityCreate: FC<React.PropsWithChildren<unknown>> = () => {
  const [communities, setCommunities] = useState<Community[]>()
  const [activity, setActivity] = useState<ActivityForm>(initialActivityForm)

  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined)

  const [games, setGames] = useState<Game[]>()
  const [modes, setModes] = useState<GameMode[]>()
  const [platforms, setPlatforms] = useState<Platform[]>()
  const [timeZones, setTimeZones] = useState<TimeZone[]>()

  const [gameMode, setGameMode] = useState<GameMode>()

  useEffect(() => {
    getAllGames().then((response) => {
      setGames(response.data)
    })

    getAllCommunities().then((response) => {
      setCommunities(response.data)
    })

    getTimeZones().then((response) => {
      setTimeZones(response.data)
    })
  }, [])

  const updateModes = (gameId: number) => {
    getAllGameModes(gameId).then((response) => {
      setModes(response.data)
    })

    getAllGamePlatforms(gameId).then((response) => {
      setPlatforms(response.data)
    })
  }

  const navigate = useNavigate()
  const {currentUser, communityAdmin} = useAuth()

  useEffect(() => {
    if (currentUser && isUserCommunityAdmin(currentUser) && communityAdmin) {
      updateData(
        {
          community_id: communityAdmin?.id,
        },
        setActivity,
        activity
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityAdmin, currentUser])

  const handleSubmit = async () => {
    // prepareForStore(activity, setActivity)
    let data = jsonToFormData(activity)
    createActivity(data)
      .then((response) => {
        toast.success('Activity Created Successfully')
        navigate(`/activities/${response?.id}/overview`)
      })
      .catch((error) => {
        if (error.response) {
          // let obj = error.response.data.error.validation;
          // console.log((error.response.data.error.validation))
          // console.log(obj.stringify())
          setAlertMessage('Error occurred!')
          setHasErrors(true)
        }
      })
  }

  const handleOnChange = (event: any) => {
    let targetName = event.target.name
    let targetValue = event.target.value

    if (targetName === 'entry_fee.amount') {
      updateData(
        {
          entry_fee: {
            ...activity?.entry_fee,
            ...{
              amount: targetValue,
            },
          },
        },
        setActivity,
        activity
      )
    } else if (targetName === 'location.locate') {
      updateData(
        {
          location: {
            ...activity?.location,
            ...{
              locate: targetValue,
            },
          },
        },
        setActivity,
        activity
      )
    } else {
      if (targetName === 'is_cross_play') {
        targetValue = !activity?.is_cross_play
      }

      updateData({[targetName]: targetValue}, setActivity, activity)
    }
  }

  return (
    <>
      <KTCard>
        <Formik
          initialValues={activity}
          onSubmit={handleSubmit}
          validationSchema={activitySchema}
          enableReinitialize
        >
          {({isSubmitting, touched, errors, values}) => (
            <Form onChange={handleOnChange} className='form'>
              <KTCardBody className='py-4'>
                <div className='d-flex flex-column pt-5'>
                  <FormErrorAlert hasErrors={hasErrors} message={alertMessage} />

                  <div className='row mb-6'>
                    <div className='col-lg-12 fv-row'>
                      <TextFieldWrapper name='title' label='Title' />
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <div className='col-lg-12 fv-row'>
                      <TextFieldWrapper name={'description'} label='Description' multiline={true} />
                    </div>
                  </div>

                  {currentUser && !isUserCommunityAdmin(currentUser) && (
                    <div className='row mb-6'>
                      <div className='col-lg-12 fv-row'>
                        <Box sx={{minWidth: 120}}>
                          <FormControl
                            fullWidth
                            size='small'
                            error={touched.community_id && Boolean(errors.community_id)}
                          >
                            <InputLabel id='communities-select-label'>Community</InputLabel>
                            <Select
                              labelId='communities-select-label'
                              id='communities-select'
                              value={values.community_id}
                              name='community_id'
                              label='Community'
                              MenuProps={{PaperProps: {sx: {maxHeight: 300}}}}
                              onChange={handleOnChange}
                            >
                              {communities &&
                                communities?.length > 0 &&
                                communities?.map((community: any) => (
                                  <MenuItem key={community.id} value={community.id}>
                                    {community.name}
                                  </MenuItem>
                                ))}
                            </Select>
                            {touched.community_id && Boolean(errors.community_id) && (
                              <FormHelperText>
                                {touched.community_id && errors.community_id}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Box>
                      </div>
                    </div>
                  )}

                  <div className='separator separator-dashed my-6'></div>

                  <div className='row mb-6'>
                    <div className='col-12'>
                      <h4 className='text-dark'>Game Details</h4>
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <div className='col-lg-12 fv-row'>
                      <Box sx={{minWidth: 120}}>
                        <FormControl
                          fullWidth
                          size='small'
                          error={touched.game_id && Boolean(errors.game_id)}
                        >
                          <InputLabel id='games-select-label'>Games</InputLabel>
                          <Select
                            labelId='games-select-label'
                            id='games-select'
                            value={values.game_id}
                            name='game_id'
                            label='Games'
                            MenuProps={{PaperProps: {sx: {maxHeight: 300}}}}
                            onChange={(e: any) => {
                              if (values.game_mode_id !== '') {
                                values.game_mode_id = ''
                              }
                              handleOnChange(e)
                              updateModes(e.target.value)
                            }}
                          >
                            {games &&
                              games?.length > 0 &&
                              games?.map((game: any) => (
                                <MenuItem key={game.id} value={game.id}>
                                  {game.title}
                                </MenuItem>
                              ))}
                          </Select>
                          {touched.game_id && Boolean(errors.game_id) && (
                            <FormHelperText>{touched.game_id && errors.game_id}</FormHelperText>
                          )}
                        </FormControl>
                      </Box>
                    </div>
                  </div>

                  {activity?.game_id && (
                    <>
                      <div className='row mb-6'>
                        <div className='col-lg-12 fv-row'>
                          <Box sx={{minWidth: 120}}>
                            <FormControl
                              fullWidth
                              size='small'
                              error={touched.game_mode_id && Boolean(errors.game_mode_id)}
                            >
                              <InputLabel id='games-select-label'>Game Mode</InputLabel>
                              <Select
                                labelId='game-mode-select-label'
                                // required
                                id='game-mode-select'
                                value={values.game_mode_id}
                                name='game_mode_id'
                                label='Game Mode'
                                MenuProps={{PaperProps: {sx: {maxHeight: 300}}}}
                                onChange={(event) => {
                                  handleOnChange(event)

                                  setGameMode(
                                    modes?.find((e) => {
                                      return String(e.id) === String(event.target.value)
                                    })
                                  )
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
                              {touched.game_mode_id && Boolean(errors.game_mode_id) && (
                                <FormHelperText>
                                  {touched.game_mode_id && errors.game_mode_id}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Box>
                        </div>
                      </div>

                      <div className='row mb-6'>
                        <div className='col-lg-12 fv-row'>
                          <Box sx={{minWidth: 120}}>
                            <FormControl
                              fullWidth
                              size='small'
                              error={touched.rounds && Boolean(errors.rounds)}
                            >
                              <InputLabel id='rounds-select-label'>Rounds</InputLabel>
                              <Select
                                labelId='rounds-select-label'
                                id='rounds-select'
                                // required
                                value={values.rounds}
                                name='rounds'
                                label='Rounds'
                                onChange={handleOnChange}
                              >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                              </Select>
                              {touched.rounds && Boolean(errors.rounds) && (
                                <FormHelperText>{touched.rounds && errors.rounds}</FormHelperText>
                              )}
                            </FormControl>
                          </Box>
                        </div>
                      </div>

                      <div className='row mb-6'>
                        <div className='col-lg-12 fv-row'>
                          <div className='form-check form-check-custom form-check-solid form-switch'>
                            <FormControlLabel
                              control={
                                <Switch
                                  name='is_cross_play'
                                  value={values.is_cross_play}
                                  onChange={(e) => {
                                    values.platform_ids = []
                                    values.platform_id = ''
                                    handleOnChange(e)
                                  }}
                                />
                              }
                              label='Is CrossPlay'
                            />
                          </div>
                        </div>
                      </div>

                      <div className='row mb-6'>
                        <div className='col-lg-12 fv-row'>
                          <Box sx={{minWidth: 120}}>
                            {values.is_cross_play ? (
                              <FormControl
                                fullWidth
                                size='small'
                                error={touched.platform_ids && Boolean(errors.platform_ids)}
                              >
                                <InputLabel id='platforms-select-label'>Platforms</InputLabel>
                                <Select
                                  labelId='platforms-select-label'
                                  label='Platforms'
                                  multiple
                                  value={values.platform_ids}
                                  name={'platform_ids'}
                                  onChange={handleOnChange}
                                >
                                  {platforms &&
                                    platforms.length > 0 &&
                                    platforms.map((platform: any, index) => (
                                      <MenuItem key={`${index}-${platform.id}`} value={platform.id}>
                                        {platform.name}
                                      </MenuItem>
                                    ))}
                                </Select>
                                {touched.platform_ids && Boolean(errors.platform_ids) && (
                                  <FormHelperText>
                                    {touched.platform_ids && errors.platform_ids}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            ) : (
                              <FormControl
                                fullWidth
                                size='small'
                                error={touched.platform_id && Boolean(errors.platform_id)}
                              >
                                <InputLabel id='platforms-select-label'>Platforms</InputLabel>
                                <Select
                                  labelId='platforms-select-label'
                                  label='Platforms'
                                  // required
                                  value={values.platform_id}
                                  name={'platform_id'}
                                  onChange={handleOnChange}
                                >
                                  {platforms &&
                                    platforms.length > 0 &&
                                    platforms.map((platform: any, index) => (
                                      <MenuItem key={`${index}-${platform.id}`} value={platform.id}>
                                        {platform.name}
                                      </MenuItem>
                                    ))}
                                </Select>
                                {touched.platform_id && Boolean(errors.platform_id) && (
                                  <FormHelperText>
                                    {touched.platform_id && errors.platform_id}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            )}
                          </Box>
                        </div>
                      </div>
                    </>
                  )}
                  <div className='separator separator-dashed my-6'></div>

                  <div className='row mb-6'>
                    <div className='col-12'>
                      <h4 className='text-dark'>Schedule</h4>
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <div className='col-lg-4'>
                      <span className='required fw-bold fs-6'>Registration Dates</span>
                    </div>
                    <div className='col-lg-8 fv-row'>
                      <RegistrationDatePicker activityForm={activity} setActivityForm={setActivity} />
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <div className='col-lg-4'>
                      <span className='required fw-bold fs-6'>Match Play Dates</span>
                    </div>
                    <div className='col-lg-8 fv-row'>
                      <MatchPlayDatePicker activityForm={activity} setActivityForm={setActivity} />
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <div className='col-lg-4'>
                      <span className='required fw-bold fs-6'>Match Frequency</span>
                    </div>
                    <div className='col-lg-8'>
                      <Box sx={{minWidth: 120}}>
                        <FormControl
                          fullWidth
                          size='small'
                          error={
                            touched.schedule?.settings?.frequency &&
                            Boolean(errors.schedule?.settings?.frequency)
                          }
                        >
                          <InputLabel id='frequency-select-label'>Match Frequency</InputLabel>
                          <Select
                            labelId='frequency-select-label'
                            id='frequency-select'
                            name='schedule.settings.frequency'
                            value={values.schedule.settings.frequency}
                            label='Match Frequency'
                            onChange={(e) => {
                              updateData(
                                {
                                  schedule: {
                                    ...activity?.schedule,
                                    ...{
                                      settings: {
                                        ...activity?.schedule.settings,
                                        ...{frequency: e.target.value},
                                      },
                                    },
                                  },
                                },
                                setActivity,
                                activity
                              )
                            }}
                          >
                            <MenuItem value={'1'}>Daily</MenuItem>
                            <MenuItem value={'2'}>Weekly</MenuItem>
                          </Select>
                          {touched.schedule?.settings?.frequency &&
                            Boolean(errors.schedule?.settings?.frequency) && (
                              <FormHelperText>
                                {touched.schedule?.settings?.frequency &&
                                  errors.schedule?.settings?.frequency}
                              </FormHelperText>
                            )}
                        </FormControl>
                      </Box>
                    </div>
                  </div>

                  {activity?.schedule.settings.frequency === '2' && (
                    <div className='row mb-6'>
                      <div className='col-lg-4'>
                        <span className='required fw-bold fs-6'>Day Of Week</span>
                      </div>
                      <div className='col-lg-8'>
                        <Box sx={{minWidth: 120}}>
                          <FormControl
                            fullWidth
                            size='small'
                            error={
                              activity?.schedule.settings.frequency === '2' &&
                              touched.schedule?.settings?.day &&
                              Boolean(errors.schedule?.settings?.day)
                            }
                          >
                            <InputLabel id='day-of-week-select-label'>Day Of Week</InputLabel>
                            <Select
                              labelId='day-of-week-select-label'
                              id='day-of-week-select'
                              value={values.schedule.settings.day}
                              label='Day of Week'
                              required
                              name='schedule.settings.day'
                              onChange={(e) => {
                                updateData(
                                  {
                                    schedule: {
                                      ...activity?.schedule,
                                      ...{
                                        settings: {
                                          ...activity?.schedule.settings,
                                          ...{day: e.target.value},
                                        },
                                      },
                                    },
                                  },
                                  setActivity,
                                  activity
                                )
                              }}
                            >
                              <MenuItem value={'1'}>Monday</MenuItem>
                              <MenuItem value={'2'}>Tuesday</MenuItem>
                              <MenuItem value={'3'}>Wednesday</MenuItem>
                              <MenuItem value={'4'}>Thursday</MenuItem>
                              <MenuItem value={'5'}>Friday</MenuItem>
                              <MenuItem value={'6'}>Saturday</MenuItem>
                              <MenuItem value={'7'}>Sunday</MenuItem>
                            </Select>
                            {touched.schedule?.settings?.day &&
                              Boolean(errors.schedule?.settings?.day) && (
                                <FormHelperText>
                                  {touched.schedule?.settings?.day &&
                                    errors.schedule?.settings?.day}
                                </FormHelperText>
                              )}
                          </FormControl>
                        </Box>
                      </div>
                    </div>
                  )}

                  <div className='row mb-6'>
                    <div className='col-lg-4'>
                      <span className='required fw-bold fs-6'>Time of Day</span>
                    </div>
                    <div className='col-lg-6'>
                      <TimeOfDayPicker activityForm={activity} setActivityForm={setActivity} />
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <div className='col-lg-4'>
                      <span className='required fw-bold fs-6'>Timezone</span>
                    </div>
                    <div className='col-lg-8'>
                      <Box sx={{minWidth: 120}}>
                        <FormControl fullWidth size='small'>
                          <InputLabel id='timezone-select-label'>Timezones</InputLabel>
                          <Select
                            labelId='timezone-select-label'
                            id='timezone-select'
                            // required
                            name='schedule.settings.timezone'
                            value={values.schedule.settings.timezone}
                            label='Timezones'
                            onChange={(e) => {
                              updateData(
                                {
                                  schedule: {
                                    ...activity?.schedule,
                                    ...{
                                      settings: {
                                        ...activity?.schedule.settings,
                                        ...{timezone: e.target.value},
                                      },
                                    },
                                  },
                                },
                                setActivity,
                                activity
                              )
                            }}
                          >
                            {timeZones &&
                              timeZones.length > 0 &&
                              timeZones.map((row: any) => (
                                <MenuItem key={row.id} value={row.id}>
                                  {row.name} - {row.value}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                  </div>

                  <div className='separator separator-dashed my-6'></div>

                  {activity?.game_mode_id && (
                    <>
                      <Scoring gameMode={gameMode} />

                      <div className='separator separator-dashed my-6'></div>

                      <TeamDetails
                        activity={activity}
                        setActivity={setActivity}
                        gameMode={gameMode}
                      />

                      <div className='separator separator-dashed my-6'></div>
                    </>
                  )}

                  <EntryFee activity={activity} setActivity={setActivity} />

                  {activity?.entry_fee?.type === 2 && (
                    <div className='row mb-6'>
                      <div className='col-lg-12 fv-row'>
                        <FormControl fullWidth>
                          <InputLabel htmlFor='outlined-adornment-amount'>Amount</InputLabel>
                          <OutlinedInput
                            required
                            type='number'
                            name='entry_fee.amount'
                            id='outlined-adornment-amount'
                            value={values?.entry_fee?.amount}
                            startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                            label='Amount'
                            size='small'
                          />
                        </FormControl>
                      </div>
                    </div>
                  )}

                  <div className='separator separator-dashed my-6'></div>

                  <Location activity={activity} setActivity={setActivity} />

                  {activity?.location?.type === 2 && (
                    <div className='row mb-6'>
                      <div className='col-lg-12 fv-row'>
                        <TextField
                          required={activity?.location?.type === 2}
                          fullWidth
                          size='small'
                          label='Location'
                          name='location.locate'
                          variant={'outlined'}
                        />
                      </div>
                    </div>
                  )}

                  <div className='separator separator-dashed my-6'></div>

                  <PrizeWrapper activity={activity} setActivity={setActivity} />

                  {/*<div className='separator separator-dashed my-6'></div>*/}
                  {/*<Prizes {...ActivityProps} />*/}
                  {/*  Prize  */}
                </div>
              </KTCardBody>
              <FormAction text={'Add Activity'} isSubmitting={isSubmitting} />
            </Form>
          )}
        </Formik>
      </KTCard>
    </>
  )
}

export { ActivityCreate };
