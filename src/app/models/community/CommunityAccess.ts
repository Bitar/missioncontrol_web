import {ID, Response} from "../../../_metronic/helpers";
import {CommunityQueryResponse} from "./Community";

export type CommunityAccess = {
    id?: ID,
    community_id?: ID,
    type: number,
    key: number,
    value: string
}

export const initialCommunityAccess = {
    type: 0,
    key: 0,
    value: ''
}

export type CommunityAccessQueryResponse = Response<Array<CommunityQueryResponse>>