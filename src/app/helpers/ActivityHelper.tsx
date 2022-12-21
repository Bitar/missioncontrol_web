import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import Timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(Timezone)

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
    status = 'Score Validation'
    color = 'info'
  } else {
    status = 'Closed'
    color = 'danger'
  }

  return {status, color}
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
    date.tz(tz, true)
  }

  return date
}

export const getDateConvertedToUTC = (timestamp: number, tz?: string) => {
  let date = dayjs(new Date(timestamp * 1000)).utc(false)

  if (tz) {
    date.tz(tz, true)
  }

  return date
}

export {formatActivityStatus, formatDates, formatMatchStatus}
