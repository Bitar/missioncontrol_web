import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {ActivityForm} from '../../../models/activity/ActivityForm'
import {updateData} from '../../../helpers/form/FormHelper'
import {DateRange, DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker'
import dayjs, {Dayjs} from 'dayjs'
import {LocalizationProvider} from '@mui/x-date-pickers-pro'
import {AdapterDayjs} from '@mui/x-date-pickers-pro/AdapterDayjs'
import TextField from '@mui/material/TextField'
import {Box} from '@mui/material'
import {useActivity} from '../core/contexts/ActivityContext'

type Props = {
  activityForm: ActivityForm
  setActivityForm: Dispatch<SetStateAction<ActivityForm>>
}

const MatchPlayDatePicker: FC<Props> = ({activityForm, setActivityForm}) => {
  const {activity} = useActivity()
  const [value, setValue] = useState<DateRange<Dayjs>>([null, null])
  const [minDate, setMinDate] = useState<Dayjs | null>(dayjs())

  const onDateChange = (newValue: any) => {
    setValue(newValue)

    let startDate = newValue[0].$d
    if (startDate) {
      startDate = new Date(startDate).getTime() / 1000
    }

    let endDate = newValue[1]?.$d
    if (endDate) {
      endDate = new Date(endDate).getTime() / 1000
    }

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
  }

  useEffect(() => {
    let registrationEndDate = activityForm?.schedule?.registration_dates?.end_date
    setValue([null, null])

    if (registrationEndDate) {
      let minMatchDate = dayjs(new Date(registrationEndDate * 1000)).add(1, 'd')
      let launchDate = dayjs(new Date(2022, 8, 12))

      if (minMatchDate.isBefore(launchDate)) {
        setMinDate(launchDate)
      } else {
        setMinDate(minMatchDate)
      }
    }
  }, [activityForm?.schedule?.registration_dates?.end_date])

  useEffect(() => {
    if (activity?.matchplay_dates.start_date && activity?.matchplay_dates?.end_date) {
      let startDate = dayjs(activity?.matchplay_dates?.start_date * 1000)
      let endDate = dayjs(activity?.matchplay_dates?.end_date * 1000)
      setValue([startDate, endDate])
    }
  }, [activity?.matchplay_dates])

  return (
    <>
      <div className='text-center'>
        <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{start: 'From', end: 'To'}}>
          <DateRangePicker
            disablePast
            value={value}
            onChange={onDateChange}
            minDate={minDate}
            renderInput={(startProps, endProps) => (
              <>
                <TextField
                  autoComplete='off'
                  required
                  {...startProps}
                  size={'small'}
                  name='settings.matchplay_dates.start_date'
                />
                <Box sx={{mx: 2}}> to </Box>
                <TextField
                  autoComplete='off'
                  required
                  {...endProps}
                  size={'small'}
                  name='settings.matchplay_dates.end_Date'
                />
              </>
            )}
          />
        </LocalizationProvider>
      </div>
    </>
  )
}

export {MatchPlayDatePicker}
