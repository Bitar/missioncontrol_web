import dayjs from 'dayjs'
// import utc from 'dayjs/plugin/utc'
// import timezone from 'dayjs/plugin/timezone'
//
// dayjs.extend(utc)
// dayjs.extend(timezone)

const getTimeFromTimestamp = (timestamp: any) => {
  return dayjs(new Date(timestamp * 1000)).format('LT')
}

const getDateFromTimestamp = ($timestamp: any) => {
  return dayjs(new Date($timestamp * 1000)).format('ddd, ll')
}

const calculateTeamScore = (match: any, team: any) => {
  let totalScore = 0

  match?.rounds.forEach((round: any) => {
    let scores = round.scores

    scores.forEach((score: any) => {
      if (score.team_id === team.id) {
        totalScore += score.score
      }
    })
  })

  return totalScore
}

export {getDateFromTimestamp, getTimeFromTimestamp, calculateTeamScore}