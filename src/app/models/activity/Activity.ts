import {ActivityFee} from './ActivityFee'
import {ActivityLocation} from './ActivityLocation'
import * as Yup from 'yup'
import {ActivityType} from './ActivityType'
import {ActivitySettings} from './ActivitySettings'
import {ActivityTeamSetting} from './AvtivityTeamSetting'
import {ActivityStanding} from './ActivityStanding'
import {ActivityRegistration} from './ActivityRegistration'
import {Team} from '../squad/Team'
import {Community} from '../community/Community'
import {Game} from '../game/Game'
import {GameMode} from '../game/GameMode'
import {Platform} from '../game/Platform'
import {Announcement} from '../announcement/Announcements'
import {Response} from '../../helpers/crud-helper/models'
import {ActivityPlayoff} from './ActivityForm'

export const activityDetailsSchema = Yup.object().shape({
  title: Yup.string().required('Activity title is required'),
})

export type Activity = {
  id?: number
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
  platforms?: Platform[]
  announcements?: Announcement[]
  entry_fee?: ActivityFee
  team_setting?: ActivityTeamSetting
  rules?: []
  standings?: ActivityStanding[]
  additional_data?: {
    teams_count: number
    players_count: number
    total_sessions: number
  }

  playoff?: ActivityPlayoff
}

export type ActivityQueryResponse = Response<Array<Activity>>
