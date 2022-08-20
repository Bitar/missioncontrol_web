import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import moment, { Moment } from "moment";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import { Activity } from "../models/Activity";
import { updateData } from "../../../helpers/form/FormHelper";

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
}

const MatchPlayDatePicker: FC<Props> = ({ activity, setActivity }) => {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);
  const [minDate, setMinDate] = useState<Moment | undefined>(moment({'year': 2022, 'month': 9, 'day': 11}));

  // console.log(moment());
  // console.log(moment().add(1, 'days'));
  // console.log(moment({'year': 2022, 'month': 8, 'day': 11}))

  const handleFocusChange = (arg: FocusedInputShape | null) => {
    setFocusedInput(arg);
  };

  const onDateChange = (startDate: Moment | null, endDate: Moment | null) => {
    setStartDate(startDate);
    setEndDate(endDate);
    updateData(
      {
        matchplay_dates: { ...activity?.matchplay_dates, ...{ "start_date": startDate, "end_date": endDate } }
      },
      setActivity,
      activity
    );
  };

  useEffect(() => {
    let registrationEndDate = activity?.registration_dates?.end_date;

    if (registrationEndDate) {
      let momentObj = moment(registrationEndDate);
      setMinDate(momentObj);
    } else {
      // console.log("else");
    }

  }, [activity?.registration_dates?.end_date]);

  return (
    <>
      {minDate &&
        <div className="text-center">
          <DateRangePicker
            block={true}
            startDate={startDate} // momentPropTypes.momentObj or null,
            // minDate={moment({'year': 2022, 'month': 9, 'day': 11})}
            isDayBlocked={(day: Moment) => {
              let nextDate = minDate?.clone().add(1, 'days')
              return day < nextDate;
            }} // PropTypes.string.isRequired,
            startDateId={`matchplay_start_date`} // PropTypes.string.isRequired,
            endDate={endDate} // momentPropTypes.momentObj or null,
            endDateId="matchplay_end_date" // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) => onDateChange(startDate, endDate)} // PropTypes.func.isRequired,
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={handleFocusChange} // PropTypes.func.isRequired,
            keepOpenOnDateSelect={true}
            hideKeyboardShortcutsPanel={true}
          />
        </div>
      }
    </>
  );
};

export { MatchPlayDatePicker };
