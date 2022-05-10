import axios from 'axios'
import {AuthModel, UserModel} from './_models'
// import * as process from "process";

// const API_URL_DK = process.env.REACT_APP_API_URL
const API_URL = 'http://dashboard.missioncontrol.test/api-fe'

export const GET_USER_BY_PROFILE = `${API_URL}/profile`
export const LOGIN_URL = `${API_URL}/login`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    email,
    password,
  })
}

// Server should return AuthModel
export function register(
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {
  return axios.get<UserModel>(GET_USER_BY_PROFILE, {
    // return axios.get<UserModel>(GET_USER_BY_PROFILE, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    transformResponse: [function (data) {
      return JSON.parse(data).data;
    }],
  })
}