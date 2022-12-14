import { ID } from "../../../helpers/crud-helper/models";
import { ActivityLocation } from "./ActivityLocation";
import { ActivityTeamSetting } from "./AvtivityTeamSetting";
import { ActivityFee } from "./ActivityFee";
import { ActivityPrize } from "./ActivityPrize";
import dayjs from "dayjs";
import { Activity } from "./Activity";

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
      locate: activityForm?.location?.locate || '',
    },
  }
}

export const initialActivityFormByActivity = (activity?: Activity) => {
  return {
    type_id: activity?.type?.id || 1,
    title: activity?.title || "",
    description: activity?.description || "",
    community_id: activity?.community?.id || "",
    game_id: activity?.game?.id || "",
    game_mode_id: activity?.game_mode?.id || "",
    rounds: activity?.settings?.rounds || "",
    is_cross_play: activity?.settings?.is_cross_play || false,
    // platform_id: activity?.platform_id || '',
    // platform_ids: activity?.platform_ids || [],
    schedule: {
      registration_dates: {
        start_date: activity?.registration_dates.start_date || 0,
        end_date: activity?.registration_dates.end_date || 0
      },
      matchplay_dates: {
        start_date: activity?.matchplay_dates.start_date || 0,
        end_date: activity?.matchplay_dates.end_date || 0
      },
      settings: {
        frequency: activity?.settings.frequency || "",
        time: activity?.settings.time || dayjs(new Date()).format("HH:mm:ss"),
        timezone: activity?.settings.timezone_id || "",
        day: activity?.settings.day || ""
      }
    },
    team: {
      min: activity?.team_setting?.min || 0,
      max: activity?.team_setting?.max || 0,
      players: activity?.team_setting?.players || 0
    },
    entry_fee: {
      type: activity?.entry_fee?.type || 1,
      amount: activity?.entry_fee?.amount || 0
    },
    location: {
      type: activity?.location?.type || 1,
      locate: activity?.location?.locate || ""
    }
  };
};