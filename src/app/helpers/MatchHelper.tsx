import {Match} from '../sections/activity/models/matches/Match'
import {ID} from './crud-helper/models'

export function isWinner(match: Match, teamId: ID) {
  if (match?.result && teamId) {
    if (match?.result?.home_team?.status === 1 && match?.result?.home_team?.id === teamId) {
      return true
    } else if (match?.result?.away_team?.status === 1 && match?.result?.away_team?.id === teamId) {
      return true
    }
  }

  return false
}
