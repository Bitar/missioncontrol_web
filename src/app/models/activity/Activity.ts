import {ID, Response} from "../../../_metronic/helpers";
import { initialCheckoutModal } from "../../sections/billing/core/CheckoutModal";
import {Game, initialGame} from "../game/Game";
import { Platform } from "../game/Platform";
import { ActivityFee, initialActivityFee } from "./ActivityFee";
import { ActivityLocation, initialActivityLocation } from "./ActivityLocation";
import { ActivityPrize, initialActivityPrize } from "./ActivityPrize";
import { ActivitySchedule, initialActivitySchedule } from "./ActivitySchedule";
import { ActivityTeam, initialActivityTeam } from "./ActivityTeam";


export const initialActivity : Activity = {
    title: "",
    description: "",
    rounds:0,
    is_crossPlay: false,
    game: initialGame,
    location:initialActivityLocation,
    team:initialActivityTeam,
    entry_fee:initialActivityFee,
    schedule:initialActivitySchedule,
    prize:initialActivityPrize,
}


export type Activity = {
    id?: ID,
    community_id?: ID,
    game_id?: ID,
    title: string,
    description?: string,
    rounds?:number,
    platform_ids?:ID,
    is_crossPlay?: boolean,
    platforms?:Platform,
    game?: Game,
    location?:ActivityLocation,
    team?:ActivityTeam,
    entry_fee?: ActivityFee
    schedule?:ActivitySchedule,
    prize?:ActivityPrize
    
}
export type ActivityQueryResponse = Response<Array<Activity>>
