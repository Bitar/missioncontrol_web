import axios, {AxiosResponse} from 'axios'
import {User} from '../../iam/user/models/User'
import {Response} from '../../../helpers/crud-helper/models'
import {CommunityPermissionQueryResponse} from '../models/CommunityPermission'

const API_URL = process.env.REACT_APP_API_URL
const COMMUNITIES_URL = `${API_URL}/communities`

export const getCommunityPermissions = (
  id: any,
  query?: String
): Promise<CommunityPermissionQueryResponse> => {
  let url = `${COMMUNITIES_URL}/${id}/permission`

  if (query) {
    url += `?${query}`
  }

  return axios
    .get(url)
    .then((response: AxiosResponse<CommunityPermissionQueryResponse>) => response.data)
}

export const addCommunityPermissions = (id: any, formData: FormData): Promise<User | undefined> => {
  let url = `${COMMUNITIES_URL}/${id}/permission`

  return axios
    .post(`${url}`, formData)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}
