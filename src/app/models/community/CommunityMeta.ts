import {ID, Response} from "../../../_metronic/helpers";


export type CommunityMeta = {
    id?: ID,
    image:string,
    username:string,
    rng:number,
    date_of_birth:string,
    city:string,
    state:string,
    gender:string,
}

export type CommunityMetaQueryResponse = Response<Array<CommunityMeta>>