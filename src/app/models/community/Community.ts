import {ID, Response} from '../../../_metronic/helpers'
import {CommunityAddress, initialCommunityAddress} from './CommunityAddress'
import {CommunityContact, initialCommunityContact} from './CommunityContact'
import { CommunityAccess, initialCommunityAccess } from "./CommunityAccess";
import {Game} from '../game/Game'
import * as Yup from 'yup'

export const communitySchema = Yup.object().shape({
    name: Yup.string().required('Community name is required'),
    // description: Yup.string().required('Community description is required'),
    contact: Yup.object().shape({
        name: Yup.string().required('Contact name is required'),
        email: Yup.string().email('Please enter a valid email').required('Contact email is required'),
        phone_number: Yup.string().required('Contact phone number is required'),
    }),
    address: Yup.object().shape({
        address_one: Yup.string().required('Contact address is required'),
        // address_two: Yup.string(),
        city: Yup.string().required('City is required'),
        // state_province: Yup.string().required('State Province is required'),
        postal_code: Yup.string().required('Postal Code is required'),
        // country_code: Yup.string().required('Country Code is required'),

    }),
})

export const initialCommunity = (community?: Community) => {
    return {
        name: community?.name || 'AB Community',
        logo: community?.logo || '',
        banner_image: community?.banner_image || '',
        address: community?.address || initialCommunityAddress(),
        contact: community?.contact || initialCommunityContact(),
        access: community?.access || initialCommunityAccess(),
    }
}

export type Community = {
    id?: ID,
    name: string,
    logo?: string,
    banner_image?: string,
    is_featured?: boolean,
    description?: string,
    address?: CommunityAddress,
    contact?: CommunityContact,
    access?: CommunityAccess,
    games?: Game[],
    is_follow?: boolean
}

export type CommunityQueryResponse = Response<Array<Community>>

