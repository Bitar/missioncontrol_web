import {ID, Response} from '../../../_metronic/helpers'
import {Subscription} from './Subscription'

export type PaymentResponseWrapper = {
  status: number
  payment_response: PaymentResponse
  subscription: Subscription
}

export type PaymentResponse = {
  id?: ID
  request_id: ID
  status: number
}

export type PaymentResponseQueryResponse = Response<Array<PaymentResponse>>
