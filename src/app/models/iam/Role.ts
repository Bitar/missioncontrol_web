import { Response } from "../../helpers/crud-helper/models";
import * as Yup from 'yup'
import {Permission} from './Permission'

export const roleSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
})

export type Role = {
  id?: number
  name: string
  permissions: Permission[]
  ready_to_submit: boolean
}

export const roleInitial = (role?: Role) => {
  return {
    name: role?.name || '',
    permissions: role?.permissions || [],
    ready_to_submit: false,
  }
}

export type RolesQueryResponse = Response<Array<Role>>
