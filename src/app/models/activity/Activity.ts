import {ID, Response} from "../../../_metronic/helpers";
import {Game, initialGame} from "../game/Game";
import {ActivityFee, initialActivityFee} from "./ActivityFee";
import {ActivityLocation, initialActivityLocation} from "./ActivityLocation";
import {ActivitySchedule, initialActivitySchedule} from "./ActivitySchedule";
import {Community, initialCommunity} from "../../sections/community/models/Community";


export const initialActivity: Activity = {
    title: "",
    description: "",
    status: 0,
    community: initialCommunity,
    game: initialGame,
    entry_fee: initialActivityFee,
    schedule: initialActivitySchedule,
    location: initialActivityLocation,

    registration_dates: {
        start_date: "",
        end_date: ""
    },
    matchplay_dates: {
        start_date: "",
        end_date: ""
    },
    rules: [],
    additional_data: {
        teams_count: 0,
        players_count: 0,
    }


    // team: initialActivityTeam,
    // prize: initialActivityPrize,
}


export type Activity = {
    id?: ID,
    title: string,
    description?: string,
    status: number,
    // team?: Team
    community?: Community,
    game?: Game,
    entry_fee?: ActivityFee
    schedule?: ActivitySchedule,
    // platforms?: Platform,
    location?: ActivityLocation,

    registration_dates: {
        start_date: string,
        end_date: string
    },
    matchplay_dates: {
        start_date: string,
        end_date: string
    },
    rules?: [],
    // standings: []
    additional_data?: {
        teams_count: number,
        players_count: number,
    }
}
export type ActivityQueryResponse = Response<Array<Activity>>
