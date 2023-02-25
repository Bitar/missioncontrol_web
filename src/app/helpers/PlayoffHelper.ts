import dayjs from "dayjs";
import { updateData } from "./form/FormHelper";
import { ActivityForm } from "../models/activity/ActivityForm";
import { Dispatch, SetStateAction } from "react";
import { DateRange } from "rsuite/esm/DateRangePicker/types";
import { countDaysOfWeek, createDateFrom } from "./ActivityHelper";

export const onInputMaskChange = ({ nextState }: any, activityForm: ActivityForm | undefined) => {
  let { value } = nextState;

  if (activityForm?.team?.max && parseInt(value) > activityForm?.team?.max) {
    value = activityForm?.team?.max;
  }

  return {
    ...nextState,
    value
  };
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
    let startDate = dayjs(new Date(e[0]).setHours(0, 0)).utc(true).tz("utc");
    let endDate = dayjs(new Date(e[1]).setHours(23, 59)).utc(true).tz("utc");

    if (activityForm?.playoff?.teams) {
      let daysOfRange;
      let daysNeeded;
      if (activityForm?.schedule?.settings?.frequency === 2 && activityForm?.schedule?.settings?.day) {
        daysOfRange = countDaysOfWeek(startDate, endDate, activityForm?.schedule?.settings?.day);
        daysNeeded = Math.ceil(Math.log2(activityForm?.playoff?.teams));
      } else {
        daysOfRange = Math.ceil(endDate.diff(startDate, "days", true));
        daysNeeded = Math.ceil(Math.log2(activityForm?.playoff?.teams));
      }

      if (daysNeeded <= daysOfRange) {
        updateData(
          {
            playoff: {
              ...activityForm?.playoff,
              ...{
                playoff_dates: {
                  ...activityForm?.playoff?.playoff_dates,
                  ...{ start_date: startDate.unix(), end_date: endDate.unix() }
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
    if(activityForm?.type_id === 2) {
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
