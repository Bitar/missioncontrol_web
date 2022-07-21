import axios, {AxiosResponse} from 'axios'
import {Response} from "../../../../../_metronic/helpers";
import {User, UserResponseQuery} from "../../../../models/identity/User";

const API_URL = process.env.REACT_APP_API_URL
const GET_ROLES_URL = `${API_URL}/users`

const getUsers = (query: string): Promise<UserResponseQuery> => {
    return axios
        .get(`${GET_ROLES_URL}?${query}`)
        .then((d: AxiosResponse<UserResponseQuery>) => d.data)
}

const getUserById = (id: any): Promise<User | undefined> => {
    return axios
        .get(`${GET_ROLES_URL}/${id}`)
        .then((response: AxiosResponse<Response<User>>) => response.data)
        .then((response: Response<User>) => response.data)
}

// const createRole = (role: Role): Promise<Role | undefined> => {
//     return axios
//         .post(`${GET_ROLES_URL}`, role)
//         .then((response: AxiosResponse<Response<Role>>) => response.data)
//         .then((response: Response<Role>) => response.data)
// }
//
// const updateRole = (id: any, role: Role): Promise<Role | undefined> => {
//     return axios
//         .put(`${GET_ROLES_URL}/${id}`, role)
//         .then((response: AxiosResponse<Response<Permission>>) => response.data)
//         .then((response: Response<Permission>) => response.data)
// }

export {getUsers, getUserById}
