import {useActivity} from '../../core/contexts/ActivityContext'
import React, {useEffect, useState} from 'react'
import {
  ActivityForm,
  activityScheduleSchema,
} from '../../models/Activity'
import {initialActivityFormByActivity} from '../../models/ActivityForm'
import {TimeZone} from '../../../../models/misc/TimeZone'
import {getTimeZones} from '../../../misc/core/_requests'
import {KTCard, KTCardBody} from "../../../../helpers/components"
import {Form, Formik} from 'formik'
import {MatchPlayDatePicker, RegistrationDatePicker} from '../../components'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import {FormHelperText, InputLabel, MenuItem, Select} from '@mui/material'
import {updateData} from '../../../../helpers/form/FormHelper'
import {TimeOfDayPicker} from '../../components/TimeOfDayPicker'
import {FormAction} from '../../../../helpers/form/FormAction'

const ActivityScheduleForm = () => {
  const {activity} = useActivity()
  const [activityForm, setActivityForm] = useState<ActivityForm>(
    initialActivityFormByActivity(activity)
  )

  const [timeZones, setTimeZones] = useState<TimeZone[]>()

  const handleSubmit = () => {
    console.log('submitting')
    console.log(activityForm)
  }

  const handleOnChange = (e: any) => {
    let targetName = e.target.name
    let targetValue = e.target.value

    console.log(targetName)
    console.log(targetValue)
  }

  useEffect(() => {
    getTimeZones().then((response) => {
      setTimeZones(response.data)
    })
  }, [])

  return (
    <>
      <KTCard>
        <div className='card-header bg-mc-secondary'>
          <div className='card-title'>
            <h3 className='card-label text-white fw-bold'>Update Schedule</h3>
          </div>
        </div>
        <Formik
          initialValues={initialActivityFormByActivity(activity)}
          onSubmit={handleSubmit}
          validationSchema={activityScheduleSchema}
          enableReinitialize
        >
          {({isSubmitting, touched, errors, values}) => (
            <Form onChange={handleOnChange} className='form' encType='multipart/form-data'>
              <KTCardBody className='py-10'>
                <div className='row mb-6'>
                  <div className='col-lg-4'>
                    <span className='required fw-bold fs-6'>Registration Dates</span>
                  </div>
                  <div className='col-lg-8 fv-row'>
                    <RegistrationDatePicker
                      activityForm={activityForm}
                      setActivityForm={setActivityForm}
                    />
                  </div>
                </div>

                <div className='row mb-6'>
                  <div className='col-lg-4'>
                    <span className='required fw-bold fs-6'>Match Play Dates</span>
                  </div>
                  <div className='col-lg-8 fv-row'>
                    <MatchPlayDatePicker
                      activityForm={activityForm}
                      setActivityForm={setActivityForm}
                    />
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
                          touched?.schedule?.settings?.frequency &&
                          Boolean(errors?.schedule?.settings?.frequency)
                        }
                      >
                        <InputLabel id='frequency-select-label'>Match Frequency</InputLabel>
                        <Select
                          labelId='frequency-select-label'
                          id='frequency-select'
                          name='schedule.settings.frequency'
                          value={values.schedule?.settings.frequency}
                          label='Match Frequency'
                        >
                          <MenuItem value={'1'}>Daily</MenuItem>
                          <MenuItem value={'2'}>Weekly</MenuItem>
                        </Select>
                        {touched?.schedule?.settings?.frequency &&
                          Boolean(errors?.schedule?.settings?.frequency) && (
                            <FormHelperText>
                              {touched?.schedule?.settings?.frequency &&
                                errors?.schedule?.settings?.frequency}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Box>
                  </div>
                </div>

                {activityForm?.schedule?.settings.frequency === '2' && (
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
                            activityForm?.schedule?.settings.frequency === '2' &&
                            touched?.schedule?.settings?.day &&
                            Boolean(errors?.schedule?.settings?.day)
                          }
                        >
                          <InputLabel id='day-of-week-select-label'>Day Of Week</InputLabel>
                          <Select
                            labelId='day-of-week-select-label'
                            id='day-of-week-select'
                            value={values.schedule?.settings.day}
                            label='Day of Week'
                            required
                            name='schedule.settings.day'
                            onChange={(e) => {
                              updateData(
                                {
                                  schedule: {
                                    ...activityForm,
                                    ...{
                                      settings: {
                                        ...activityForm?.schedule?.settings,
                                        ...{day: e.target.value},
                                      },
                                    },
                                  },
                                },
                                setActivityForm,
                                activityForm
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
                          {touched?.schedule?.settings?.day &&
                            Boolean(errors?.schedule?.settings?.day) && (
                              <FormHelperText>
                                {touched?.schedule?.settings?.day &&
                                  errors?.schedule?.settings?.day}
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
                    <TimeOfDayPicker
                      activityForm={activityForm}
                      setActivityForm={setActivityForm}
                    />
                  </div>
                </div>

                {timeZones && (
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
                            value={values.schedule?.settings.timezone}
                            label='Timezones'
                            onChange={(e) => {
                              updateData(
                                {
                                  schedule: {
                                    ...activityForm,
                                    ...{
                                      settings: {
                                        ...activityForm?.schedule?.settings,
                                        ...{timezone: e.target.value},
                                      },
                                    },
                                  },
                                },
                                setActivityForm,
                                activityForm
                              )
                            }}
                          >
                            {timeZones.length > 0 &&
                              timeZones.map((row: any) => (
                                <MenuItem key={row.id} value={row.id}>
                                  {row.name}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                  </div>
                )}
              </KTCardBody>
              <FormAction text={'Update Schedule'} isSubmitting={isSubmitting} />
            </Form>
          )}
        </Formik>
      </KTCard>
    </>
  )
}

export {ActivityScheduleForm}
