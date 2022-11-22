import { ID, Response } from "../../../_metronic/helpers";
import { Plan } from "./Plan";

export type Subscription = {
  id?: ID
  // user: User
  plan: Plan
  status: number
  ends_at: number
}

export type SubscriptionQueryResponse = Response<Array<Subscription>>
