import axios, {AxiosResponse} from 'axios'
import {DashboardStuff} from '../partials/SuperAdmin'
import {Response} from '../../../helpers/crud-helper/models'

const API_URL = process.env.REACT_APP_API_URL
const GET_HOME_URL = `${API_URL}/home`

export const getHome = (query?: string): Promise<DashboardStuff | undefined> => {
  return axios
    .get(`${GET_HOME_URL}`)
    .then((response: AxiosResponse<Response<DashboardStuff>>) => response.data)
    .then((response: Response<DashboardStuff>) => response.data)
}

export const getCommunityDashboard = (
  id: number,
  query?: string
): Promise<DashboardStuff | undefined> => {
  let url = `${API_URL}/communities/${id}/dashboard`

  return axios
    .get(url)
    .then((response: AxiosResponse<Response<DashboardStuff>>) => response.data)
    .then((response: Response<DashboardStuff>) => response.data)
}
