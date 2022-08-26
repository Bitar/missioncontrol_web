import React, {Dispatch, FC, SetStateAction, useState} from 'react'
import moment, {Moment} from 'moment'
import {DateRangePicker, FocusedInputShape, SingleDatePicker} from 'react-dates'
import {Activity} from '../models/Activity'
import {updateData} from '../../../helpers/form/FormHelper'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
}

const RegistrationDatePicker: FC<Props> = ({activity, setActivity}) => {
  const [startDate, setStartDate] = useState<Moment | null>(null)
  const [endDate, setEndDate] = useState<Moment | null>(null)
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null)

  const handleFocusChange = (arg: FocusedInputShape | null) => {
    setFocusedInput(arg)
  }

  const onDateChange = (startDate: Moment | null, endDate: Moment | null) => {
    setStartDate(startDate)
    setEndDate(endDate)
    updateData(
      {
        registration_dates: {
          ...activity?.registration_dates,
          ...{start_date: startDate, end_date: endDate},
        },
      },
      setActivity,
      activity
    )
  }

  return (
    <>
      <div className='text-center'>
        <DateRangePicker
          block={true}
          startDate={startDate} // momentPropTypes.momentObj or null,
          startDateId={`registration_start_date`} // PropTypes.string.isRequired,
          endDate={endDate} // momentPropTypes.momentObj or null,
          endDateId='registration_end_date' // PropTypes.string.isRequired,
          onDatesChange={({startDate, endDate}) => onDateChange(startDate, endDate)} // PropTypes.func.isRequired,
          focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={handleFocusChange} // PropTypes.func.isRequired,
          keepOpenOnDateSelect={true}
          hideKeyboardShortcutsPanel={true}
        />
      </div>
    </>
  )
}

export {RegistrationDatePicker}
