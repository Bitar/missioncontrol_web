import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
// import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
// dayjs.extend(timezone)

export const calculateTeamScore = (match: any, team: any) => {
  let totalScore = 0

  if (team) {
    match?.rounds.forEach((round: any) => {
      let scores = round.scores

      scores.forEach((score: any) => {
        if (score.team_id === team.id) {
          totalScore += score.score
        }
      })
    })
  }

  return totalScore
}

export function getColor(index: number): string {
  const colors = [
    'mc-primary',
    'mc-secondary',
    'primary',
    'info',
    'success',
    'warning',
    'dark',
    'danger',
    'secondary',
  ];

  // const randomIndex = Math.floor(Math.random() * colors.length);
  return `${colors[index]}`;
}