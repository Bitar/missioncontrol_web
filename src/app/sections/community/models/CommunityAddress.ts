import {ID, Response} from '../../../../_metronic/helpers'
import {initialState, State} from '../../../models/misc/State'
import {Country, initialCountry} from '../../../models/misc/Country'

export type CommunityAddress = {
  id?: ID
  community_id?: ID
  address_one: string
  address_two: string
  city: string
  state: State
  postal_code: string
  country: Country
}

export const initialCommunityAddress = (address?: CommunityAddress) => {
  return {
    address_one: address?.address_one || '246 Over There',
    address_two: address?.address_two || '',
    city: address?.city || 'Someplace',
    state: initialState(address?.state),
    postal_code: address?.postal_code || '12345',
    country: initialCountry(address?.country),
  }
}

export type CommunityAddressQueryResponse = Response<Array<CommunityAddress>>
