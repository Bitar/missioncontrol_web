import {ID, Response} from '../../../_metronic/helpers'

export type CommunityContact = {
    id?: ID,
    community_id?: ID,
    name: string,
    email: string,
    phone_number: string,
    phone_number_alt?: string,
}

export const initialCommunityContact = (contact?: CommunityContact) => {
    return {
        name: contact?.name || 'Mr. Support',
        email: contact?.email || 'support@missioncontrol.gg',
        phone_number: contact?.phone_number || '1231231234',
    }
}

export type CommunityContactQueryResponse = Response<Array<CommunityContact>>
