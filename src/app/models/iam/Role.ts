import {Response} from '../../helpers/crud-helper/models'
import * as Yup from 'yup'
import {Permission} from './Permission'

export const roleSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  permissions: Yup.array()
    .of(Yup.number())
    .required()
    .min(1, 'You must select at least one permission.'),
})

export type Role = {
  id?: number
  name: string
  permissions: Permission[]
}

export const roleInitial = (role?: Role) => {
  return {
    name: role?.name || '',
    permissions: role?.permissions || [],
  }
}

export type RoleList = Response<Role[]>

export type RoleForm = {
  name: string
  permissions: number[]
}

export const roleFormInitial = {
  name: '',
  permissions: [],
}
