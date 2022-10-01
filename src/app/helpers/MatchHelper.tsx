import {Match} from '../sections/activity/models/matches/Match'
import { ID } from "./crud-helper/models";

export function isWinner(match: Match, teamId: ID) {
  if (match?.result && teamId) {
    if (
      match?.result?.home_team?.score > match?.result?.away_team?.score &&
      match?.result?.home_team?.id === teamId
    ) {
      console.log('home team winner');
      return true
    } else if (
      match?.result?.away_team?.score > match?.result?.home_team?.score &&
      match?.result?.away_team?.id === teamId
    ) {
      console.log('away team winner');
      return true
    }
  }

      console.log('nope');
  return false
}