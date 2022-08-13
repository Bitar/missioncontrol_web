import {ID, Response} from '../../../_metronic/helpers'


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

export const initialCommunityAddress = (address?: CommunityAddress) => {
    return {
        address_one: address?.address_one || '246 Over There',
        address_two: address?.address_two || '',
        city: address?.city || 'Someplace',
        state_province: address?.state_province || 'MA',
        postal_code: address?.postal_code || '12345',
        country_code: address?.country_code || 'US',
    }
}

export type CommunityAddressQueryResponse = Response<Array<CommunityAddress>>

