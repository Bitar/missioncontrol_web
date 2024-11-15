import {useActivityForm} from '../../core/contexts/ActivityFormContext'
import {DatePicker, DateRangePicker} from 'rsuite'
import {updateData} from '../../../../helpers/form/FormHelper'
import Select from 'react-select'
import {ACTIVITY_DAY_OF_WEEK, ACTIVITY_MATCH_FREQUENCY} from '../../core/_consts'
import {ErrorMessage} from 'formik'
import React, {useEffect, useState} from 'react'
import {DateRange} from 'rsuite/esm/DateRangePicker/types'
import {TimeZone} from '../../../../models/misc/TimeZone'
import {getTimeZones} from '../../../misc/core/_requests'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import {
  getLeagueUpdateObj,
  getTournamentUpdateObj,
  isValidTournament,
  shiftToUTCEndDate,
  shiftToUTCStartDate,
} from '../../../../helpers/ActivityHelper'
import moment from 'moment/moment'
import {PlayoffDetail} from './PlayoffDetail'
import {handleDayChange, handleFrequencyChange} from '../../../../helpers/PlayoffHelper'
import {TournamentTeamCountText} from '../TournamentTeamCountText'
import toast from 'react-hot-toast'

dayjs.extend(utc)
dayjs.extend(timezone)

const {before} = DateRangePicker

export const ScheduleDetailForm = () => {
  const {activityForm, setActivityForm} = useActivityForm()
  const [registrationValue, setRegistrationValue] = useState<DateRange | null>()
  const [matchPlayValue, setMatchPlayValue] = useState<DateRange | null>()
  const [matchPlayDisabledDate, setMatchPlayDisabledDate] = useState<Date>(new Date())
  const [showErrors, setShowErrors] = useState<boolean>(false)
  const [timeValue, setTimeValue] = useState<Date | null>()
  const [timeZones, setTimeZones] = useState<TimeZone[]>()

  useEffect(() => {
    getTimeZones().then((response) => {
      setTimeZones(response.data)
    })
  }, [])

  useEffect(() => {
    updateData(
      {
        schedule: {
          ...activityForm?.schedule,
          ...{
            registration_dates: {
              start_date: 0,
              end_date: 0,
            },
            matchplay_dates: {
              start_date: 0,
              end_date: 0,
            },
          },
        },
        playoff: {
          is_enabled: false,
        },
      },
      setActivityForm,
      activityForm
    )
    setRegistrationValue(null)
    setMatchPlayValue(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityForm?.type_id])

  useEffect(() => {
    updateData(
      {
        schedule: {
          ...activityForm?.schedule,
          ...{
            matchplay_dates: {
              ...activityForm?.schedule.matchplay_dates,
              ...{start_date: 0, end_date: 0},
            },
          },
        },
      },
      setActivityForm,
      activityForm
    )
    setMatchPlayValue(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityForm?.team?.max])

  const onFrequencyChange = (e: any) => {
    handleFrequencyChange(e, activityForm, setActivityForm)
    if (activityForm?.type_id === 2) {
      setMatchPlayValue(null)
    }
  }

  const onDayChange = (e: any) => {
    handleDayChange(e, activityForm, setActivityForm, setRegistrationValue, setMatchPlayValue)
    if (activityForm?.type_id === 2) {
      setMatchPlayValue(null)
    }
  }

  return (
    <div className='d-flex flex-column pt-5 w-100'>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label fw-bold fs-6'>Match Frequency</label>
        <div className='col-lg-8 fv-row'>
          <Select
            placeholder={'Choose a Match frequency'}
            value={
              ACTIVITY_MATCH_FREQUENCY.filter(
                (frequency) => frequency.value === activityForm?.schedule?.settings?.frequency
              )[0]
            }
            options={ACTIVITY_MATCH_FREQUENCY}
            onChange={onFrequencyChange}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='schedule.settings.frequency' />
          </div>
        </div>
      </div>

      {activityForm?.schedule?.settings?.frequency === 2 && (
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label fw-bold fs-6'>Day Of Week</label>
          <div className='col-lg-8 fv-row'>
            <Select
              placeholder={'Choose Day of Week'}
              value={
                ACTIVITY_DAY_OF_WEEK.filter(
                  (dayOfWeek) =>
                    dayOfWeek.value ===
                    (Number.isInteger(activityForm?.schedule?.settings?.day)
                      ? activityForm?.schedule?.settings?.day
                      : parseInt(activityForm?.schedule?.settings?.day + ''))
                )[0]
              }
              options={ACTIVITY_DAY_OF_WEEK}
              onChange={onDayChange}
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='schedule.settings.day' />
            </div>
          </div>
        </div>
      )}

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label fw-bold fs-6'>Registration Dates</label>
        <div className='col-lg-8 fv-row'>
          <DateRangePicker
            cleanable={false}
            value={registrationValue}
            id='registration_dates'
            appearance='default'
            placeholder='Registration Dates'
            className='w-100'
            character={' - '}
            ranges={[]}
            onChange={(e) => {
              const today = new Date()

              if (e) {
                if (new Date(e[1]) < today) {
                  toast.error('Registration end date needs to be in the future.')
                  setRegistrationValue(null)
                } else {
                  let startDate = shiftToUTCStartDate(new Date(e[0]).getTime() / 1000)
                  let endDate = shiftToUTCEndDate(new Date(e[1]).getTime() / 1000)

                  updateData(
                    {
                      schedule: {
                        ...activityForm?.schedule,
                        ...{
                          registration_dates: {
                            ...activityForm?.schedule.registration_dates,
                            ...{
                              start_date: Math.floor(startDate.getTime() / 1000),
                              end_date: Math.floor(endDate.getTime() / 1000),
                            },
                          },
                          matchplay_dates: {
                            ...activityForm?.schedule.matchplay_dates,
                            ...{start_date: 0, end_date: 0},
                          },
                        },
                      },
                    },
                    setActivityForm,
                    activityForm
                  )

                  let endDateDate = new Date(e[1])
                  let disabledEndDate = new Date(endDateDate)
                  disabledEndDate.setDate(endDateDate.getDate() + 1)

                  setRegistrationValue(e)
                  setMatchPlayValue(null)
                  setMatchPlayDisabledDate(disabledEndDate)
                }
              }
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='schedule.registration_dates.start_date' />
          </div>
          <div className='text-danger mt-2'>
            <ErrorMessage name='schedule.registration_dates.end_date' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label fw-bold fs-6'>MatchPlay Dates</label>
        <div className='col-lg-8 fv-row'>
          <DateRangePicker
            cleanable={false}
            value={matchPlayValue}
            id='match_play_dates'
            appearance='default'
            placeholder='MatchPlay Dates'
            className='w-100'
            character={' - '}
            ranges={[]}
            onChange={(e) => {
              isValidTournament(e, activityForm, setShowErrors)

              if (e) {
                let startDate = shiftToUTCStartDate(new Date(e[0]).getTime() / 1000)
                let endDate = shiftToUTCEndDate(new Date(e[1]).getTime() / 1000)

                let result: {updateObject: any; errors: boolean}

                if (activityForm?.type_id === 1) {
                  result = getLeagueUpdateObj(startDate, endDate, activityForm)
                } else {
                  result = getTournamentUpdateObj(startDate, endDate, activityForm)
                }

                if (!result.errors) {
                  setMatchPlayValue(e)
                } else {
                  setMatchPlayValue(null)
                }

                setShowErrors(result.errors)
                updateData(result.updateObject, setActivityForm, activityForm)
              }
            }}
            shouldDisableDate={before && before(matchPlayDisabledDate)}
          />
          <div className='text-danger mt-2'>{showErrors && 'Invalid dates'}</div>
          {activityForm?.type_id === 2 && (
            <div className='form-text'>
              <TournamentTeamCountText teamCount={activityForm?.team?.max!} />
            </div>
          )}
          <div className='text-danger mt-2'>
            <ErrorMessage name='schedule.matchplay_dates.start_date' />
          </div>
          <div className='text-danger mt-2'>
            <ErrorMessage name='schedule.matchplay_dates.end_date' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label fw-bold fs-6'>Time</label>
        <div className='col-lg-8 fv-row'>
          <DatePicker
            cleanable={false}
            value={timeValue}
            format='hh:mm aa'
            ranges={[]}
            hideMinutes={(minute) => minute % 5 !== 0}
            className='w-100'
            placeholder='Select Time'
            showMeridian={true}
            placement={'topStart'}
            onChange={(value) => {
              if (value?.getTime()) {
                let time = moment(value.getTime()).utc(true).unix()

                updateData(
                  {
                    schedule: {
                      ...activityForm?.schedule,
                      ...{
                        settings: {
                          ...activityForm?.schedule.settings,
                          ...{time: time},
                        },
                      },
                    },
                  },
                  setActivityForm,
                  activityForm
                )
                setTimeValue(value)
              }
            }}
          />

          <div className='text-danger mt-2'>
            <ErrorMessage name='schedule.settings.time' />
          </div>
        </div>
      </div>

      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label fw-bold fs-6'>Timezones</label>
        <div className='col-lg-8 fv-row'>
          {/*{activity?.game && (*/}
          <Select
            name='timezone_id'
            placeholder={'Choose a Timezone'}
            value={
              timeZones?.filter(
                (timezone) => timezone.id === activityForm?.schedule?.settings?.timezone
              )[0]
            }
            options={timeZones}
            getOptionLabel={(timeZone) => timeZone?.name}
            getOptionValue={(timeZone) => timeZone?.id?.toString() || ''}
            onChange={(e) => {
              updateData(
                {
                  schedule: {
                    ...activityForm?.schedule,
                    ...{
                      settings: {
                        ...activityForm?.schedule.settings,
                        ...{timezone: e?.id},
                      },
                    },
                  },
                },
                setActivityForm,
                activityForm
              )
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='schedule.settings.timezone' />
          </div>
        </div>
      </div>

      {activityForm?.type_id === 1 && (
        <>
          <div className='separator mt-5 opacity-75'></div>
          <PlayoffDetail />
        </>
      )}
    </div>
  )
}
