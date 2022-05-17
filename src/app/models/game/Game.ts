import {ID, Response} from "../../../_metronic/helpers";
import {Platform} from "./Platform";

export type Game = {
    id?: ID,
    title: string,
    description: string,
    is_featured: boolean,
    is_crossplay: boolean,
    image: string,
    platforms: Platform[]
}

export type GameQueryResponse = Response<Array<Game>>