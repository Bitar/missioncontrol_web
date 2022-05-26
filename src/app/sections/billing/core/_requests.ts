import axios, {AxiosResponse} from "axios";
import {Response} from "../../../../_metronic/helpers";
import {PaymentRequestIntent} from "../../../models/billing/PaymentRequest";
import {PaymentResponseWrapper} from "../../../models/billing/PaymentResponse";
import {Plan} from "../../../models/billing/Plan";

const API_URL = process.env.REACT_APP_API_URL
const GET_PAYMENT_REQUEST_URL = `${API_URL}/payment/request`
const GET_PAYMENT_RESPONSE_URL = `${API_URL}/payment/response`

const paymentRequest = (plan: Plan): Promise<PaymentRequestIntent | undefined> => {
    return axios
        .post(`${GET_PAYMENT_REQUEST_URL}`, {plan_id: plan.id})
        .then((response: AxiosResponse<Response<PaymentRequestIntent>>) => response.data)
        .then((response: Response<PaymentRequestIntent>) => response.data)
}

const getPaymentResponse = (id: any) : Promise<PaymentResponseWrapper | undefined> => {
    return axios
        .get(`${GET_PAYMENT_RESPONSE_URL}?payment_request_id=${id}`)
        .then((response: AxiosResponse<Response<PaymentResponseWrapper>>) => response.data)
        .then((response: Response<PaymentResponseWrapper>) => response.data)
}

export {paymentRequest, getPaymentResponse}