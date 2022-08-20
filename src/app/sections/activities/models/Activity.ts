import {ID, Response} from '../../../../_metronic/helpers'
import {Game} from '../../../models/game/Game'
import {ActivityFee, initialActivityFee} from './ActivityFee'
import {ActivityLocation, initialActivityLocation} from './ActivityLocation'
import {ActivitySchedule} from './ActivitySchedule'
import {Community} from '../../community/models/Community'
import {Dispatch, SetStateAction} from 'react'
import {updateData} from '../../../helpers/form/FormHelper'
import * as Yup from 'yup'
import {ActivityType, initialActivityType} from './ActivityType'
import {ActivitySettings, initialActivitySettings} from './ActivitySettings'
import {GameMode} from '../../../models/game/GameMode'

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
  // team?: Team
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
  schedule?: ActivitySchedule
  location?: ActivityLocation
  // platforms?: Platform,
  announcements?: []
  entry_fee?: ActivityFee
  team_settings?: []
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
  } else if (targetName === 'entry_fee.amount') {
    updateData(
      {
        entry_fee: {...activity?.entry_fee, ...{amount: targetValue}},
      },
      setActivity,
      activity
    )
  } else {
    updateData({[targetName]: targetValue}, setActivity, activity)
  }
}
