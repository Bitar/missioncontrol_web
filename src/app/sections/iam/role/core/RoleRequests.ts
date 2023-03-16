import axios, {AxiosError, AxiosResponse} from 'axios'
import {Response} from '../../../../../_metronic/helpers'
import {Role, RoleList} from '../../../../models/iam/Role'

const API_URL = process.env.REACT_APP_API_URL
const GET_ROLES_URL = `${API_URL}/iam/roles`

const getRoles = (query?: string): Promise<RoleList> => {
  let url = `${GET_ROLES_URL}`

  if (query) {
    url += `?${query}`
  }

  return axios.get(url).then((d: AxiosResponse<RoleList>) => d.data)
}

const getRole = (id: any): Promise<Role | AxiosError | undefined> => {
  return axios
    .get(`${GET_ROLES_URL}/${id}`)
    .then((response: AxiosResponse<Response<Role>>) => response.data)
    .then((response: Response<Role>) => response.data)
    .catch((error) => {
      return error
    })
}

const createRole = (formData: FormData): Promise<Role | AxiosError | undefined> => {
  return axios
    .post(`${GET_ROLES_URL}`, formData)
    .then((response: AxiosResponse<Response<Role>>) => response.data)
    .then((response: Response<Role>) => response.data)
    .catch((error) => {
      return error
    })
}

const updateRole = (id: any, formData: FormData): Promise<Role | undefined> => {
  return axios
    .post(`${GET_ROLES_URL}/${id}`, formData)
    .then((response: AxiosResponse<Response<Role>>) => response.data)
    .then((response: Response<Role>) => response.data)
}

export {getRoles, getRole, createRole, updateRole}
