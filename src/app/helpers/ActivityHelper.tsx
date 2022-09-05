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
  const startDate = new Date(matchplayDates?.start_date * 1000).toDateString()
  const endDate = new Date(matchplayDates?.end_date * 1000).toDateString()

  return {startDate, endDate}
}

export {formatActivityStatus, formatDates, formatMatchStatus}
