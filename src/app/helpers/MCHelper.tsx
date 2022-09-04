import dayjs from "dayjs";

const getTimeFromTimestamp = ($timestamp: any) => {
  return dayjs(new Date($timestamp * 1000)).format('LT')
}

const getDateFromTimestamp = ($timestamp: any) => {
  return dayjs(new Date($timestamp * 1000)).format('ddd, ll')
}

export {getDateFromTimestamp, getTimeFromTimestamp}