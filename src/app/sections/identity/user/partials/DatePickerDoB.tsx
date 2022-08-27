import React, {FC} from 'react'
import {updateData} from '../../../../helpers/form/FormHelper'
import {User} from '../models/User'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {Dayjs} from 'dayjs'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'

type Props = {
  user: User | undefined
  setUser: any
}

const DatePickerDoB: FC<Props> = ({user, setUser}) => {
  const [value, setValue] = React.useState<Dayjs | null>(null)

  const onDateChange = (date: any) => {
    setValue(date)

    let dateOfBirth = new Date(date.$d).getTime() / 1000

    updateData(
      {
        meta: {...user?.meta, ...{date_of_birth: dateOfBirth}},
      },
      setUser,
      user
    )
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className={'w-100'}
          label='Date of Birth'
          value={value}
          onChange={onDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  )
}

export {DatePickerDoB}
