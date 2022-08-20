import React, { Dispatch, FC, SetStateAction, useState } from "react";
import moment, { Moment } from "moment";
import { DateRangePicker, FocusedInputShape, SingleDatePicker } from "react-dates";
import { Activity } from "../models/Activity";
import { updateData } from "../../../helpers/form/FormHelper";

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
}

const RegistrationDatePicker: FC<Props> = ({ activity, setActivity }) => {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);

  const handleFocusChange = (arg: FocusedInputShape | null) => {
    setFocusedInput(arg);
  };

  const onDateChange = (startDate: Moment | null, endDate: Moment | null) => {
    setStartDate(startDate);
    setEndDate(endDate);
    // updateData(
    //   {
    //     registration_dates: {...activity?.registration_dates, ...{date_of_birth: date}},
    //   },
    //   setActivity,
    //   activity
    // )
  };

  const isOutsideRange = (day: any) =>
    day.isAfter(moment()) || day.isBefore(moment().subtract(70, "years"));

  return (
    <>
      <div className="text-center">
        <DateRangePicker
          block={true}
          startDate={startDate} // momentPropTypes.momentObj or null,
          startDateId={`registration_start_date`} // PropTypes.string.isRequired,
          endDate={endDate} // momentPropTypes.momentObj or null,
          endDateId="registration_end_date" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) => onDateChange(startDate, endDate)} // PropTypes.func.isRequired,
          focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={handleFocusChange} // PropTypes.func.isRequired,
          keepOpenOnDateSelect={true}
          hideKeyboardShortcutsPanel={true}
          openDirection={'up'}
        />
      </div>
      {/*<SingleDatePicker*/}
      {/*  // date={date ?? (user?.meta?.date_of_birth ? moment(user?.meta?.date_of_birth * 1000) : date)} // momentPropTypes.momentObj or null*/}
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
  );
};

export { RegistrationDatePicker };
