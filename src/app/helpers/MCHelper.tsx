import dayjs from 'dayjs'
// import utc from 'dayjs/plugin/utc'
// import timezone from 'dayjs/plugin/timezone'
//
// dayjs.extend(utc)
// dayjs.extend(timezone)

const getTimeFromTimestamp = (timestamp: any, tz: string) => {
  return dayjs(new Date(timestamp * 1000)).format('LT')
}

const getDateFromTimestamp = ($timestamp: any, tz: string) => {
  return dayjs(new Date($timestamp * 1000)).format('ddd, ll')
}



export {getDateFromTimestamp, getTimeFromTimestamp}