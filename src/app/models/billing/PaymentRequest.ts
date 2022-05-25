import {ID, Response} from "../../../_metronic/helpers";

export type PaymentRequest = {
    id?: ID,
}

export type PaymentRequestIntent = {
    client_secret: string
}

export type PaymentRequestQueryResponse = Response<Array<PaymentRequest>>