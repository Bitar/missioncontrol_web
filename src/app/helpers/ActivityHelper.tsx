import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'
import moment from 'moment/moment'
import toast from 'react-hot-toast'
import {updateData} from './form/FormHelper'
import {ActivityForm} from '../models/activity/ActivityForm'
import {Dispatch, SetStateAction} from 'react'
import {DateRange} from 'rsuite/esm/DateRangePicker/types'

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
  } else if (statusId === 9) {
    status = 'Generating Playoffs'
    color = 'info'
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
      let startDate = dayjs(new Date(e[0]).setHours(0, 0)).utc(true).tz('utc').unix()
      let endDate = dayjs(new Date(e[1]).setHours(0, 0)).utc(true).tz('utc').unix()

      updateData(
        {
          schedule: {
            ...activityForm?.schedule,
            ...{
              registration_dates: {
                ...activityForm?.schedule.registration_dates,
                ...{start_date: startDate, end_date: endDate},
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
  setMatchPlayValue: Dispatch<SetStateAction<DateRange | null | undefined>>
) => {
  if (e) {
    let startDate = dayjs(new Date(e[0]).setHours(0, 0)).utc(true).tz('utc').unix()
    let endDate = dayjs(new Date(e[1]).setHours(23, 59)).utc(true).tz('utc').unix()

    updateData(
      {
        schedule: {
          ...activityForm?.schedule,
          ...{
            matchplay_dates: {
              ...activityForm?.schedule.matchplay_dates,
              ...{start_date: startDate, end_date: endDate},
            },
          },
        },
      },
      setActivityForm,
      activityForm
    )

    setMatchPlayValue(e)
  }
}

export {formatActivityStatus, formatDates, formatMatchStatus}
