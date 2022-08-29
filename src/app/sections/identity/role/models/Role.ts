import {ID, Response} from '../../../../../_metronic/helpers'
import * as Yup from 'yup'
import {Permission} from '../../permission/models/Permission'

export const roleSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
})

export type Role = {
  id?: ID
  name?: string,
  permissions: Permission[]
}

export const roleInitial = (role?: Role) => {
  return {
    name: role?.name || '',
    permissions: role?.permissions || []
  }
}

export type RolesQueryResponse = Response<Array<Role>>
