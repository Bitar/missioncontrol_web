import { ID } from "../../../../../_metronic/helpers";
import { ScoreSheet } from "./ScoreSheet";
import { Activity } from "../Activity";
import { Match } from "./Match";
import { Round } from "./Round";
import { Team } from "../../../../models/squad/Team";

export type Score = {
  id?: ID
  round: number
  score: number
  user_id?: number
  team_id: number
  is_approved: number
  images: { id: number; image: string }[]
  score_sheet: ScoreSheet[]
}
export const initialScore = (score?: Score) => {
  return {
    round: score?.round || 0,
    score: score?.score || 0,
    is_approved: score?.is_approved || 0
  };
};

export const initScoreSettings = () => {
  return {
    rounds: [
      {
        round: 0,
        scores: [
          {
            team_id: 0,
            keys: [
              {
                key: 0,
                value: 0
              },
              {
                key: 0,
                value: 0
              }
            ]
          },
          {
            team_id: 0,
            keys: [
              {
                key: 0,
                value: 0
              },
              {
                key: 0,
                value: 0
              }
            ]
          }
        ]
      }
    ]
  };
};

export const defaultScoreSettings = (match?: Match, activity?: Activity) => {
  let scoreSettings: any = {
    rounds: []
  };

  if (activity?.settings?.rounds) {
    let matchTeams = match?.teams;
    for (let i = 0; i < activity?.settings?.rounds; i++) {
      let roundObject: any = {
        round: i + 1,
        scores: []
      };

      matchTeams?.forEach((team) => {
        let teamObject = {
          team_id: team?.id,
          keys: getDefaultScoreSheetKeys(activity)
        };

        roundObject.scores.push(teamObject);
      });

      scoreSettings.rounds.push(roundObject);
    }
  }

  return scoreSettings;
};

export const updateScores = (activity: Activity, matchRound: Round, teams?: Team[]) => {
  let scoresObjs: any[] = [];

  matchRound?.scores.forEach((score) => {
    let scoreObj: any = {
      team_id: score?.team_id,
      keys: []
    };

    score?.score_sheet.forEach((scoreSheet) => {
      let scoreSheetObj = {
        key: scoreSheet?.score_settings_id,
        value: scoreSheet?.value
      };
      scoreObj?.keys.push(scoreSheetObj);
    });

    scoresObjs.push(scoreObj);
  });

  // Check if MatchRound has 2 scores
  if (matchRound?.scores.length === 1) {
    let scoreObj = defaultScoreTeam(activity,
      teams?.find((team) => team?.id !== matchRound?.scores[0]?.team_id)?.id
    );
    scoresObjs.push(scoreObj);
  }

  return scoresObjs;
};

const defaultScoreTeam = (activity: Activity, team_id?: ID) => {
  return {
    team_id: team_id || 0,
    keys: getKeysArray(activity)
  };
};

const getKeysArray = (activity?: Activity) => {
  let keysArray: any[] = [];

  if (activity) {
    activity?.game_mode?.scoring_settings.forEach((scoreSetting) => {
      keysArray.push({
        key: scoreSetting.id,
        value: 0
      });
    });
  } else {
    keysArray.push({
      key: 0,
      value: 0
    });
    keysArray.push({
      key: 0,
      value: 0
    });
  }

  return keysArray;
};

export const defaultRound = (round: number, activity: Activity, teams?: Team[], matchRound?: Round) => {
  let roundObj: any;
  if (matchRound) {
    roundObj = {
      round: matchRound?.round,
      scores: updateScores(activity, matchRound, teams)
    };
  } else {
    let scoresObj: any[] = [];

    if (teams && teams.length > 0) {
      teams?.forEach((team) => {
        scoresObj.push(defaultScoreTeam(activity, team?.id));
      });
    } else {
      scoresObj.push(defaultScoreTeam(activity));
      scoresObj.push(defaultScoreTeam(activity));
    }

    roundObj = {
      round: round,
      scores: scoresObj
    };
  }

  return roundObj;
};

export const getDefaultScoreSheetKeys = (activity?: Activity) => {
  let defaultScoreSheet: any = [];

  if (activity?.game_mode?.scoring_settings) {
    for (let i = 0; i < activity?.game_mode?.scoring_settings?.length; i++) {
      let scoreSheetObj = {
        key: activity?.game_mode?.scoring_settings[i]?.id,
        value: 0
      };

      defaultScoreSheet.push(scoreSheetObj);
    }
  } else {
    let scoreSheetObj = {
      key: 0,
      value: 0
    };

    defaultScoreSheet.push(scoreSheetObj);
  }

  return defaultScoreSheet;
};

type scoreObjectKey = {
  key: number
  value: number
}

type scoresScoreObject = {
  keys: scoreObjectKey[]
  team_id: number
}

export type roundScoreObject = {
  round: number
  scores: scoresScoreObject[]
}
