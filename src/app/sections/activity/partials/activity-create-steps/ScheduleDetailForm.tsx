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
import {addOneDay, defaultTime} from '../../models/ActivityForm'

const {before} = DateRangePicker

export const ScheduleDetailForm = () => {
  const {activityForm, setActivityForm} = useActivityForm()

  const [registrationValue, setRegistrationValue] = useState<DateRange | null>([
    new Date(),
    new Date(),
  ])
  const [matchPlayValue, setMatchPlayValue] = useState<DateRange | null>([
    addOneDay(new Date()),
    addOneDay(new Date()),
  ])
  const [matchPlayDisabledDate, setMatchPlayDisabledDate] = useState<Date>(new Date())
  const [timeValue, setTimeValue] = useState<Date | null>(defaultTime(new Date()))
  const [timeZones, setTimeZones] = useState<TimeZone[]>()

  useEffect(() => {
    getTimeZones().then((response) => {
      setTimeZones(response.data)
    })
  }, [])

  const handleRegistrationChange = (e: any) => {
    if (e) {
      let startDate = Math.trunc(new Date(e[0]).getTime() / 1000)
      let endDate = Math.trunc(new Date(e[1]).getTime() / 1000)

      console.log(startDate)
      console.log(endDate)

      updateData(
        {
          schedule: {
            ...activityForm?.schedule,
            ...{
              registration_dates: {
                ...activityForm?.schedule.registration_dates,
                ...{start_date: startDate, end_date: endDate},
              },
              matchplay_dates: {
                start_date: 0,
                end_date: 0,
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

  const handleMatchPlayChange = (e: any) => {
    if (e) {
      let startDate = Math.trunc(new Date(e[0]).getTime() / 1000)
      let endDate = Math.trunc(new Date(e[1]).getTime() / 1000)

      updateData(
        {
          schedule: {
            ...activityForm?.schedule,
            ...{
              matchplay_dates: {
                ...activityForm?.schedule.matchplay_dates,
                ...{start_date: startDate, end_date: endDate},
              },
            },
          },
        },
        setActivityForm,
        activityForm
      )

      setMatchPlayValue(e)
    }
  }

  return (
    <div className='d-flex flex-column pt-5 w-100'>
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
            onChange={handleRegistrationChange}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='schedule.registration_dates' />
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
            onChange={handleMatchPlayChange}
            disabledDate={before && before(matchPlayDisabledDate)}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='schedule.matchplay_dates' />
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
            className='w-100'
            placeholder='Select Time'
            showMeridian={true}
            onChange={(value) => {
              if (value?.getTime()) {
                updateData(
                  {
                    schedule: {
                      ...activityForm?.schedule,
                      ...{
                        settings: {
                          ...activityForm?.schedule.settings,
                          ...{time: Math.trunc(value?.getTime() / 1000)},
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
            onChange={(e) => {
              updateData(
                {
                  schedule: {
                    ...activityForm?.schedule,
                    ...{
                      settings: {
                        ...activityForm?.schedule.settings,
                        ...{frequency: e?.value},
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
              onChange={(e) => {
                updateData(
                  {
                    schedule: {
                      ...activityForm?.schedule,
                      ...{
                        settings: {
                          ...activityForm?.schedule.settings,
                          ...{day: e?.value},
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
              <ErrorMessage name='schedule.settings.day' />
            </div>
          </div>
        </div>
      )}

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
    </div>
  )
}
