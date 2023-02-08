import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(tz)

const formatActivityStatus = (statusId: number) => {
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
  } else {
    status = 'Closed'
    color = 'danger'
  }

  return {status, color}
}

const formatMatchStatus = (statusId: number) => {
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

export const convertDateToUTC = (timestamp: number) => {
  let date = new Date(timestamp * 1000);
  let now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
    date.getUTCDate(), date.getUTCHours(),
    date.getUTCMinutes(), date.getUTCSeconds());

  return new Date(now_utc);
}
export const convertDateToTimezone = (date: Date, tz: string) => {
  return new Intl.DateTimeFormat('default', {timeZone: tz, dateStyle: 'full', timeStyle: 'long'}).format(date)
}

const formatDates = (dates: any, tz: string) => {
  const startDate = dayjs(new Date(dates?.start_date * 1000))
    .utc(false)
    .tz(tz, true)
    .format('DD MMM YY')
  const endDate = dayjs(new Date(dates?.end_date * 1000))
    .subtract(1, 'second')
    .utc(false)
    .tz(tz, true)
    .format('DD MMM YY')

  return {startDate, endDate}
}

export const getDateConvertedToLocal = (timestamp: number, tz?: string) => {
  let date = dayjs(new Date(timestamp * 1000)).utc(true)

  if (tz) {
    date.tz(tz, false)
  }

  return date
}

export const getDateConvertedToTimezone = (timestamp: number, tz?: string) => {
  let date = dayjs(new Date(timestamp * 1000)).utc(false)

  if (tz) {
    date.tz(tz, true)
  }

  return date
}
export const getDateInUTC = (timestamp: number, tz?: string) => {
  return dayjs(new Date(timestamp * 1000)).utc(false).tz(tz, true);
}

export {formatActivityStatus, formatDates, formatMatchStatus}
