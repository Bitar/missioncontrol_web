import {ID, Response} from '../../../../_metronic/helpers'
import {Game} from '../../../models/game/Game'
import {ActivityFee, initialActivityFee} from './ActivityFee'
import {ActivityLocation, initialActivityLocation} from './ActivityLocation'
import {Community} from '../../community/models/Community'
import {Dispatch, SetStateAction} from 'react'
import {updateData} from '../../../helpers/form/FormHelper'
import * as Yup from 'yup'
import {ActivityType, initialActivityType} from './ActivityType'
import {ActivitySettings, initialActivitySettings} from './ActivitySettings'
import {GameMode} from '../../../models/game/GameMode'
import {ActivityTeamSetting, initialActivityTeamSetting} from './AvtivityTeamSetting'
import { Team } from "../../../models/squad/Team";
import { Announcement } from "../../../models/announcement/Announcements";

export const activitySchema = Yup.object().shape({})

export const initialActivity = (activity?: Activity) => {
  return {
    title: activity?.title || '',
    description: activity?.description || '',
    type: initialActivityType(activity?.type),
    status: activity?.status || 0,
    settings: initialActivitySettings(activity?.settings),
    registration_dates: {
      start_date: 0,
      end_date: 0,
    },
    matchplay_dates: {
      start_date: 0,
      end_date: 0,
    },

    location: initialActivityLocation(activity?.location),
    entry_fee: initialActivityFee(activity?.entry_fee),

    additional_data: {
      teams_count: 0,
      players_count: 0,
    },

    team_settings: initialActivityTeamSetting(activity?.team_settings),

    ready_to_submit: false
    // team: initialActivityTeam,
    // prize: initialActivityPrize,
  }
}

export type Activity = {
  id?: ID
  title: string
  description?: string
  type: ActivityType
  status: number
  teams?: Team[]
  settings: ActivitySettings
  community?: Community
  game?: Game
  game_mode?: GameMode
  registration_dates: {
    start_date: number
    end_date: number
  }
  matchplay_dates: {
    start_date: number
    end_date: number
  }
  prize?: []
  location?: ActivityLocation
  platforms?: [],
  announcements?: Announcement[]
  entry_fee?: ActivityFee
  team_settings?: ActivityTeamSetting
  rules?: []
  // standings: []



  additional_data?: {
    teams_count: number
    players_count: number
  }
  game_mode_id?: number
  game_id?: number
  type_id?: number
  platform_ids?: number[]
  ready_to_submit: boolean
}
export type ActivityQueryResponse = Response<Array<Activity>>


export const prepareForStore = (activity: Activity, setActivity: Dispatch<SetStateAction<Activity>>) => {
  updateData(
    {
      rounds: activity?.settings?.rounds,
      type_id: 1,
      is_cross_play: activity?.settings?.is_cross_play,
      game_id: activity?.game?.id,
      game_mode_id: activity?.game_mode?.id,
      team: activity?.team_settings,
      ready_to_submit: true,
      schedule: {
        registration_dates: {
          start_date: activity?.registration_dates?.start_date,
          end_date: activity?.registration_dates?.end_date,
        },
        match_play_dates: {
          start_date: activity?.matchplay_dates?.start_date,
          end_date: activity?.matchplay_dates?.end_date,
        },
      },
    },
    setActivity,
    activity
  )
}

export function formOnChange(
  event: any,
  activity: Activity | undefined,
  setActivity: Dispatch<SetStateAction<Activity>>
) {
  let targetName = event.target.name
  let targetValue = event.target.value

  if (targetName === 'is_cross_play') {
    updateData(
      {
        settings: {...activity?.settings, ...{is_cross_play: !activity?.settings?.is_cross_play}},
      },
      setActivity,
      activity
    )
  } else if (targetName === 'location.location') {
    updateData(
      {
        location: {...activity?.location, ...{location: targetValue}},
      },
      setActivity,
      activity
    )
  } else if (targetName === 'entry_fee.amount') {
    updateData(
      {
        entry_fee: {...activity?.entry_fee, ...{amount: targetValue}},
      },
      setActivity,
      activity
    )
  } else if (targetName.includes('team_settings.')) {
    let targetField = targetName.split('team_settings.')[1]
    updateData(
      {
        team_settings: {...activity?.team_settings, ...{[targetField]: targetValue}},
      },
      setActivity,
      activity
    )
  } else {
    updateData({[targetName]: targetValue}, setActivity, activity)
  }
}
