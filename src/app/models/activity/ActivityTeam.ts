import {ID, Response} from "../../../_metronic/helpers";

export type ActivityTeam = {
    id?: ID,
    activity_id?:ID,
    players:string,
    min:string,
    max:string,
}

export const initialActivityTeam = {
    players:'',
    min:'',
    max:'',
}

export type ActivityTeamQueryResponse = Response<Array<ActivityTeam>>

