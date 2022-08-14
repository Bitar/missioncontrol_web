import {User} from "../../sections/identity/user/models/User";
import {Subscription} from "../billing/Subscription";

export type Profile = {
    user: User,
    subscription: Subscription
}