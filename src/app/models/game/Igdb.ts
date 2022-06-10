import {ID, Response} from "../../../_metronic/helpers";

export type Igdb = {
    id?:ID,
    title:string,
    image:string,
}

export type IgdbQueryResponse = Response<Array<Igdb>>