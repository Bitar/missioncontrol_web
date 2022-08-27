import axios, {AxiosResponse} from 'axios'
import {StateQueryResponse} from '../../../models/misc/State'
import {CountryQueryResponse} from '../../../models/misc/Country'
import {TimeZoneCollection} from "../../../models/misc/TimeZone";

const API_URL = process.env.REACT_APP_API_URL
const GET_MISC_URL = `${API_URL}/misc`

const getStates = (): Promise<StateQueryResponse> => {
  return axios.get(`${GET_MISC_URL}/states`).then((d: AxiosResponse<StateQueryResponse>) => d.data)
}

const getCountries = (): Promise<CountryQueryResponse> => {
  return axios
    .get(`${GET_MISC_URL}/countries`)
    .then((d: AxiosResponse<CountryQueryResponse>) => d.data)
}
const getTimeZones = (): Promise<TimeZoneCollection> => {
  return axios
    .get(`${GET_MISC_URL}/timezones`)
    .then((d: AxiosResponse<TimeZoneCollection>) => d.data)
}

export {getStates, getCountries, getTimeZones}
