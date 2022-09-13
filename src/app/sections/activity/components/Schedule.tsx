import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {Activity} from '../models/Activity'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {StaticTimePicker} from '@mui/x-date-pickers/StaticTimePicker'
import TextField from '@mui/material/TextField'
import dayjs, {Dayjs} from 'dayjs'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import {InputLabel, MenuItem, Select} from '@mui/material'
import {getTimeZones} from '../../misc/core/_requests'
import {TimeZone} from '../../../models/misc/TimeZone'
import {updateData} from '../../../helpers/form/FormHelper'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
}

const Schedule: FC<Props> = ({activity, setActivity}) => {
  const [frequency, setFrequency] = useState('')
  const [day, setDay] = useState('')
  const [value, setValue] = useState<Dayjs | null>(dayjs())
  const [selectedTimeZone, setSelectedTimeZone] = useState('')
  const [timeZones, setTimeZones] = useState<TimeZone[]>()

  useEffect(() => {
    getTimeZones().then((response) => {
      setTimeZones(response.data)
    })
  }, [])

  return (
    <>
      <div className='row mb-6'>
        <div className='col-12'>
          <h4 className='text-dark'>Schedule</h4>
        </div>
      </div>

      <div className='row mb-6'>
        <div className='col-lg-4'>
          <span className='required fw-bold fs-6'>Registration Dates</span>
        </div>
        <div className='col-lg-8 fv-row'>
          {/*<RegistrationDatePicker activity={activity} setActivity={setActivity} />*/}
        </div>
      </div>
      <div className='row mb-6'>
        <div className='col-lg-4'>
          <span className='required fw-bold fs-6'>Match Play Dates</span>
        </div>
        <div className='col-lg-8 fv-row'>
          {/*<MatchPlayDatePicker activity={activity} setActivity={setActivity} />*/}
        </div>
      </div>
      <div className='row mb-6'>
        <div className='col-lg-4'>
          <span className='required fw-bold fs-6'>Match Frequency</span>
        </div>
        <div className='col-lg-8'>
          <Box sx={{minWidth: 120}}>
            <FormControl fullWidth size='small'>
              <InputLabel id='timezone-select-label'>Match Frequency</InputLabel>
              <Select
                labelId='timezone-select-label'
                id='timezone-select'
                value={frequency}
                label='Match Frequency'
                onChange={(e) => {
                  setFrequency(e.target.value as string)

                  updateData(
                    {
                      settings: {
                        ...activity?.settings,
                        ...{
                          frequency: e.target.value,
                        },
                      },
                    },
                    setActivity,
                    activity
                  )
                }}
              >
                <MenuItem value={1}>Daily</MenuItem>
                <MenuItem value={2}>Weekly</MenuItem>
                {/*<MenuItem value="3">Custom</MenuItem>*/}
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      {activity?.settings?.frequency === 2 && (
        <div className='row mb-6'>
          <div className='col-lg-4'>
            <span className='required fw-bold fs-6'>Day Of Week</span>
          </div>
          <div className='col-lg-8'>
            <Box sx={{minWidth: 120}}>
              <FormControl fullWidth size='small'>
                <InputLabel id='timezone-select-label'>Day Of Week</InputLabel>
                <Select
                  labelId='timezone-select-label'
                  id='timezone-select'
                  value={day}
                  label='Match Frequency'
                  onChange={(e) => {
                    setDay(e.target.value as string)

                    updateData(
                      {
                        settings: {
                          ...activity?.settings,
                          ...{
                            day: e.target.value,
                          },
                        },
                      },
                      setActivity,
                      activity
                    )
                  }}
                >
                  <MenuItem value={1}>Monday</MenuItem>
                  <MenuItem value={2}>Tuesday</MenuItem>
                  <MenuItem value={3}>Wednesday</MenuItem>
                  <MenuItem value={4}>Thursday</MenuItem>
                  <MenuItem value={5}>Friday</MenuItem>
                  <MenuItem value={6}>Saturday</MenuItem>
                  <MenuItem value={7}>Sunday</MenuItem>
                </Select>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticTimePicker
              label={' '}
              ampm
              orientation='landscape'
              openTo='minutes'
              value={value}
              onChange={(newValue: any) => {
                setValue(newValue)

                let timeOfDay = (new Date(newValue.$d).getTime() / 1000).toString()

                updateData(
                  {
                    settings: {
                      ...activity?.settings,
                      ...{
                        time_of_day: timeOfDay,
                      },
                    },
                  },
                  setActivity,
                  activity
                )
              }}
              componentsProps={{actionBar: {actions: []}}}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className='row mb-6'>
        <div className='col-lg-4'>
          <span className='required fw-bold fs-6'>Time Zone</span>
        </div>
        <div className='col-lg-8'>
          <Box sx={{minWidth: 120}}>
            <FormControl fullWidth size='small'>
              <InputLabel id='timezone-select-label'>Timezones</InputLabel>
              <Select
                labelId='timezone-select-label'
                id='timezone-select'
                value={selectedTimeZone}
                label='Timezones'
                onChange={(e) => {
                  setSelectedTimeZone(e.target.value as string)

                  updateData(
                    {
                      settings: {
                        ...activity?.settings,
                        ...{
                          timezone: e.target.value,
                        },
                      },
                    },
                    setActivity,
                    activity
                  )
                }}
              >
                {timeZones &&
                  timeZones.length > 0 &&
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
    </>
  )
}
export {Schedule}
