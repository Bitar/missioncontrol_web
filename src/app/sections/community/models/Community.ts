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
}

export type CommunityQueryResponse = Response<Array<Community>>

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
      if (accessField !== 'key') {
        let updateStuff = {type: targetValue, key: 2}

        updateData(
          {
            access: {...community?.access, ...updateStuff},
          },
          setCommunity,
          community
        )
      }
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
