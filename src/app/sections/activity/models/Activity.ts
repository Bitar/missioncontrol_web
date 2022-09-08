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
import {Team} from '../../../models/squad/Team'
import {Announcement} from '../../../models/announcement/Announcements'
import {ActivityStanding} from './ActivityStanding'
import {ActivityRegistration} from './ActivityRegistration'

export const activitySchema = Yup.object().shape({
  // title: Yup.string().required('Activity title is required'),
  // description: Yup.string().required('Activity Description is required'),
  // community_id: Yup.number().required('Community Id is required'),
  // game: Yup.string(),
  // contact: Yup.object().shape({
  //   name: Yup.string().required('Contact name is required'),
  //   email: Yup.string().email('Please enter a valid email').required('Contact email is required'),
  //   phone_number: Yup.string().required('Contact phone number is required'),
  // }),
  // address: Yup.object().shape({
  //   address_one: Yup.string().required('Contact address is required'),
  //   // address_two: Yup.string(),
  //   city: Yup.string().required('City is required'),
  //   // state_province: Yup.string().required('State Province is required'),
  //   postal_code: Yup.string().required('Postal Code is required'),
  //   // country_code: Yup.string().required('Country Code is required'),
  // }),
})

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
      total_sessions: 0,
    },

    team_settings: initialActivityTeamSetting(activity?.team_settings),

    ready_to_submit: false,
    community_id: 0
    // team: initialActivityTeam,
    // prize: initialActivityPrize,
  }
}

export type Activity = {
  id?: ID
  title: string
  description?: string
  created_at?: number
  type: ActivityType
  community_id: number
  status: number
  teams?: Team[]
  registrations?: ActivityRegistration[]
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
  platforms?: []
  announcements?: Announcement[]
  entry_fee?: ActivityFee
  team_settings?: ActivityTeamSetting
  rules?: []
  standings?: ActivityStanding[]

  additional_data?: {
    teams_count: number
    players_count: number
    total_sessions: number
  }
  game_mode_id?: number
  game_id?: number
  type_id?: number
  platform_ids?: number[]
  ready_to_submit: boolean
}
export type ActivityQueryResponse = Response<Array<Activity>>

export const prepareForStore = (
  activity: Activity,
  setActivity: Dispatch<SetStateAction<Activity>>
) => {
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

  console.log(targetName)
  console.log(targetValue)

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
