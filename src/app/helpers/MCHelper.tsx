const getDateFromTimestamp = ($timestamp: any) => {
  return new Date($timestamp * 1000).toDateString()
}

export {getDateFromTimestamp}