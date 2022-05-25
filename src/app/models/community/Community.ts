import {ID, Response} from "../../../_metronic/helpers";
import {CommunityAddress} from "./CommunityAddress";
import {CommunityContact} from "./CommunityContact";
import {CommunityAccess} from "./CommunityAccess";
import {Game} from "../game/Game";

export const initialCommunity: Community = {
    name: '',
    logo: '',
    is_featured: false,
    description: '',
    is_follow: false
}

export type Community = {
    id?: ID,
    name: string,
    logo: string,
    is_featured: boolean,
    description: string,
    address?: CommunityAddress,
    contact?: CommunityContact,
    access?: CommunityAccess,
    games?: Game[],
    is_follow: boolean
}

export type CommunityQueryResponse = Response<Array<Community>>

