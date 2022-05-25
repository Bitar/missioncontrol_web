import axios, {AxiosResponse} from "axios";
import {Response} from "../../../../_metronic/helpers";
import {PaymentRequestIntent} from "../../../models/billing/PaymentRequest";
import {Plan} from "../../../models/billing/Plan";

const API_URL = process.env.REACT_APP_API_URL
const GET_PAYMENT_REQUEST_URL = `${API_URL}/payment/request`

const paymentRequest = (plan: Plan): Promise<PaymentRequestIntent | undefined> => {
    return axios
        .post(`${GET_PAYMENT_REQUEST_URL}`, {plan_id: plan.id})
        .then((response: AxiosResponse<Response<PaymentRequestIntent>>) => response.data)
        .then((response: Response<PaymentRequestIntent>) => response.data)
}

export {paymentRequest}