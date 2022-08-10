import axios, {AxiosResponse} from 'axios'
import {ID, Response} from "../../../../../_metronic/helpers";
import {User, UserResponseQuery} from "../../../../models/identity/User";

const API_URL = process.env.REACT_APP_API_URL
const GET_USERS_URL = `${API_URL}/users`

const getUsers = (query: string): Promise<UserResponseQuery> => {
    return axios
        .get(`${GET_USERS_URL}?${query}`)
        .then((d: AxiosResponse<UserResponseQuery>) => d.data)
}

const getUserById = (id: any): Promise<User | undefined> => {
    return axios
        .get(`${GET_USERS_URL}/${id}`)
        .then((response: AxiosResponse<Response<User>>) => response.data)
        .then((response: Response<User>) => response.data)
}

const createUser = (user: User): Promise<User | undefined> => {
    return axios
        .post(`${GET_USERS_URL}`, user)
        .then((response: AxiosResponse<Response<User>>) => response.data)
        .then((response: Response<User>) => response.data)
}

const updateUser = (id: ID, user: User): Promise<User | undefined> => {
    console.log(id);
    return axios
        .put(`${GET_USERS_URL}/${id}`, user)
        .then((response: AxiosResponse<Response<User>>) => response.data)
        .then((response: Response<User>) => response.data)
}
//
// const updateRole = (id: any, role: Role): Promise<Role | undefined> => {
//     return axios
//         .put(`${GET_USERS_URL}/${id}`, role)
//         .then((response: AxiosResponse<Response<Permission>>) => response.data)
//         .then((response: Response<Permission>) => response.data)
// }

export {getUsers, getUserById, createUser, updateUser}
