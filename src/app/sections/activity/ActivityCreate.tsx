import React, {FC, useEffect, useRef, useState} from 'react'
import {
  Activity,
  activitySchema,
  formOnChange,
  initialActivity,
  prepareForStore,
} from './models/Activity'
import {useNavigate} from 'react-router-dom'
import {jsonToFormData, updateData} from '../../helpers/form/FormHelper'
import {createActivity} from './core/ActivityRequests'
import {KTCard, KTCardBody} from '../../../_metronic/helpers'
import {ErrorMessage, Form, Formik} from 'formik'
import {FormAction} from '../../helpers/form/FormAction'
import {ActivityForm} from './ActivityForm'
import TextField from '@mui/material/TextField'
import {isUserCommunityAdmin} from '../identity/user/models/User'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import {FormHelperText, InputLabel, MenuItem, Select} from '@mui/material'
import {EntryFee, GameDetails, Location, Schedule, Scoring, TeamDetails} from './components'
import {PrizeWrapper} from './components/prize/PrizeWrapper'
import {Community} from '../community/models/Community'
import {useAuth} from '../../modules/auth'
import {getAllCommunities} from '../community/core/CommunityRequests'

const ActivityCreate: FC<React.PropsWithChildren<unknown>> = () => {
  const [selectedCommunity, setSelectedCommunity] = useState('')
  const [communities, setCommunities] = useState<Community[]>()
  const [activity, setActivity] = useState<Activity>(initialActivity)
  // const [requestError, setRequestError] = useState([])
  const requestError = useRef(undefined)
  const [showAlert, setShowAlert] = useState<boolean>(false)

  const navigate = useNavigate()
  const {currentUser, communityAdmin} = useAuth()

  const ActivityProps = {
    activity: activity,
    setActivity: setActivity,
  }

  useEffect(() => {
    if (activity?.ready_to_submit) {
      let data = jsonToFormData(activity)
      createActivity(data)
        .then((response) => {
          console.log('done')
        })
        .catch((error) => {
          if (error.response) {
            requestError.current = error.response.data.error.validation
            setShowAlert(true)
          }
        })
      // navigate('/activities/' + response?.id)
    }
  }, [navigate, activity?.ready_to_submit])

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
  }, [communityAdmin, currentUser])

  useEffect(() => {
    getAllCommunities().then((response) => {
      setCommunities(response.data)
    })
  }, [])

  const handleSubmit = async () => {
    prepareForStore(activity, setActivity)
  }

  const handleOnChange = (e: any) => formOnChange(e, activity, setActivity)

  return (
    <>
      <KTCard>
        <div className='card-header'>
          <div className='card-title'>
            <span className='card-icon'>
              <i className='las la-plus fs-2' />
            </span>
            <h3 className='card-label'>Add Activity</h3>
          </div>
        </div>
        <Formik
          initialValues={activity}
          onSubmit={handleSubmit}
          validationSchema={activitySchema}
          enableReinitialize
        >
          {({isSubmitting, touched, errors}) => (
            <Form onChange={handleOnChange} className='form'>
              <KTCardBody className='py-4'>
                <div className='d-flex flex-column pt-5'>
                  {requestError.current && showAlert && (
                    <div className='alert alert-danger d-flex align-items-center p-5 mb-10'>
                      <span className='text-danger me-3'>
                        <i className='fa fa-times-circle fs-3 text-danger'></i>
                      </span>

                      <div className='d-flex flex-column'>
                        <h5 className='mb-1'>Validation Error</h5>
                        <ul className='p-0 list-inline'>
                          {Object.entries(requestError.current).map((value: any, index) => {
                            return (
                              <li key={`validation-error-${index}`}>
                                <span>{value[1]}</span>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>Title</label>
                    <div className='col-lg-8 fv-row'>
                      <TextField
                        label='Title'
                        variant='outlined'
                        name='title'
                        className='w-100'
                        size='small'
                        // error={touched.title && Boolean(errors.title)}
                        // helperText={touched.title && errors.title}
                      />
                      <TextField
                        label='Type'
                        variant='outlined'
                        name='type_id'
                        className='w-100'
                        size='small'
                        value={1}
                        hidden={true}
                      />
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                      Description
                    </label>
                    <div className='col-lg-8 fv-row'>
                      <TextField
                        label='Description'
                        variant='outlined'
                        multiline
                        name='description'
                        className='w-100'
                        size='small'
                        // error={touched.description && Boolean(errors.description)}
                        // helperText={touched.description && errors.description}
                      />
                    </div>
                  </div>

                  {currentUser && !isUserCommunityAdmin(currentUser) && (
                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                        Community
                      </label>
                      <div className='col-lg-8 fv-row'>
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
                              value={selectedCommunity}
                              name='community_id'
                              label='Community'
                              MenuProps={{PaperProps: {sx: {maxHeight: 300}}}}
                              onChange={(e) => {
                                setSelectedCommunity(e.target.value)

                                updateData(
                                  {
                                    community_id: e.target.value,
                                  },
                                  setActivity,
                                  activity
                                )
                              }}
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

                  <GameDetails {...ActivityProps} />

                  <div className='separator separator-dashed my-6'></div>

                  <Schedule {...ActivityProps} />

                  <div className='separator separator-dashed my-6'></div>

                  {activity?.game_mode && (
                    <>
                      <Scoring {...ActivityProps} />

                      <div className='separator separator-dashed my-6'></div>
                    </>
                  )}

                  <TeamDetails {...ActivityProps} />

                  <div className='separator separator-dashed my-6'></div>

                  <EntryFee {...ActivityProps} />

                  <div className='separator separator-dashed my-6'></div>

                  <Location {...ActivityProps} />

                  <div className='separator separator-dashed my-6'></div>

                  <PrizeWrapper {...ActivityProps} />

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

export {ActivityCreate}
