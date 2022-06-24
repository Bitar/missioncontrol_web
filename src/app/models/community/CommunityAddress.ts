import {ID, Response} from "../../../_metronic/helpers";


export type CommunityAddress = {
    id?: ID,
    community_id?: ID,
    address_one: string,
    address_two: string,
    city: string,
    state_province: string,
    postal_code: string,
    country_code: string,
}

export const initialCommunityAddress = {
    address_one: '',
    address_two: '',
    city: '',
    state_province: '',
    postal_code: '',
    country_code: '',
}

export type CommunityAddressQueryResponse = Response<Array<CommunityAddress>>

