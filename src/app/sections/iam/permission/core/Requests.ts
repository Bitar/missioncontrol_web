import axios, {AxiosError, AxiosResponse} from 'axios'

import {Response} from '../../../../../_metronic/helpers'
import {Permission, PermissionList} from '../../../../models/iam/Permission'

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/iam/permissions`

const getPermissions = (query: string): Promise<PermissionList> => {
  return axios.get(`${ENDPOINT}?${query}`).then((d: AxiosResponse<PermissionList>) => d.data)
}

const getPermissionById = (id: any): Promise<Permission | undefined> => {
  return axios
    .get(`${ENDPOINT}/${id}`)
    .then((response: AxiosResponse<Response<Permission>>) => response.data)
    .then((response: Response<Permission>) => response.data)
}

const createPermission = (permission: Permission): Promise<Permission | undefined> => {
  return axios
    .post(`${ENDPOINT}`, permission)
    .then((response: AxiosResponse<Response<Permission>>) => response.data)
    .then((response: Response<Permission>) => response.data)
}

const updatePermission = (id: any, permission: Permission): Promise<Permission | undefined> => {
  return axios
    .put(`${ENDPOINT}/${id}`, permission)
    .then((response: AxiosResponse<Response<Permission>>) => response.data)
    .then((response: Response<Permission>) => response.data)
}

const getAllPermissions = (): Promise<PermissionList | AxiosError | undefined> => {
  return axios
    .get(`${ENDPOINT}/all?sort[]=name`)
    .then((response: AxiosResponse<PermissionList>) => response.data)
    .catch((error) => {
      return error
    })
}

export {getPermissions, getPermissionById, createPermission, updatePermission, getAllPermissions}
