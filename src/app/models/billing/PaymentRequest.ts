import {ID, Response} from "../../../_metronic/helpers";

export type PaymentRequest = {
    id?: ID,
}

export type PaymentRequestIntent = {
    id: ID
    stripe_pi_secret: string,
    plan_id: ID,
    amount: number,
}

export type PaymentRequestQueryResponse = Response<Array<PaymentRequest>>