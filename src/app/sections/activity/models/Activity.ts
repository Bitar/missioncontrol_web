import {ID, Response} from '../../../../_metronic/helpers'
import {Game} from '../../../models/game/Game'
import {ActivityFee} from './ActivityFee'
import {ActivityLocation} from './ActivityLocation'
import {Community} from '../../community/models/Community'
import * as Yup from 'yup'
import {ActivityType} from './ActivityType'
import {ActivitySettings} from './ActivitySettings'
import {GameMode} from '../../../models/game/GameMode'
import {ActivityTeamSetting} from './AvtivityTeamSetting'
import {Team} from '../../../models/squad/Team'
import {Announcement} from '../../../models/announcement/Announcements'
import {ActivityStanding} from './ActivityStanding'
import {ActivityRegistration} from './ActivityRegistration'
import {ActivityPrize} from './ActivityPrize'
import dayjs from 'dayjs'

export const activityScheduleSchema = Yup.object().shape({
  schedule: Yup.object().shape({
    registration_dates: Yup.object().shape({
      start_date: Yup.string().required('Registration Start Date is required'),
      end_date: Yup.string().required('Registration End Date is required'),
    }),
    matchplay_dates: Yup.object().shape({
      start_date: Yup.string().required('GameDay Start Date is required'),
      end_date: Yup.string().required('GameDay End Date is required'),
    }),
    settings: Yup.object().shape({
      frequency: Yup.string().required('Match Frequency is required'),
      time: Yup.string().required('Time of Day is required'),
      day: Yup.string().when('schedule.settings.frequency', {
        is: 2 || '2',
        then: Yup.string().required('Day required'),
      }),
      timezone: Yup.string().required('Timezone is required'),
    }),
  }),
})

export const activitySchema = Yup.object().shape({
  title: Yup.string().required('Activity title is required'),
  description: Yup.string().required('Activity Description is required'),
  community_id: Yup.string().required('Community is required'),
  game_id: Yup.string().required('Game is required'),
  game_mode_id: Yup.string().required('Game Mode is required'),
  rounds: Yup.string().required('Rounds is required'),
  is_cross_play: Yup.boolean(),
  platform_ids: Yup.array()
    .ensure()
    .when('is_cross_play', {
      is: true,
      then: Yup.array().min(1).required('At least 1 platform is required'),
    }),
  platform_id: Yup.string()
    .ensure()
    .when('is_cross_play', {
      is: false,
      then: Yup.string().required('Platform is required'),
    }),
  activityScheduleSchema,
  location: Yup.object().shape({
    type: Yup.number().required('Entry Fee Type required'),
    location: Yup.number().when('entry_fee.type', {
      is: 2,
      then: Yup.number().required('Amount required'),
    }),
  }),
  team: Yup.object().shape({
    min: Yup.number().required('Minimum Players is required'),
    max: Yup.number().required('Maximum Players is required'),
    players: Yup.number().required('Players Per team is required'),
  }),
  entry_fee: Yup.object().shape({
    type: Yup.number().required('Entry Fee Type required'),
    amount: Yup.number().when('entry_fee.type', {
      is: 2,
      then: Yup.number().required('Amount required'),
    }),
  }),
  // prize: Yup.array().of(
  //   Yup.object().shape({
  //     type: Yup.string().required('Item type is required'),
  //   })
  // ),
})

export type Activity = {
  id?: ID
  title: string
  description?: string
  created_at?: number
  type: ActivityType
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
}

export type ActivityQueryResponse = Response<Array<Activity>>

export type ActivityForm = {
  id?: ID
  title: string
  description: string
  type_id?: number
  community_id?: string | number
  game_id?: string | number
  game_mode_id?: string | number
  rounds?: string | number
  is_cross_play?: boolean
  platform_id?: string
  platform_ids?: number[]
  schedule: ActivityFormSchedule
  location?: ActivityLocation
  team?: ActivityTeamSetting
  entry_fee?: ActivityFee
  prize?: ActivityPrize[]
}

export type ActivityFormSchedule = {
  registration_dates: {
    start_date: number
    end_date: number
  }
  matchplay_dates: {
    start_date: number
    end_date: number
  }
  settings: {
    frequency: string | number
    time: string | number
    timezone: string | number
    day: string | number
  }
}

export const initialActivityFormSchedule = (activity?: Activity) => {
  console.info(activity?.settings.time || dayjs(new Date()).format('HH:mm:ss'))
  console.info(activity?.settings.time)
  console.info(dayjs(new Date()).format('HH:mm:ss'))
  return {
    registration_dates: {
      start_date: activity?.registration_dates.start_date || 0,
      end_date: activity?.registration_dates.end_date || 0,
    },
    matchplay_dates: {
      start_date: activity?.matchplay_dates.start_date || 0,
      end_date: activity?.matchplay_dates.end_date || 0,
    },
    settings: {
      frequency: activity?.settings.frequency || '',
      time: activity?.settings.time || '',
      timezone: activity?.settings.timezone || '',
      day: activity?.settings.day || '',
    },
  }
}

export const initialActivityForm = (activityForm?: ActivityForm) => {
  return {
    type_id: activityForm?.type_id || 1,
    title: activityForm?.title || '',
    description: activityForm?.description || '',
    community_id: activityForm?.community_id || '',
    game_id: activityForm?.game_id || '',
    game_mode_id: activityForm?.game_mode_id || '',
    rounds: activityForm?.rounds || '',
    is_cross_play: activityForm?.is_cross_play || false,
    platform_id: activityForm?.platform_id || '',
    platform_ids: activityForm?.platform_ids || [],
    schedule: {
      registration_dates: {
        start_date: activityForm?.schedule.registration_dates.start_date || 0,
        end_date: activityForm?.schedule.registration_dates.end_date || 0,
      },
      matchplay_dates: {
        start_date: activityForm?.schedule.matchplay_dates.start_date || 0,
        end_date: activityForm?.schedule.matchplay_dates.end_date || 0,
      },
      settings: {
        frequency: activityForm?.schedule.settings.frequency || '',
        time: activityForm?.schedule.settings.time || dayjs(new Date()).format('HH:mm:ss'),
        timezone: activityForm?.schedule.settings.timezone || '',
        day: activityForm?.schedule.settings.day || '',
      },
    },
    team: {
      min: activityForm?.team?.min || 0,
      max: activityForm?.team?.max || 0,
      players: activityForm?.team?.players || 0,
    },
    entry_fee: {
      type: activityForm?.entry_fee?.type || 1,
      amount: activityForm?.entry_fee?.amount || 0,
    },
    location: {
      type: activityForm?.location?.type || 1,
      location: activityForm?.location?.location || '',
    },
  }
}

export const initialActivityFormByActivity = (activity?: Activity) => {
  return {
    type_id: activity?.type?.id || 1,
    title: activity?.title || '',
    description: activity?.description || '',
    community_id: activity?.community?.id || '',
    game_id: activity?.game?.id || '',
    game_mode_id: activity?.game_mode?.id || '',
    rounds: activity?.settings?.rounds || '',
    is_cross_play: activity?.settings?.is_cross_play || false,
    // platform_id: activity?.platform_id || '',
    // platform_ids: activity?.platform_ids || [],
    schedule: {
      registration_dates: {
        start_date: activity?.registration_dates.start_date || 0,
        end_date: activity?.registration_dates.end_date || 0,
      },
      matchplay_dates: {
        start_date: activity?.matchplay_dates.start_date || 0,
        end_date: activity?.matchplay_dates.end_date || 0,
      },
      settings: {
        frequency: activity?.settings.frequency || '',
        time: activity?.settings.time || dayjs(new Date()).format('HH:mm:ss'),
        timezone: activity?.settings.timezone || '',
        day: activity?.settings.day || '',
      },
    },
    team: {
      min: activity?.team_settings?.min || 0,
      max: activity?.team_settings?.max || 0,
      players: activity?.team_settings?.players || 0,
    },
    entry_fee: {
      type: activity?.entry_fee?.type || 1,
      amount: activity?.entry_fee?.amount || 0,
    },
    location: {
      type: activity?.location?.type || 1,
      location: activity?.location?.location || '',
    },
  }
}

