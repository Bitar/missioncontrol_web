import {ID, Response} from "../../../_metronic/helpers";
import {CommunityAddress, initialCommunityAddress} from "./CommunityAddress";
import {CommunityContact, initialCommunityContact} from "./CommunityContact";
import {CommunityAccess, initialCommunityAccess} from "./CommunityAccess";
import {Game} from "../game/Game";

export const initialCommunity: Community = {
    name: '',
    logo: '',
    banner_image: '',
    is_featured: false,
    description: '',
    address: initialCommunityAddress,
    contact: initialCommunityContact,
    access: initialCommunityAccess,
    is_follow: false
}

export type Community = {
    id?: ID,
    name: string,
    logo?: string,
    banner_image?:string,
    is_featured?: boolean,
    description?: string,
    address?: CommunityAddress,
    contact?: CommunityContact,
    access?: CommunityAccess,
    games?: Game[],
    is_follow?: boolean
}

export type CommunityQueryResponse = Response<Array<Community>>

