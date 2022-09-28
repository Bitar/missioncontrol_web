import {ActivityForm} from '../models/Activity'
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {StaticTimePicker} from '@mui/x-date-pickers/StaticTimePicker'
import TextField from '@mui/material/TextField'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, {Dayjs} from 'dayjs'
import {updateData} from '../../../helpers/form/FormHelper'
import {useActivity} from '../ActivityContext'

type Props = {
  activityForm: ActivityForm
  setActivityForm: Dispatch<SetStateAction<ActivityForm>>
}

const TimeOfDayPicker: FC<Props> = ({activityForm, setActivityForm}) => {
  const {activity} = useActivity()
  const [value, setValue] = useState<Dayjs | null>(null)

  useEffect(() => {
    if (activity?.settings.time) {
      console.log(activity?.settings?.time)
      let time = dayjs(activity?.settings.time * 1000)
      setValue(time)
      // let endDate = dayjs(activity?.matchplay_dates?.end_date * 1000)
      // setValue([startDate, endDate])
    }
  }, [activity?.settings.time])

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
