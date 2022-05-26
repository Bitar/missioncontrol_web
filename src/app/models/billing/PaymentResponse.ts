import {ID, Response} from "../../../_metronic/helpers";

export type PaymentResponse = {
    id?: ID,
    request_id: ID,
    status: number
}

export type PaymentResponseQueryResponse = Response<Array<PaymentResponse>>