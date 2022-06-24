import {ID, Response} from "../../../_metronic/helpers";

export type State = {
    id?: ID,
    name: string,
    code: string
}

export type StateQueryResponse = Response<Array<State>>