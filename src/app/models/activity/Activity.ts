import {ID, Response} from "../../../_metronic/helpers";


export type Activity = {
    id?: ID,
    name: string
}

export type ActivityQueryResponse = Response<Array<Activity>>

