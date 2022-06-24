import {ID, Response} from "../../../_metronic/helpers";


export type Activity = {
    id?: ID,
    title: string,
    is_crossPlay?: boolean
}

export const initialActivity = {
    title: "",
    is_crossPlay: false
}

export type ActivityQueryResponse = Response<Array<Activity>>
