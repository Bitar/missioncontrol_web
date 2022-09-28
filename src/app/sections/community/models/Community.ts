import {ID, Response} from '../../../../_metronic/helpers'
import {CommunityAddress, initialCommunityAddress} from './CommunityAddress'
import {CommunityContact, initialCommunityContact} from './CommunityContact'
import {CommunityAccess, initialCommunityAccess} from './CommunityAccess'
import {Game} from '../../../models/game/Game'
import * as Yup from 'yup'
import {updateData} from '../../../helpers/form/FormHelper'
import {Dispatch, SetStateAction} from 'react'
import {User} from '../../identity/user/models/User'

export const communitySchema = Yup.object().shape({
  name: Yup.string().required('Community name is required'),
  description: Yup.string().required('Community description is required'),
  contact: Yup.object().shape({
    name: Yup.string().required('Contact name is required'),
    email: Yup.string().email('Please enter a valid email').required('Contact email is required'),
    phone_number: Yup.string().required('Contact phone number is required'),
  }),
  address: Yup.object().shape({
    address_one: Yup.string().required('Contact address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    postal_code: Yup.string().required('Postal Code is required'),
  }),
})

export const initialCommunity = (community?: Community) => {
  return {
    name: community?.name || '',
    description: community?.description || '',
    logo: community?.logo || '',
    banner_image: community?.banner_image || '',
    address: initialCommunityAddress(community?.address),
    contact: initialCommunityContact(community?.contact),
    access: initialCommunityAccess(community?.access),
  }
}

export type Community = {
  id?: ID
  name: string
  description?: string
  logo?: string
  banner_image?: string
  is_featured?: boolean
  address?: CommunityAddress
  contact?: CommunityContact
  access?: CommunityAccess
  users?: User[]
  games?: Game[]
  is_follow?: boolean
  additional_data?: {
    activities_count: number
    activities_in_progress: number
    in_active_league: boolean
    open_registrations: number
    players_count: number
  }
}

export type CommunityQueryResponse = Response<Array<Community>>

export type CommunityForm = {
  id?: ID
  name: string
  description?: string
  logo?: string
  banner_image?: string
  is_featured?: boolean
}

export function formOnChange(
  event: any,
  community: Community | undefined,
  setCommunity: Dispatch<SetStateAction<Community>>
) {
  let targetName = event.target.name
  let targetValue = event.target.value

  if (targetName.includes('address.')) {
    let address_field = targetName.split('address.')[1]

    updateData(
      {
        address: {...community?.address, ...{[address_field]: targetValue}},
      },
      setCommunity,
      community
    )
  } else if (targetName.includes('contact.')) {
    let contact_field = targetName.split('contact.')[1]

    updateData(
      {
        contact: {...community?.contact, ...{[contact_field]: targetValue}},
      },
      setCommunity,
      community
    )
  } else if (targetName.includes('access.')) {
    let accessField = targetName.split('access.')[1]
    if (accessField === 'type' || accessField === 'key') {
      targetValue = +targetValue
    }

    if (accessField === 'type' && targetValue === 1) {
      updateData(
        {
          access: {type: targetValue},
        },
        setCommunity,
        community
      )
    } else {
      let updateStuff
      if (accessField !== 'value') {
        updateStuff = {type: 2, key: 2, value: ''}
      } else {
        updateStuff = {type: 2, key: 2, value: targetValue}
      }

      updateData(
        {
          access: {...community?.access, ...updateStuff},
        },
        setCommunity,
        community
      )
    }
  } else {
    if (targetName === 'logo' || targetName === 'banner_image') {
      targetValue = event.target.files[0]
    } else {
      targetValue = event.target.value
    }

    updateData({[targetName]: targetValue}, setCommunity, community)
  }
}
