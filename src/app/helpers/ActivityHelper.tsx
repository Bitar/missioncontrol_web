import dayjs from 'dayjs'

const formatActivityStatus = (statusId: number) => {
  let color = ''
  let status = ''

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
  let color = ''
  let status = ''

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

const formatDates = (matchplayDates: any) => {
  const startDate = dayjs(new Date(matchplayDates?.start_date * 1000)).format('ll')
  const endDate = dayjs(new Date(matchplayDates?.end_date * 1000)).format('ll')

  return {startDate, endDate}
}

export {formatActivityStatus, formatDates, formatMatchStatus}
