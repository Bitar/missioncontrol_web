import {ID, Response} from "../../../_metronic/helpers";


export type Activity = {
    id?: ID,
    name: string,
    is_crossPlay?: boolean
}

export const initialActivity = {
    name: "",
    is_crossPlay: false
}

export type ActivityQueryResponse = Response<Array<Activity>>
