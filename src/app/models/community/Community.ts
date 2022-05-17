import {ID, Response} from "../../../_metronic/helpers";
import {CommunityAddress} from "./CommunityAddress";
import {CommunityContact} from "./CommunityContact";
import {CommunityAccess} from "./CommunityAccess";
import {Game} from "../game/Game";
import {CommunityData} from "./CommunityData";


export type Community = {
    id?: ID,
    name: string,
    logo: string,
    is_featured: boolean,
    description: string,
    address: CommunityAddress,
    contact: CommunityContact,
    access: CommunityAccess,
    games: Game[],
    data: CommunityData,
    is_follow: boolean
}

export type CommunityQueryResponse = Response<Array<Community>>

