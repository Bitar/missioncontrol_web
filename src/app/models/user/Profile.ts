import {User} from "./User";
import {Subscription} from "../billing/Subscription";

export type Profile = {
    user: User,
    subscription: Subscription
}