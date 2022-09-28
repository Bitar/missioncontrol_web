import axios, {AxiosResponse} from 'axios'
import {Response} from '../../../../_metronic/helpers'
import {PaymentRequestIntent} from '../../../models/billing/PaymentRequest'
import {PaymentResponseWrapper} from '../../../models/billing/PaymentResponse'
import {Plan} from '../../../models/billing/Plan'
import {SubscriptionRequest} from '../../../models/billing/SubscriptionRequest'

const API_URL = process.env.REACT_APP_API_URL
const GET_PAYMENT_REQUEST_URL = `${API_URL}/payment/request`
const GET_PAYMENT_RESPONSE_URL = `${API_URL}/payment/response`
const GET_SUBSCRIPTION_BILLING_URL = `${API_URL}/plans`

const paymentRequest = (plan: Plan): Promise<PaymentRequestIntent | undefined> => {
  return axios
    .post(`${GET_PAYMENT_REQUEST_URL}`, {plan_id: plan.id})
    .then((response: AxiosResponse<Response<PaymentRequestIntent>>) => response.data)
    .then((response: Response<PaymentRequestIntent>) => response.data)
}

export const subscriptionRequest = (
  plan: Plan,
  paymentTerms: number = 1
): Promise<SubscriptionRequest | undefined> => {
  return axios
    .post(`${GET_SUBSCRIPTION_BILLING_URL}/${plan.id}/subscribe`, {payment_term: paymentTerms})
    .then((response: AxiosResponse<Response<SubscriptionRequest>>) => response.data)
    .then((response: Response<SubscriptionRequest>) => response.data)
}

const getPaymentResponse = (id: any): Promise<PaymentResponseWrapper | undefined> => {
  return axios
    .get(`${GET_PAYMENT_RESPONSE_URL}?payment_request_id=${id}`)
    .then((response: AxiosResponse<Response<PaymentResponseWrapper>>) => response.data)
    .then((response: Response<PaymentResponseWrapper>) => response.data)
}

export {paymentRequest, getPaymentResponse}
