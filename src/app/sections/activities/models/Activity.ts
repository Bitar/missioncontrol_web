import { ID, Response } from "../../../../_metronic/helpers";
import { Game, initialGame } from "../../../models/game/Game";
import { ActivityFee, initialActivityFee } from "./ActivityFee";
import { ActivityLocation, initialActivityLocation } from "./ActivityLocation";
import { ActivitySchedule, initialActivitySchedule } from "./ActivitySchedule";
import { Community, initialCommunity } from "../../community/models/Community";
import { Dispatch, SetStateAction } from "react";
import { updateData } from "../../../helpers/form/FormHelper"
import * as Yup from 'yup'

export const activitySchema = Yup.object().shape({

})

export const initialActivity: Activity = {
  title: "",
  description: "",
  status: 0,
  community: initialCommunity(),
  game: initialGame,
  entry_fee: initialActivityFee,
  schedule: initialActivitySchedule,
  location: initialActivityLocation,

  registration_dates: {
    start_date: 0,
    end_date: 0
  },
  matchplay_dates: {
    start_date: 0,
    end_date: 0
  },
  rules: [],
  additional_data: {
    teams_count: 0,
    players_count: 0
  }

  // team: initialActivityTeam,
  // prize: initialActivityPrize,
};

export type Activity = {
  id?: ID
  title: string
  description?: string
  status: number
  // team?: Team
  community?: Community
  game?: Game
  entry_fee?: ActivityFee
  schedule?: ActivitySchedule
  // platforms?: Platform,
  location?: ActivityLocation

  registration_dates: {
    start_date: number
    end_date: number
  }
  matchplay_dates: {
    start_date: number
    end_date: number
  }
  rules?: []
  // standings: []
  additional_data?: {
    teams_count: number
    players_count: number
  }
}
export type ActivityQueryResponse = Response<Array<Activity>>

export function formOnChange(
  event: any,
  activity: Activity | undefined,
  setActivity: Dispatch<SetStateAction<Activity>>
) {
  let targetName = event.target.name;
  let targetValue = event.target.value;

  updateData({ [targetName]: targetValue }, setActivity, activity);
}