import {Activity} from '../../../../models/activity/Activity'
import axios, {AxiosResponse} from 'axios'
import {Response} from '../../../../helpers/crud-helper/models'

const API_URL = process.env.REACT_APP_API_URL
const ACTIVITIES_SETTINGS_URL = `${API_URL}/activities`

export const updateDetails = (id: any, formData: FormData): Promise<Activity | undefined> => {
  let url = `${ACTIVITIES_SETTINGS_URL}/${id}/settings/details`

  return axios
    .post(url, formData)
    .then((response: AxiosResponse<Response<Activity>>) => response.data)
    .then((response: Response<Activity>) => response.data)
}

export const updateGame = (id: any, formData: FormData): Promise<Activity | undefined> => {
  let url = `${ACTIVITIES_SETTINGS_URL}/${id}/settings/game`

  return axios
    .post(url, formData)
    .then((response: AxiosResponse<Response<Activity>>) => response.data)
    .then((response: Response<Activity>) => response.data)
}

export const updateSchedule = (id: any, formData: FormData): Promise<Activity | undefined> => {
  let url = `${ACTIVITIES_SETTINGS_URL}/${id}/settings/schedule`

  return axios
    .post(url, formData)
    .then((response: AxiosResponse<Response<Activity>>) => response.data)
    .then((response: Response<Activity>) => response.data)
}
export const updatePlayoffs = (id: any, formData: FormData): Promise<Activity | undefined> => {
  let url = `${ACTIVITIES_SETTINGS_URL}/${id}/settings/playoffs`

  return axios
    .post(url, formData)
    .then((response: AxiosResponse<Response<Activity>>) => response.data)
    .then((response: Response<Activity>) => response.data)
}

export const updateTeam = (id: any, formData: FormData): Promise<Activity | undefined> => {
  let url = `${ACTIVITIES_SETTINGS_URL}/${id}/settings/team`

  return axios
    .post(url, formData)
    .then((response: AxiosResponse<Response<Activity>>) => response.data)
    .then((response: Response<Activity>) => response.data)
}

export const updateEntry = (id: any, formData: FormData): Promise<Activity | undefined> => {
  let url = `${ACTIVITIES_SETTINGS_URL}/${id}/settings/entry`

  return axios
    .post(url, formData)
    .then((response: AxiosResponse<Response<Activity>>) => response.data)
    .then((response: Response<Activity>) => response.data)
}

export const updateLocation = (id: any, formData: FormData): Promise<Activity | undefined> => {
  let url = `${ACTIVITIES_SETTINGS_URL}/${id}/settings/location`

  return axios
    .post(url, formData)
    .then((response: AxiosResponse<Response<Activity>>) => response.data)
    .then((response: Response<Activity>) => response.data)
}
