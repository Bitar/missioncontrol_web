import {ID, Response} from "../../../_metronic/helpers";

export type ActivityTeam = {
    id?: ID,
    activity_id?:ID,
    players:number,
    min:number,
    max:number,
}

export const initialActivityTeam = {
    players:0,
    min:0,
    max:0,
}

export type ActivityTeamQueryResponse = Response<Array<ActivityTeam>>

