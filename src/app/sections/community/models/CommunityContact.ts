import {ID, Response} from '../../../../_metronic/helpers'

export type CommunityContact = {
  id?: ID
  community_id?: ID
  name: string
  email: string
  phone_number: string
  phone_number_alt?: string
}

export const initialCommunityContact = (contact?: CommunityContact) => {
  return {
    name: contact?.name || '',
    email: contact?.email || '',
    phone_number: contact?.phone_number || '',
  }
}

export type CommunityContactQueryResponse = Response<Array<CommunityContact>>
