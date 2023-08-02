import {Response} from '../../helpers/crud-helper/models'
import * as Yup from 'yup'
import {Role} from './Role'
import {UserMeta} from './UserMeta'
import {Dispatch, SetStateAction} from 'react'
import {updateData} from '../../helpers/form/FormHelper'
import {Community} from '../community/Community'
import {UserForm} from '../../sections/iam/user/core/UserForm'

export const UserDetailsSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email().required('Email is required'),
  role_ids: Yup.array()
    .min(1, 'At least 1 role is required')
    .required('At least 1 role is required'),
  community_ids: Yup.array().min(1),
  password: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  password_confirmation: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => val && val.length > 0,
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
  meta: Yup.object().shape({
    image: Yup.mixed().required('Image is required'),
  }),
})

export const UserEditSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email().required('Email is required'),
  // role_ids: Yup.array()
  //   .min(1, 'At least 1 role is required')
  //   .required('At least 1 role is required'),
  community_ids: Yup.array().min(1),
  password: Yup.string().min(8, 'Minimum 8 symbols').max(50, 'Maximum 50 symbols'),
  password_confirmation: Yup.string().when('password', {
    is: (val: string) => val && val.length > 0,
    then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
  }),
  meta: Yup.object().shape({
    image: Yup.mixed().required('Image is required'),
  }),
})

export type User = {
  id?: number
  first_name: string
  last_name: string
  name?: string
  is_verified: boolean
  email: string
  password?: string
  password_confirmation?: string
  created_at: number
  roles: Role[]
  meta?: UserMeta
  community_admin?: Community[]
}

export type UserQueryResponse = Response<Array<User>>

export function formOnChange(
  event: any,
  user: UserForm | undefined,
  setUser: Dispatch<SetStateAction<UserForm>>
) {
  let target_name = event.target.name

  if (target_name.includes('meta.')) {
    let meta_field = target_name.split('meta.')[1]
    let value

    if (meta_field === 'image') {
      value = event.target.files[0]
    } else {
      value = event.target.value
    }

    updateData(
      {
        meta: {...user?.meta, ...{[meta_field]: value}},
      },
      setUser,
      user
    )
  } else {
    updateData({[target_name]: event.target.value}, setUser, user)
  }
}

export const isCommunityAdmin = (user: User) => {
  return !!user.roles.find(function (role) {
    return role.id === 3
  })
}

export const isSuperAdmin = (user: User) => {
  return !!user.roles.find(function (role) {
    return role.id === 1 || role.id === 2
  })
}
