import React, {Dispatch, FC, SetStateAction, useState} from 'react'
import {ActivityForm} from '../models/Activity'
import dayjs, {Dayjs} from 'dayjs'
import {LocalizationProvider} from '@mui/x-date-pickers-pro'
import {AdapterDayjs} from '@mui/x-date-pickers-pro/AdapterDayjs'
import {DateRange, DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker'
import {Box} from '@mui/material'
import TextField from '@mui/material/TextField'
import {updateData} from '../../../helpers/form/FormHelper'

type Props = {
  activity: ActivityForm
  setActivity: Dispatch<SetStateAction<ActivityForm>>
}

const RegistrationDatePicker: FC<Props> = ({activity, setActivity}) => {
  const [value, setValue] = useState<DateRange<Dayjs>>([null, null])

  console.log(dayjs(new Date(activity?.schedule?.registration_dates?.start_date)))

  const onDateChange = (newValue: any) => {
    console.log(newValue)
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
          ...{
            registration_dates: {
              ...activity?.schedule.registration_dates,
              ...{start_date: startDate, end_date: endDate},
            },
            matchplay_dates: {
              start_date: 0,
              end_date: 0,
            },
          },
        },
      },
      setActivity,
      activity
    )
  }

  return (
    <>
      {/*<div className='text-center'>*/}
      <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{start: 'From', end: 'To'}}>
        <DateRangePicker
          disablePast
          value={value}
          onChange={(e) => {
            onDateChange(e)
          }}
          renderInput={(startProps, endProps) => (
            <>
              <TextField
                required
                {...startProps}
                size={'small'}
                name='schedule.registration_dates.start_date'
              />
              <Box sx={{mx: 2}}> to </Box>
              <TextField
                required
                {...endProps}
                size={'small'}
                name='schedule.registration_dates.end_date'
              />
            </>
          )}
        />
      </LocalizationProvider>
      {/*</div>*/}
    </>
  )
}

export {RegistrationDatePicker}
