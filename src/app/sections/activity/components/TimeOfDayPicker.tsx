import {ActivityForm} from '../../../models/activity/ActivityForm'
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {StaticTimePicker} from '@mui/x-date-pickers/StaticTimePicker'
import TextField from '@mui/material/TextField'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, {Dayjs} from 'dayjs'
import {updateData} from '../../../helpers/form/FormHelper'
import {useActivity} from '../core/contexts/ActivityContext'
import utc from 'dayjs/plugin/utc'
import Timezone from 'dayjs/plugin/timezone'

type Props = {
  activityForm: ActivityForm
  setActivityForm: Dispatch<SetStateAction<ActivityForm>>
}

dayjs.extend(utc)
dayjs.extend(Timezone)

const TimeOfDayPicker: FC<Props> = ({activityForm, setActivityForm}) => {
  const {activity} = useActivity()
  const [value, setValue] = useState<Dayjs | null>(null)

  useEffect(() => {
    if (activity?.settings.time) {
      let time = dayjs(activity?.settings.time * 1000)
        .utc(false)
        .tz(activity?.settings?.timezone?.value, true)
      setValue(time)
    } else {
      let time = dayjs()
      setValue(time)
    }
  }, [activity?.settings.time, activity?.settings?.timezone?.value])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticTimePicker
        label={' '}
        ampm
        orientation='landscape'
        openTo='minutes'
        value={value}
        onChange={(newValue: any) => {
          setValue(newValue)

          let timeOfDay = dayjs(new Date(newValue.$d)).format('HH:mm:ss')

          updateData(
            {
              schedule: {
                ...activityForm?.schedule,
                ...{
                  settings: {
                    ...activityForm?.schedule.settings,
                    ...{time: timeOfDay},
                  },
                },
              },
            },
            setActivityForm,
            activityForm
          )
        }}
        componentsProps={{actionBar: {actions: []}}}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}

export {TimeOfDayPicker}
