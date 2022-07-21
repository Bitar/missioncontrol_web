import {ID, Response} from "../../../_metronic/helpers";
import {Game, initialGame} from "../game/Game";


export type Activity = {
    id?: ID,
    title: string,
    description: string,
    is_crossPlay?: boolean,
    game?: Game,
    status: number
}

export const initialActivity = {
    title: "",
    description: "",
    is_crossPlay: false,
    game: initialGame,
    status: 0
}

export type ActivityQueryResponse = Response<Array<Activity>>
