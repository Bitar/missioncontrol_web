import {ID, Response} from "../../../_metronic/helpers";


export type CommunityAddress = {
    id?: ID,
    community_id: ID,
    address_one: string,
    address_two: string,
    city: string,
    state_province: string,
    postal_code: string,
    country_code: string,
}

export type CommunityAddressQueryResponse = Response<Array<CommunityAddress>>

