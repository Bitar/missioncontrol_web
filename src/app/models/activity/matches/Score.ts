import {ScoreSheet} from './ScoreSheet'
import {Activity} from '../Activity'
import {Round} from './Round'
import {Team} from '../../squad/Team'
import {ScoringSettings} from '../../game/scoring/ScoringSettings'
import {Match, NewMatch} from './Match'

export type Score = {
  id?: number
  round: number
  score: number
  user_id?: number
  team_id: number
  is_approved: number
  images: {id: number; image: string}[]
  score_sheet: ScoreSheet[]
}
export const initialScore = (score?: Score) => {
  return {
    round: score?.round || 0,
    score: score?.score || 0,
    is_approved: score?.is_approved || 0,
  }
}

export const updateScores = (activity: Activity, matchRound: Round, teams?: Team[]) => {
  let scoresObjs: any[] = []

  matchRound?.scores.forEach((score) => {
    let scoreObj: any = {
      team_id: score?.team_id,
      keys: [],
    }

    let activitySettings = activity?.game_mode?.scoring_settings

    activitySettings?.forEach((scoreSetting) => {
      let scoreSheetValue = checkScoreKey(scoreSetting, score?.score_sheet)

      let scoreSheetObj = {
        key: scoreSetting?.id,
        value: scoreSheetValue,
      }

      scoreObj?.keys.push(scoreSheetObj)
    })

    scoresObjs.push(scoreObj)
  })

  // Check if MatchRound has 2 scores
  if (matchRound?.scores.length === 1) {
    let scoreObj = defaultScoreTeam(
      activity,
      teams?.find((team) => team?.id !== matchRound?.scores[0]?.team_id)?.id
    )
    scoresObjs.push(scoreObj)
  }

  return scoresObjs
}

const checkScoreKey = (scoreSetting: ScoringSettings, scoreSheets: ScoreSheet[]) => {
  let scoreSheetExist = scoreSheets?.find((scoreSheet) => {
    return scoreSheet?.score_settings_id === scoreSetting?.id
  })

  if (scoreSheetExist) {
    if (scoreSetting?.key?.type === 1) {
      return scoreSheetExist?.value
    } else {
      let exist = scoreSetting?.values?.find(
        (scoreSettingValue) => scoreSettingValue?.id === scoreSheetExist?.scoring_value_id
      )

      return exist?.key || 0
    }
  }

  return 0
}

const defaultScoreTeam = (activity: Activity, team_id?: number) => {
  return {
    team_id: team_id || 0,
    keys: getKeysArray(activity),
  }
}

const getKeysArray = (activity?: Activity) => {
  let keysArray: any[] = []

  if (activity) {
    activity?.game_mode?.scoring_settings.forEach((scoreSetting) => {
      keysArray.push({
        key: scoreSetting.id,
        value: 0,
      })
    })
  } else {
    keysArray.push({
      key: 0,
      value: 0,
    })
    keysArray.push({
      key: 0,
      value: 0,
    })
  }

  return keysArray
}

export const defaultRound = (
  round: number,
  activity: Activity,
  teams?: Team[],
  matchRound?: Round
) => {
  let roundObj: any
  if (matchRound) {
    roundObj = {
      round: matchRound?.round,
      scores: updateScores(activity, matchRound, teams),
    }
  } else {
    let scoresObj: any[] = []

    if (teams && teams.length > 0) {
      teams?.forEach((team) => {
        scoresObj.push(defaultScoreTeam(activity, team?.id))
      })
    } else {
      scoresObj.push(defaultScoreTeam(activity))
      scoresObj.push(defaultScoreTeam(activity))
    }

    roundObj = {
      round: round,
      scores: scoresObj,
    }
  }

  return roundObj
}

export type ScoreObjectKey = {
  key: number
  value: number
}

export type ScoresScoreObject = {
  keys: ScoreObjectKey[]
  team_id: number
}

export type RoundScoreObject = {
  round: number
  scores: ScoresScoreObject[]
}

export const setUpScoringFields = (activity: Activity, match: NewMatch) => {
  let rounds = activity?.settings?.rounds

  let newRounds: RoundScoreObject[] = []

  for (let i = 1; i <= rounds; i++) {
    let matchRound = match?.rounds?.filter(
      (round) => round?.round === i && round?.scores?.length > 0
    )[0]
    if (matchRound) {
      // Match Found Scores
      newRounds.push(defaultRound(i, activity, match?.teams, matchRound))
    } else {
      newRounds.push(defaultRound(i, activity, match?.teams))
      // Add Default Round
      // Match Not Found Scores
    }
  }

  return newRounds
}
