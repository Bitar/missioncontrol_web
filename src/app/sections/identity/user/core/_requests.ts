import axios, {AxiosResponse} from 'axios'
import {Response} from "../../../../../_metronic/helpers";
import {User, UserQueryResponse} from "../../../../models/identity/User";
import {ActivityQueryResponse} from "../../../../models/activity/Activity";
import {TeamQueryResponse} from "../../../../models/squad/Team";

const API_URL = process.env.REACT_APP_API_URL
const GET_USERS_URL = `${API_URL}/users`

const getUsers = (query: string): Promise<UserQueryResponse> => {
    return axios
        .get(`${GET_USERS_URL}?${query}`)
        .then((d: AxiosResponse<UserQueryResponse>) => d.data)
}

const getUserById = (id: any, query?: string): Promise<User | undefined> => {
    let url = `${GET_USERS_URL}/${id}`;

    if (query) {
        url += `?${query}`
    }
    return axios
        .get(`${url}`)
        .then((response: AxiosResponse<Response<User>>) => response.data)
        .then((response: Response<User>) => response.data)
}

const createUser = (formData: FormData): Promise<User | undefined> => {
    return axios
        .post(`${GET_USERS_URL}`, formData)
        .then((response: AxiosResponse<Response<User>>) => response.data)
        .then((response: Response<User>) => response.data)
}

const updateUser = (id: any, formData: FormData): Promise<User | undefined> => {
    return axios
        .post(`${GET_USERS_URL}/${id}`, formData)
        .then((response: AxiosResponse<Response<User>>) => response.data)
        .then((response: Response<User>) => response.data)
}

const getUserActivities = (id: any, query?: string): Promise<ActivityQueryResponse> => {
    let url = `${GET_USERS_URL}/${id}/activities`;

    if (query) {
        url += `?${query}`
    }

    return axios
        .get(`${url}`)
        .then((d: AxiosResponse<ActivityQueryResponse>) => d.data)
}

const getUserTeams = (id: any, query?: string): Promise<TeamQueryResponse> => {
    let url = `${GET_USERS_URL}/${id}/teams`;

    if (query) {
        url += `?${query}`
    }

    return axios
        .get(`${url}`)
        .then((d: AxiosResponse<TeamQueryResponse>) => d.data)
}

export {getUsers, getUserById, createUser, updateUser, getUserActivities, getUserTeams}
