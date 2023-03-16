import {Response} from '../../../_metronic/helpers'
import {CommunityAddress, initialCommunityAddress} from './CommunityAddress'
import {CommunityContact, initialCommunityContact} from './CommunityContact'
import {CommunityAccess, initialCommunityAccess} from './CommunityAccess'
import {Game} from '../game/Game'
import * as Yup from 'yup'
import {updateData} from '../../helpers/form/FormHelper'
import {Dispatch, SetStateAction} from 'react'
import {User} from '../../sections/iam/user/core/User'
import {Subscription} from '../billing/Subscription'

export const communityCreateWizardSchema = [
  Yup.object().shape({
    logo: Yup.mixed().required('Logo is required'),
    banner_image: Yup.mixed().required('Banner Image is required'),
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
  }),
  Yup.object().shape({
    contact: Yup.object().shape({
      name: Yup.string().required('Contact name is required'),
      email: Yup.string().email('Please enter a valid email').required('Contact email is required'),
      phone_number: Yup.string()
        .test('is-phone-number', 'Invalid phone number', (value) => value?.length === 12)
        .required('Contact phone number is required'),
    }),
  }),
  Yup.object().shape({
    address: Yup.object().shape({
      address_one: Yup.string().required('Address is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      postal_code: Yup.string().required('Postal Code is required'),
    }),
  }),
]

export const communitySchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
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
  id?: number
  name: string
  description?: string
  logo?: string
  status?: number
  banner_image?: string
  is_featured?: boolean

  is_owner?: boolean
  address?: CommunityAddress
  contact?: CommunityContact
  access?: CommunityAccess
  subscription?: Subscription
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

  dynamic_link?: string
}

export type CommunityQueryResponse = Response<Array<Community>>

export type CommunityFormType = {
  id?: number
  name: string
  description?: string
  status?: number | string
  logo?: string
  banner_image?: string
  is_featured?: boolean
  contact?: CommunityContact
  address?: {
    address_one: string
    address_two: string
    city: string
    state: string | number
    postal_code: string
  }
  access?: CommunityAccess
  plan_id?: string | number
  payment_term?: string | number
  subscription_id?: string | number
  payment_method?: string | number
}

export const initialCommunityFormTypeByCommunity = (community?: Community) => {
  return {
    name: community?.name || '',
    description: community?.description || '',
    contact: initialCommunityContact(community?.contact),
    is_featured: community?.is_featured || false,
    logo: community?.logo || '',
    status: community?.status || '',
    banner_image: community?.banner_image || '',
    address: {
      address_one: community?.address?.address_one || '',
      address_two: community?.address?.address_two || '',
      city: community?.address?.city || '',
      state: (community?.address?.state?.id && community?.address?.state?.id + '') || '',
      postal_code: community?.address?.postal_code || '',
    },
    access: initialCommunityAccess(community?.access),
    payment_term: 1,
    subscription_id: community?.subscription?.id || '',
    plan_id: (community?.subscription?.plan?.id && community?.subscription?.plan?.id + '') || '',
  }
}
export function formOnChange(
  event: any,
  community: Community | CommunityFormType | undefined,
  setCommunity: Dispatch<SetStateAction<Community>> | Dispatch<SetStateAction<CommunityFormType>>
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

    if (contact_field === 'phone_number') {
      updateData(
        {
          contact: {...community?.contact, ...{phone_number: targetValue.replace(/[ )(-]/g, '')}},
        },
        setCommunity,
        community
      )
    } else {
      updateData(
        {
          contact: {...community?.contact, ...{[contact_field]: targetValue}},
        },
        setCommunity,
        community
      )
    }
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
