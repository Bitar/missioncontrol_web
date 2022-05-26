import {ID, Response} from "../../../_metronic/helpers";

export type Igdb = {
    id?:ID,
    name:string,
    cover:string,
}

export type IgdbQueryResponse = Response<Array<Igdb>>