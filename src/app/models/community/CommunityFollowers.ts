import {ID, Response} from "../../../_metronic/helpers";
import { CommunityMeta } from "./CommunityMeta";

export type CommunityFollowers = {
    id?: ID,
    name: string,
    first_name:string,
    last_name:string,
    email:string,
    meta?:CommunityMeta
}

export type CommunityFollowersQueryResponse = Response<Array<CommunityFollowers>>