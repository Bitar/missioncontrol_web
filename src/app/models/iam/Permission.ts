import {Response} from '../../helpers/crud-helper/models'
import * as Yup from 'yup'

export const permissionSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
})

export type Permission = {
  id: number
  name: string
}

export const permissionInitial = (permission?: Permission) => {
  return {
    id: permission?.id || 0,
    name: permission?.name || '',
  }
}

export type PermissionList = Response<Permission[]>
