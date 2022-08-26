import React, {FC, useState} from 'react'
import {updateData} from '../../../../helpers/form/FormHelper'
import moment, {Moment} from 'moment'
// import {SingleDatePicker} from 'react-dates'
import {User} from '../models/User'
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';


type Props = {
  user: User | undefined
  setUser: any
}

const DatePickerDoB: FC<Props> = ({user, setUser}) => {
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const [date, setDate] = useState<Moment | null>(null)
  const [focusedInput, setFocusedInput] = useState<boolean>(false)

  const handleFocusChange = (arg: {focused: boolean}) => {
    setFocusedInput(arg.focused)
  }

  const onDateChange = (date: Moment | null) => {
    setDate(date)
    updateData(
      {
        meta: {...user?.meta, ...{date_of_birth: date}},
      },
      setUser,
      user
    )
  }

  const returnYears = () => {
    let years = []
    for (let i = moment().year() - 70; i <= moment().year(); i++) {
      years.push(
        <option value={i} key={i}>
          {i}
        </option>
      )
    }
    return years
  }

  const isOutsideRange = (day: any) =>
    day.isAfter(moment()) || day.isBefore(moment().subtract(70, 'years'))

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            className={'w-100'}
            label="Date of Birth"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      {/*<SingleDatePicker*/}
      {/*  date={date ?? (user?.meta?.date_of_birth ? moment(user?.meta?.date_of_birth * 1000) : date)} // momentPropTypes.momentObj or null*/}
      {/*  placeholder={'Date of Birth'}*/}
      {/*  onDateChange={onDateChange} // PropTypes.func.isRequired*/}
      {/*  focused={focusedInput} // PropTypes.bool*/}
      {/*  onFocusChange={handleFocusChange} // PropTypes.func.isRequired*/}
      {/*  id='your_unique_id' // PropTypes.string.isRequired,*/}
      {/*  numberOfMonths={1}*/}
      {/*  openDirection={'up'}*/}
      {/*  hideKeyboardShortcutsPanel={true}*/}
      {/*  isOutsideRange={isOutsideRange}*/}
      {/*  block*/}
      {/*  small={true}*/}
      {/*  renderMonthElement={({month, onMonthSelect, onYearSelect}) => (*/}
      {/*    <div style={{display: 'flex', justifyContent: 'center', marginTop: '-4px'}}>*/}
      {/*      <div>*/}
      {/*        <select*/}
      {/*          className={'form-select form-select-sm py-2 form-select-transparent'}*/}
      {/*          value={month.month()}*/}
      {/*          onChange={(e) => onMonthSelect(month, e.target.value)}*/}
      {/*        >*/}
      {/*          {moment.months().map((label, value) => (*/}
      {/*            <option value={value} key={value}>*/}
      {/*              {label}*/}
      {/*            </option>*/}
      {/*          ))}*/}
      {/*        </select>*/}
      {/*      </div>*/}
      {/*      <div>*/}
      {/*        <select*/}
      {/*          className={'form-select form-select-sm py-2 form-select-transparent'}*/}
      {/*          value={month.year()}*/}
      {/*          onChange={(e) => onYearSelect(month, e.target.value)}*/}
      {/*        >*/}
      {/*          {returnYears()}*/}
      {/*        </select>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*/>*/}
    </>
  )
}

export {DatePickerDoB}
