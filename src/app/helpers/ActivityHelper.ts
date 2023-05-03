import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'
import moment from 'moment/moment'
import toast from 'react-hot-toast'
import {updateData} from './form/FormHelper'
import {ActivityForm} from '../models/activity/ActivityForm'
import {Dispatch, SetStateAction} from 'react'
import {DateRange} from 'rsuite/esm/DateRangePicker/types'
import {DateTime} from 'luxon'

dayjs.extend(utc)
dayjs.extend(tz)

export const formatActivityStatus = (statusId: number) => {
  let color: string
  let status: string

  if (statusId === 1) {
    status = 'Registration'
    color = 'primary'
  } else if (statusId === 2) {
    status = 'Active'
    color = 'success'
  } else if (statusId === 3) {
    status = 'Pending'
    color = 'secondary'
  } else if (statusId === 5) {
    status = 'Generating Matches'
    color = 'info'
  } else if (statusId === 6) {
    status = 'Invalid Registrations'
    color = 'danger'
  } else if (statusId === 8) {
    status = 'Upcoming'
    color = 'secondary'
  } else if (statusId === 9) {
    status = 'Generating Playoff'
    color = 'info'
  } else if (statusId === 4) {
    status = 'Closed'
    color = 'danger'
  } else {
    status = 'Cancelled'
    color = 'danger'
  }

  return {status, color}
}

export const formatMatchStatus = (statusId: number) => {
  let color: string
  let status: string

  if (statusId === 1) {
    status = 'Scheduled'
    color = 'secondary'
  } else if (statusId === 2) {
    status = 'Playing'
    color = 'success'
  } else if (statusId === 4) {
    status = 'Dispute'
    color = 'info'
  } else if (statusId === 5) {
    status = 'Score Validation'
    color = 'info'
  } else if (statusId === 6) {
    status = 'Dispute Approved'
    color = 'success'
  } else if (statusId === 7) {
    status = 'Dispute Rejected'
    color = 'danger'
  } else {
    status = 'Closed'
    color = 'danger'
  }

  return {status, color}
}
export const shiftDateToUtc = (timestamp: number, timeZone?: string) => {
  let luxonDate = DateTime.fromSeconds(timestamp)

  if (timeZone) {
    luxonDate.setZone(timeZone)
  }

  return DateTime.fromObject({
    year: luxonDate?.year,
    month: luxonDate?.month,
    day: luxonDate?.day,
    hour: luxonDate?.hour,
    minute: luxonDate?.minute,
    second: luxonDate?.second,
  }).toJSDate()
}

export const shiftDateToUtcStartDate = (timestamp: number, timeZone?: string) => {
  let luxonDate = DateTime.fromSeconds(timestamp).toLocal()
  console.log(luxonDate)
  console.log(DateTime.fromSeconds(timestamp).toUTC())

  if (timeZone) {
    luxonDate.setZone(timeZone)
  }

  return DateTime.fromObject({
    year: luxonDate?.year,
    month: luxonDate?.month,
    day: luxonDate?.day,
    hour: 0,
    minute: 0,
    second: 0,
  }).toJSDate()
}
export const createDateFrom = (timestamp: number) => {
  let UTCRegStartDate = moment(timestamp * 1000).utc(false)
  return moment()
    .year(UTCRegStartDate.year())
    .month(UTCRegStartDate.month())
    .date(UTCRegStartDate.date())
    .hour(UTCRegStartDate.hour())
    .minute(UTCRegStartDate.minute())
    .second(UTCRegStartDate.second())
}

export const getDateInUTC = (timestamp: number, tz?: string) => {
  return dayjs(new Date(timestamp * 1000))
    .utc(false)
    .tz(tz, true)
}

export const activityRegistrationOnChange = (
  e: any,
  activityForm: ActivityForm | undefined,
  setActivityForm: Dispatch<SetStateAction<ActivityForm>>,
  setRegistrationValue: Dispatch<SetStateAction<DateRange | null | undefined>>,
  setMatchPlayValue: Dispatch<SetStateAction<DateRange | null | undefined>>,
  setMatchPlayDisabledDate: Dispatch<SetStateAction<Date>>
) => {
  if (e) {
    const today = new Date()

    if (new Date(e[1]) < today) {
      toast.error('Registration end date needs to be in the future.')
      setRegistrationValue(null)
    } else {
      let startDate = shiftDateToUtc(new Date(e[0]).getTime() / 1000)
      let endDate = shiftDateToUtc(new Date(e[1]).getTime() / 1000)

      updateData(
        {
          schedule: {
            ...activityForm?.schedule,
            ...{
              registration_dates: {
                ...activityForm?.schedule.registration_dates,
                ...{start_date: startDate.getTime() / 1000, end_date: endDate.getTime() / 1000},
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

      let endDateDate = new Date(e[1])
      let disabledEndDate = new Date(endDateDate)
      disabledEndDate.setDate(endDateDate.getDate() + 1)

      setRegistrationValue(e)
      setMatchPlayValue(null)
      setMatchPlayDisabledDate(disabledEndDate)
    }
  }
}

export const activityMatchPlayOnChange = (
  e: any,
  activityForm: ActivityForm | undefined,
  setActivityForm: Dispatch<SetStateAction<ActivityForm>>,
  setMatchPlayValue: Dispatch<SetStateAction<DateRange | null | undefined>>,
  setShowErrors: Dispatch<SetStateAction<boolean>>
) => {
  if (e) {
    let startDate = shiftDateToUtc(new Date(e[0]).getTime() / 1000)
    let endDate = shiftDateToUtc(new Date(e[1]).getTime() / 1000)
    // let startDate = new Date(e[0])
    // let endDate = new Date(e[1])

    if (activityForm?.type_id === 1) {
      let updateObject = getLeagueUpdateObj(startDate, endDate, activityForm)
      updateData(updateObject, setActivityForm, activityForm)
    } else {
      let {updateObject, errors} = getTournamentUpdateObj(startDate, endDate, activityForm)

      if (errors) {
        setMatchPlayValue(e)
      } else {
        setMatchPlayValue(null)
      }

      setShowErrors(errors)
      updateData(updateObject, setActivityForm, activityForm)
    }
  }
}

export const updateActivityMatchPlayDates = (
  activityForm: ActivityForm | undefined,
  setMatchPlayValue: Dispatch<SetStateAction<DateRange | null | undefined>>
) => {
  if (
    activityForm?.schedule?.matchplay_dates?.start_date &&
    activityForm?.schedule?.matchplay_dates?.end_date &&
    activityForm?.schedule?.matchplay_dates?.start_date > 0 &&
    activityForm?.schedule?.matchplay_dates?.end_date > 0
  ) {
    let startDate = shiftDateToUtc(
      activityForm?.schedule?.matchplay_dates?.start_date,
      activityForm?.schedule?.settings?.timezone?.value
    )
    let endDate = shiftDateToUtc(
      activityForm?.schedule?.matchplay_dates?.end_date,
      activityForm?.schedule?.settings?.timezone?.value
    )

    setMatchPlayValue([startDate, endDate])
  } else {
    setMatchPlayValue(null)
  }
}

export const updateActivityRegistrationDates = (
  activityForm: ActivityForm | undefined,
  setRegistrationValue: Dispatch<SetStateAction<DateRange | null | undefined>>,
  setMatchPlayDisabledDate: Dispatch<SetStateAction<Date>>
) => {
  if (
    activityForm?.schedule?.registration_dates?.start_date &&
    activityForm?.schedule?.registration_dates?.end_date &&
    activityForm?.schedule?.registration_dates?.start_date > 0 &&
    activityForm?.schedule?.registration_dates?.end_date > 0
  ) {
    let startDate = shiftDateToUtc(
      activityForm?.schedule?.registration_dates?.start_date,
      activityForm?.schedule?.settings?.timezone?.value
    )
    let endDate = shiftDateToUtc(
      activityForm?.schedule?.registration_dates?.end_date,
      activityForm?.schedule?.settings?.timezone?.value
    )

    setRegistrationValue([startDate, endDate])

    let disabledEndDate = new Date(endDate)
    disabledEndDate.setDate(endDate.getDate() + 1)

    setMatchPlayDisabledDate(disabledEndDate)
  } else {
    setRegistrationValue(null)
  }
}

export const getLeagueUpdateObj = (
  startDate: Date,
  endDate: Date,
  activityForm: ActivityForm | undefined
) => {
  let updateObject

  let startDateTimestamp = Math.floor(startDate.getTime() / 1000)
  let endDateTimestamp = Math.floor(endDate.getTime() / 1000)

  updateObject = {
    schedule: {
      ...activityForm?.schedule,
      ...{
        matchplay_dates: {
          ...activityForm?.schedule.matchplay_dates,
          ...{start_date: startDateTimestamp, end_date: endDateTimestamp},
        },
      },
    },
  }

  if (activityForm?.playoff?.is_enabled) {
    updateObject = {
      schedule: {
        ...activityForm?.schedule,
        ...{
          matchplay_dates: {
            ...activityForm?.schedule.matchplay_dates,
            ...{start_date: startDateTimestamp, end_date: endDateTimestamp},
          },
        },
      },
      playoff: {
        ...activityForm?.playoff,
        ...{
          playoff_dates: {
            ...activityForm?.playoff?.playoff_dates,
            ...{start_date: 0, end_date: 0},
          },
        },
      },
    }
  }

  return updateObject
}

export const getDaysNeedRanged = (
  startDate: Date,
  endDate: Date,
  activityForm: ActivityForm | undefined,
  teamCount: number
) => {
  let daysOfRange
  let daysNeeded

  startDate = new Date(startDate)
  endDate = new Date(endDate)

  if (activityForm?.schedule?.settings?.frequency === 2 && activityForm?.schedule?.settings?.day) {
    daysOfRange = countDaysOfWeekJS(startDate, endDate, activityForm?.schedule?.settings?.day)
    daysNeeded = Math.ceil(Math.log2(teamCount))
  } else {
    daysOfRange = Math.ceil(getDaysBetweenDates(startDate, endDate))
    daysNeeded = Math.ceil(Math.log2(teamCount))
  }

  return {daysNeeded, daysOfRange}
}

export const getTournamentUpdateObj = (
  startDate: Date,
  endDate: Date,
  activityForm: ActivityForm | undefined
) => {
  let updateObject
  let errors = false

  let {daysNeeded, daysOfRange} = getDaysNeedRanged(
    startDate,
    endDate,
    activityForm,
    activityForm?.team?.max!
  )

  console.log(daysNeeded)
  console.log(daysOfRange)

  let startDateTimestamp = Math.floor(startDate.getTime() / 1000)
  let endDateTimestamp = Math.floor(endDate.getTime() / 1000)

  if (daysNeeded <= daysOfRange) {
    updateObject = {
      schedule: {
        ...activityForm?.schedule,
        ...{
          matchplay_dates: {
            ...activityForm?.schedule.matchplay_dates,
            ...{start_date: startDateTimestamp, end_date: endDateTimestamp},
          },
        },
      },
    }
  } else {
    updateObject = {
      schedule: {
        ...activityForm?.schedule,
        ...{
          matchplay_dates: {
            ...activityForm?.schedule.matchplay_dates,
            ...{start_date: 0, end_date: 0},
          },
        },
      },
    }

    errors = true
  }

  return {updateObject, errors}
}

export function getDaysBetweenDates(startDate: Date, endDate: Date): number {
  if (startDate <= endDate) {
    const oneDayInMilliseconds = 1000 * 60 * 60 * 24 // number of milliseconds in a day

    const startTime = startDate.getTime()
    const endTime = endDate.getTime()

    const timeDiff = endTime - startTime

    // divide by number of milliseconds in a day and round down and add one to add the endDate
    return Math.floor(timeDiff / oneDayInMilliseconds) + 1
  }

  return 0
}

export const isValidTournament = (
  e: any,
  activityForm: ActivityForm | undefined,
  setShowErrors: Dispatch<SetStateAction<boolean>>
) => {
  if (activityForm?.type_id === 2 && activityForm?.team?.max) {
    let startDate = new Date(e[0])
    let endDate = new Date(e[1])

    let daysOfRange = Math.ceil(getDaysBetweenDates(startDate, endDate))
    let daysNeeded = Math.ceil(Math.log2(activityForm?.team?.max))

    daysNeeded <= daysOfRange ? setShowErrors(false) : setShowErrors(true)
  }
}

export const countDaysOfWeekJS = (startDate: Date, endDate: Date, dayOfWeek: any): number => {
  let currentDate = new Date(startDate)
  let count = 0

  while (currentDate <= endDate) {
    if (currentDate.getDay() === dayOfWeek || (currentDate.getDay() === 0 && dayOfWeek === 7)) {
      count++
    }

    currentDate.setDate(currentDate.getDate() + 1)
  }

  return count
}
