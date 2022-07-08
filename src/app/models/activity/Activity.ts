import {ID, Response} from "../../../_metronic/helpers";
import {Game, initialGame} from "../game/Game";
import { ActivityFee, initialActivityFee } from "./ActivityFee";
import { ActivityLocation, initialActivityLocation } from "./ActivityLocation";
import { ActivityTeam, initialActivityTeam } from "./ActivityTeam";


export const initialActivity : Activity = {
    title: "",
    description: "",
    rounds:"",
    is_crossPlay: false,
    platforms:"",
    game: initialGame,
    location:initialActivityLocation,
    team:initialActivityTeam,
    entry_fee:initialActivityFee,
}


export type Activity = {
    id?: ID,
    title: string,
    description?: string,
    rounds?:string,
    is_crossPlay?: boolean,
    platforms?:string,
    game?: Game,
    location?:ActivityLocation,
    team?:ActivityTeam,
    entry_fee?: ActivityFee
}
export type ActivityQueryResponse = Response<Array<Activity>>
