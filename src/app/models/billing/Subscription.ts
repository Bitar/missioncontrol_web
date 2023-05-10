import {Response} from '../../../_metronic/helpers'
import {Plan} from './Plan'

export type Subscription = {
  id?: number
  // user: User
  plan: Plan
  status: number
  ends_at: number
  notes: string
  is_stripe: false
}

export type SubscriptionQueryResponse = Response<Array<Subscription>>
