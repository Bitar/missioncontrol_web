import { updateData } from "./form/FormHelper";
import { ActivityForm } from "../models/activity/ActivityForm";
import React, { Dispatch, SetStateAction } from "react";
import { DateRange } from "rsuite/esm/DateRangePicker/types";
import { countDaysOfWeekJS, createDateFrom, getDaysBetweenDates } from "./ActivityHelper";

export const onInputMaskChange = ({ nextState }: any, activityForm: ActivityForm | undefined) => {
  // Get the input value without the formatting characters
  // const {value} = nextState;
  // const newValue = nextState.value.replace(/[^\d]/g, '');


  if (activityForm?.team?.max) {
    const inputValue = nextState.value.replace(/[^\d]/g, "");

    if (/^\d+$/.test(inputValue)) { // Check if input is digits only
      const numValue = parseInt(inputValue);

      if (!isNaN(numValue) && numValue >= 2 && (activityForm?.team?.max && numValue > activityForm?.team?.max)) {
        return {
          ...nextState,
          value: activityForm?.team?.max
        };
      } else {
        return {
          ...nextState,
          value: `2${inputValue.slice(1)}`
        };
      }
    }

    return {
      ...nextState,
      inputValue
    };
  }

};

export const resetPlayoffDates = (
  activityForm: ActivityForm | undefined,
  setActivityForm: Dispatch<SetStateAction<ActivityForm>>,
  setPlayoffsRange: Dispatch<SetStateAction<DateRange | null | undefined>>
) => {
  updateData(
    defaultPlayoff(activityForm),
    setActivityForm,
    activityForm
  );
  setPlayoffsRange(null);
};

export const defaultPlayoff = (activityForm: ActivityForm | undefined) => {
  return {
    playoff: {
      ...activityForm?.playoff,
      ...{
        playoff_dates: {
          ...activityForm?.playoff?.playoff_dates,
          ...{ start_date: 0, end_date: 0 }
        }
      },
      is_valid: false
    }
  };
};

export const handlePlayoffsChange = (
  e: any,
  activityForm: ActivityForm | undefined,
  setActivityForm: Dispatch<SetStateAction<ActivityForm>>,
  setShowErrors: Dispatch<SetStateAction<boolean>>,
  setPlayoffsRange: Dispatch<SetStateAction<DateRange | null | undefined>>
) => {
  if (e) {
    let startDate = new Date(e[0].setHours(0, 0, 0, 0));
    let endDate = new Date(e[1].setHours(23, 59, 59, 59));

    if (activityForm?.playoff?.teams) {
      let daysOfRange;
      let daysNeeded;

      if (activityForm?.schedule?.settings?.frequency === 2 && activityForm?.schedule?.settings?.day) {
        daysOfRange = countDaysOfWeekJS(startDate, endDate, activityForm?.schedule?.settings?.day);
        daysNeeded = Math.ceil(Math.log2(activityForm?.playoff?.teams));
      } else {
        daysOfRange = Math.ceil(getDaysBetweenDates(startDate, endDate));
        daysNeeded = Math.ceil(Math.log2(activityForm?.playoff?.teams));
      }

      let startDateTimestamp = Math.floor(startDate.getTime() / 1000);
      let endDateTimestamp = Math.floor(endDate.getTime() / 1000);

      if (daysNeeded <= daysOfRange) {
        updateData(
          {
            playoff: {
              ...activityForm?.playoff,
              ...{
                playoff_dates: {
                  ...activityForm?.playoff?.playoff_dates,
                  ...{ start_date: startDateTimestamp, end_date: endDateTimestamp }
                }
              },
              is_valid: true
            }
          },
          setActivityForm,
          activityForm
        );
        setShowErrors(false);
        setPlayoffsRange(e);
      } else {
        resetPlayoffDates(activityForm, setActivityForm, setPlayoffsRange);
        setShowErrors(true);
      }
    }
  }
};

export const updatePlayoffDates = (activityForm: ActivityForm | undefined, setPlayoffsRange: Dispatch<SetStateAction<DateRange | null | undefined>>) => {
  if (
    activityForm?.playoff?.playoff_dates?.start_date &&
    activityForm?.playoff?.playoff_dates?.end_date &&
    activityForm?.playoff?.playoff_dates?.start_date > 0 &&
    activityForm?.playoff?.playoff_dates?.end_date > 0
  ) {
    console.log("updating playoff dates");
    let playoffStartDate = createDateFrom(
      activityForm?.playoff?.playoff_dates?.start_date
    ).toDate();
    let playEndDate = createDateFrom(activityForm?.playoff?.playoff_dates?.end_date).toDate();
    setPlayoffsRange([playoffStartDate, playEndDate]);
  } else {
    setPlayoffsRange(null);
  }
};

export const handleFrequencyChange = (e: any, activityForm: ActivityForm | undefined, setActivityForm: Dispatch<SetStateAction<ActivityForm>>) => {
  if (activityForm?.playoff?.is_enabled) {
    updateData({
      schedule: {
        ...activityForm?.schedule,
        ...{
          settings: {
            ...activityForm?.schedule.settings,
            ...{ frequency: e?.value }
          }
        }
      },
      playoff: defaultPlayoff(activityForm).playoff
    }, setActivityForm, activityForm);
  } else {
    if (activityForm?.type_id === 2) {
      updateData(
        {
          schedule: {
            ...activityForm?.schedule,
            ...{
              settings: {
                ...activityForm?.schedule.settings,
                ...{ frequency: e?.value }
              },
              matchplay_dates: {
                ...activityForm?.schedule.matchplay_dates,
                ...{ start_date: 0, end_date: 0 }
              }
            }
          }
        },
        setActivityForm,
        activityForm
      );
    } else {
      updateData(
        {
          schedule: {
            ...activityForm?.schedule,
            ...{
              settings: {
                ...activityForm?.schedule.settings,
                ...{ frequency: e?.value }
              }
            }
          }
        },
        setActivityForm,
        activityForm
      );
    }
  }
};

export const handleDayChange = (e: any, activityForm: ActivityForm | undefined, setActivityForm: Dispatch<SetStateAction<ActivityForm>>) => {
  if (activityForm?.playoff?.is_enabled) {
    updateData({
      schedule: {
        ...activityForm?.schedule,
        ...{
          settings: {
            ...activityForm?.schedule.settings,
            ...{ day: e?.value }
          }
        }
      },
      playoff: defaultPlayoff(activityForm).playoff
    }, setActivityForm, activityForm);
  } else {
    updateData(
      {
        schedule: {
          ...activityForm?.schedule,
          ...{
            settings: {
              ...activityForm?.schedule.settings,
              ...{ day: e?.value }
            }
          }
        }
      },
      setActivityForm,
      activityForm
    );
  }
};

const updateActivityFormTeams = (teams: number, activityForm: ActivityForm | undefined, setActivityForm: Dispatch<SetStateAction<ActivityForm>>) => {
  updateData(
    {
      playoff: {
        ...activityForm?.playoff,
        ...{
          playoff_dates: {
            ...activityForm?.playoff?.playoff_dates,
            ...{ start_date: 0, end_date: 0 }
          },
          teams: teams
        }
      }
    },
    setActivityForm,
    activityForm
  );
};

export const handleTeamChange = (event: React.ChangeEvent<HTMLInputElement>, activityForm: ActivityForm | undefined, setActivityForm: Dispatch<SetStateAction<ActivityForm>>) => {
  const { value } = event.target;
  if (/^\d+$/.test(value)) {
    if (activityForm?.team?.max && parseInt(value) > activityForm?.team?.max) {
      updateActivityFormTeams(activityForm?.team?.max, activityForm, setActivityForm);
    } else {
      updateActivityFormTeams(parseInt(value), activityForm, setActivityForm);
    }
  } else {
    if (value === "") {
      updateActivityFormTeams(parseInt(value), activityForm, setActivityForm);
    }
  }
}