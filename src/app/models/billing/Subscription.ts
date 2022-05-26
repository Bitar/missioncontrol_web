import {ID, Response} from "../../../_metronic/helpers";
import {User} from "../user/User";
import {Plan} from "./Plan";

export type Subscription = {
    id?: ID,
    user: User,
    plan: Plan
}

export type SubscriptionQueryResponse = Response<Array<Subscription>>