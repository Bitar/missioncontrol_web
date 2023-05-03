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

export const shiftToUtc = (timestamp: number, timezone: string) => {
  const localDateTime = DateTime.fromSeconds(timestamp)

  // Convert to another timezone (EST)
  const estDateTime = localDateTime.setZone(timezone)

  // Create a new timestamp in your local timezone keeping the time of the converted timezone
  const localDateTimeWithEstTime = DateTime.local().set({
    year: estDateTime.year,
    month: estDateTime.month,
    day: estDateTime.day,
    hour: estDateTime.hour,
    minute: estDateTime.minute,
    second: estDateTime.second,
  })

  // Convert the new local DateTime object to a timestamp
  return DateTime.fromSeconds(localDateTimeWithEstTime.toSeconds(), {zone: 'utc'}).toJSDate()
}

export const shiftToUTCStartDate = (timestamp: number) => {
  // Create a DateTime object from the timestamp
  const localDateTime = DateTime.fromSeconds(timestamp)

  // Set the time to 00:00:00
  const localDateTimeMidnight = localDateTime.set({hour: 0, minute: 0, second: 0}).startOf('hour')

  // Get the timezone offset in minutes
  const timezoneOffset = localDateTimeMidnight.offset

  // Add the offset to the timestamp to get the same local time in GMT
  const gmtTimestamp = localDateTimeMidnight.toSeconds() + timezoneOffset * 60

  // Create a new DateTime object in GMT timezone
  return DateTime.fromSeconds(gmtTimestamp, {zone: 'utc'}).toJSDate()
}
export const shiftToUTCEndDate = (timestamp: number) => {
  // Create a DateTime object from the timestamp
  const localDateTime = DateTime.fromSeconds(timestamp)

  // Set the time to 00:00:00
  const localDateTimeMidnight = localDateTime.set({hour: 23, minute: 59, second: 59}).endOf('hour')

  // Get the timezone offset in minutes
  const timezoneOffset = localDateTimeMidnight.offset

  // Add the offset to the timestamp to get the same local time in GMT
  const gmtTimestamp = localDateTimeMidnight.toSeconds() + timezoneOffset * 60

  // Create a new DateTime object in GMT timezone
  return DateTime.fromSeconds(gmtTimestamp, {zone: 'utc'}).toJSDate()
}

export const getLeagueUpdateObj = (
  startDate: Date,
  endDate: Date,
  activityForm: ActivityForm | undefined
) => {
  let updateObject
  let errors = false

  let startDateTimestamp = Math.floor(startDate.getTime() / 1000)
  let endDateTimestamp = Math.floor(endDate.getTime() / 1000)

  if (activityForm?.schedule?.settings?.frequency === 2) {
    let dayExist = countDaysOfWeekJS(startDate, endDate, activityForm?.schedule?.settings?.day)

    if (dayExist >= 1) {
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
  } else {
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

  return {updateObject, errors}
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
    console.log('current date:', currentDate)
    console.log('end date:', endDate)
    console.log('current date day', currentDate.getDay())
    console.log('day of week', dayOfWeek)
    if (currentDate.getDay() === dayOfWeek) {
      count++
    }

    currentDate.setDate(currentDate.getDate() + 1)
  }

  return count
}

export const getWeekdayByInteger = (dayNumber: number): string => {
  let luxonDayNumber = dayNumber + 1
  const date = DateTime.fromObject({weekday: luxonDayNumber})
  return date.toFormat('cccc')
}

export const getDayNumberFromTimestamp = (timestamp: number): number => {
  const date = DateTime.fromMillis(timestamp)
  return date.weekday
}

export const getDayNumberFromJsDate = (date: Date): number => {
  const luxonDate = DateTime.fromJSDate(date)
  return luxonDate.weekday
}
