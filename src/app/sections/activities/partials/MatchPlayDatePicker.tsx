import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {Activity} from '../models/Activity'
import {updateData} from '../../../helpers/form/FormHelper'
import {DateRange, DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker'
import dayjs, {Dayjs} from 'dayjs'
import {LocalizationProvider} from '@mui/x-date-pickers-pro'
import {AdapterDayjs} from '@mui/x-date-pickers-pro/AdapterDayjs'
import TextField from '@mui/material/TextField'
import {Box} from '@mui/material'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
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
        matchplay_dates: {
          ...activity?.matchplay_dates,
          ...{start_date: startDate, end_date: endDate},
        },
      },
      setActivity,
      activity
    )
  }

  useEffect(() => {
    let registrationEndDate = activity?.registration_dates?.end_date

    if (registrationEndDate) {
      setMinDate(dayjs(new Date(registrationEndDate * 1000)).add(1, 'd'))
    }
  }, [activity?.registration_dates?.end_date])

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
                <TextField {...startProps} />
                <Box sx={{mx: 2}}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
      </div>
    </>
  )
}

export {MatchPlayDatePicker}
