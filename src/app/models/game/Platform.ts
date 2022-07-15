import {ID, Response} from "../../../_metronic/helpers";

export type Platform = {
    id?: ID,
    name: string,
    abbreviation: string,
    description: string
}


export type PlatformQueryResponse = Response<Array<Platform>>