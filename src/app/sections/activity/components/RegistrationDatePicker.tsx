import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {ActivityForm} from '../models/Activity'
import dayjs, {Dayjs} from 'dayjs'
import {LocalizationProvider} from '@mui/x-date-pickers-pro'
import {AdapterDayjs} from '@mui/x-date-pickers-pro/AdapterDayjs'
import {DateRange, DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker'
import {Box} from '@mui/material'
import TextField from '@mui/material/TextField'
import {updateData} from '../../../helpers/form/FormHelper'
import {useActivity} from '../ActivityContext'

type Props = {
  activityForm: ActivityForm
  setActivityForm: Dispatch<SetStateAction<ActivityForm>>
}

const RegistrationDatePicker: FC<Props> = ({activityForm, setActivityForm}) => {
  const {activity} = useActivity()
  const [value, setValue] = useState<DateRange<Dayjs>>([null, null])

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
  }

  useEffect(() => {
    if (activity?.registration_dates.start_date && activity?.registration_dates?.end_date) {
      let startDate = dayjs(activity?.registration_dates?.start_date * 1000)
      let endDate = dayjs(activity?.registration_dates?.end_date * 1000)
      setValue([startDate, endDate])
    }
  }, [activity?.registration_dates])

  return (
    <>
      {/*<div className='text-center'>*/}
      <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{start: 'From', end: 'To'}}>
        <DateRangePicker
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

export { RegistrationDatePicker };
