import {updateData} from './form/FormHelper'
import {ActivityForm} from '../models/activity/ActivityForm'
import React, {Dispatch, SetStateAction} from 'react'
import {DateRange} from 'rsuite/esm/DateRangePicker/types'
import {
  countDaysOfWeekJS,
  getDaysBetweenDates,
  shiftToUTCEndDate,
  shiftToUTCStartDate,
} from './ActivityHelper'

export const resetPlayoffDates = (
  activityForm: ActivityForm | undefined,
  setActivityForm: Dispatch<SetStateAction<ActivityForm>>,
  setPlayoffsRange: Dispatch<SetStateAction<DateRange | null | undefined>>
) => {
  updateData(defaultPlayoff(activityForm), setActivityForm, activityForm)
  setPlayoffsRange(null)
}

export const defaultPlayoff = (activityForm: ActivityForm | undefined) => {
  return {
    playoff: {
      ...activityForm?.playoff,
      ...{
        playoff_dates: {
          ...activityForm?.playoff?.playoff_dates,
          ...{start_date: 0, end_date: 0},
        },
      },
      is_valid: false,
    },
  }
}

export const handlePlayoffsChange = (
  e: any,
  activityForm: ActivityForm | undefined,
  setActivityForm: Dispatch<SetStateAction<ActivityForm>>,
  setShowErrors: Dispatch<SetStateAction<boolean>>,
  setPlayoffsRange: Dispatch<SetStateAction<DateRange | null | undefined>>
) => {
  if (e) {
    let startDate = shiftToUTCStartDate(new Date(e[0]).getTime() / 1000)
    let endDate = shiftToUTCEndDate(new Date(e[1]).getTime() / 1000)

    if (activityForm?.playoff?.teams) {
      let daysOfRange
      let daysNeeded

      if (
        activityForm?.schedule?.settings?.frequency === 2 &&
        activityForm?.schedule?.settings?.day
      ) {
        daysOfRange = countDaysOfWeekJS(startDate, endDate, activityForm?.schedule?.settings?.day)
        daysNeeded = Math.ceil(Math.log2(activityForm?.playoff?.teams))
      } else {
        daysOfRange = Math.ceil(getDaysBetweenDates(startDate, endDate))
        daysNeeded = Math.ceil(Math.log2(activityForm?.playoff?.teams))
      }

      let startDateTimestamp = Math.floor(startDate.getTime() / 1000)
      let endDateTimestamp = Math.floor(endDate.getTime() / 1000)

      if (daysNeeded <= daysOfRange) {
        updateData(
          {
            playoff: {
              ...activityForm?.playoff,
              ...{
                playoff_dates: {
                  ...activityForm?.playoff?.playoff_dates,
                  ...{start_date: startDateTimestamp, end_date: endDateTimestamp},
                },
              },
              is_valid: true,
            },
          },
          setActivityForm,
          activityForm
        )
        setShowErrors(false)
        setPlayoffsRange(e)
      } else {
        resetPlayoffDates(activityForm, setActivityForm, setPlayoffsRange)
        setShowErrors(true)
      }
    }
  }
}

export const handleFrequencyChange = (
  e: any,
  activityForm: ActivityForm | undefined,
  setActivityForm: Dispatch<SetStateAction<ActivityForm>>
) => {
  if (activityForm?.playoff?.is_enabled) {
    updateData(
      {
        schedule: {
          ...activityForm?.schedule,
          ...{
            settings: {
              ...activityForm?.schedule.settings,
              ...{frequency: e?.value},
            },
          },
        },
        playoff: defaultPlayoff(activityForm).playoff,
      },
      setActivityForm,
      activityForm
    )
  } else {
    if (activityForm?.type_id === 2) {
      updateData(
        {
          schedule: {
            ...activityForm?.schedule,
            ...{
              settings: {
                ...activityForm?.schedule.settings,
                ...{frequency: e?.value},
              },
              matchplay_dates: {
                ...activityForm?.schedule.matchplay_dates,
                ...{start_date: 0, end_date: 0},
              },
            },
          },
        },
        setActivityForm,
        activityForm
      )
    } else {
      updateData(
        {
          schedule: {
            ...activityForm?.schedule,
            ...{
              settings: {
                ...activityForm?.schedule.settings,
                ...{frequency: e?.value},
              },
            },
          },
        },
        setActivityForm,
        activityForm
      )
    }
  }
}

export const handleDayChange = (
  e: any,
  activityForm: ActivityForm | undefined,
  setActivityForm: Dispatch<SetStateAction<ActivityForm>>,
  setRegistrationValue: Dispatch<SetStateAction<DateRange | null | undefined>>,
  setMatchPlayValue: Dispatch<SetStateAction<DateRange | null | undefined>>
) => {
  if (activityForm?.playoff?.is_enabled) {
    updateData(
      {
        schedule: {
          ...activityForm?.schedule,
          ...{
            settings: {
              ...activityForm?.schedule.settings,
              ...{day: e?.value},
            },
            matchplay_dates: {
              ...activityForm?.schedule.matchplay_dates,
              ...{start_date: 0, end_date: 0},
            },
            registration_dates: {
              ...activityForm?.schedule.registration_dates,
              ...{start_date: 0, end_date: 0},
            },
          },
        },
        playoff: defaultPlayoff(activityForm).playoff,
      },
      setActivityForm,
      activityForm
    )
  } else {
    updateData(
      {
        schedule: {
          ...activityForm?.schedule,
          ...{
            settings: {
              ...activityForm?.schedule.settings,
              ...{day: e?.value},
            },
            matchplay_dates: {
              ...activityForm?.schedule.matchplay_dates,
              ...{start_date: 0, end_date: 0},
            },
            registration_dates: {
              ...activityForm?.schedule.registration_dates,
              ...{start_date: 0, end_date: 0},
            },
          },
        },
      },
      setActivityForm,
      activityForm
    )
  }

  setRegistrationValue(null)
  setMatchPlayValue(null)
}

const updateActivityFormTeams = (
  teams: number,
  activityForm: ActivityForm | undefined,
  setActivityForm: Dispatch<SetStateAction<ActivityForm>>
) => {
  updateData(
    {
      playoff: {
        ...activityForm?.playoff,
        ...{
          playoff_dates: {
            ...activityForm?.playoff?.playoff_dates,
            ...{start_date: 0, end_date: 0},
          },
          teams: teams,
        },
      },
    },
    setActivityForm,
    activityForm
  )
}

export const handleTeamChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  activityForm: ActivityForm | undefined,
  setActivityForm: Dispatch<SetStateAction<ActivityForm>>,
  setTeam: Dispatch<SetStateAction<string>>
) => {
  const {value} = event.target
  if (/^\d+$/.test(value)) {
    if (activityForm?.team?.max && parseInt(value) > activityForm?.team?.max) {
      updateActivityFormTeams(activityForm?.team?.max, activityForm, setActivityForm)
      setTeam(activityForm?.team?.max.toString())
    } else {
      updateActivityFormTeams(parseInt(value), activityForm, setActivityForm)
      setTeam(value)
    }
  } else {
    if (value === '') {
      updateActivityFormTeams(parseInt(value), activityForm, setActivityForm)
      setTeam('')
    }
  }
}
