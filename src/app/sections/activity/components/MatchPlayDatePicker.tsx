import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import { Activity, ActivityForm } from "../models/Activity";
import {updateData} from '../../../helpers/form/FormHelper'
import {DateRange, DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker'
import dayjs, {Dayjs} from 'dayjs'
import {LocalizationProvider} from '@mui/x-date-pickers-pro'
import {AdapterDayjs} from '@mui/x-date-pickers-pro/AdapterDayjs'
import TextField from '@mui/material/TextField'
import {Box} from '@mui/material'

type Props = {
  activity: ActivityForm,
  setActivity: Dispatch<SetStateAction<ActivityForm >>
}

const MatchPlayDatePicker: FC<Props> = ({activity, setActivity}) => {
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
          ...activity?.schedule,
          ...{match_play_dates: {
              ...activity?.schedule.match_play_dates,
              ...{start_date: startDate, end_date: endDate},
            }}
        },
      },
      setActivity,
      activity
    )
  }

  useEffect(() => {
    let registrationEndDate = activity?.schedule?.registration_dates?.end_date

    if (registrationEndDate) {
      let minMatchDate = dayjs(new Date(registrationEndDate * 1000)).add(1, 'd')
      let launchDate = dayjs(new Date(2022, 8, 12))

      if (minMatchDate.isBefore(launchDate)) {
        setMinDate(launchDate)
      } else {
        setMinDate(minMatchDate)
      }
    }
  }, [activity?.schedule?.registration_dates?.end_date])

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
              <React.Fragment>
                <TextField required {...startProps} size={'small'} name='settings.registration_dates.start_date' />
                <Box sx={{mx: 2}}> to </Box>
                <TextField required {...endProps} size={'small'} name='settings.registration_dates.end_Date' />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
      </div>
    </>
  )
}

export { MatchPlayDatePicker };
