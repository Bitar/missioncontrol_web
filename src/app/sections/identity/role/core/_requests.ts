import axios, {AxiosResponse} from 'axios'
import {Response} from "../../../../../_metronic/helpers";
import {Role, RolesQueryResponse} from "../models/Role";

const API_URL = process.env.REACT_APP_API_URL
const GET_ROLES_URL = `${API_URL}/roles`

const getRoles = (query?: string): Promise<RolesQueryResponse> => {
    let url = `${GET_ROLES_URL}`;

    if (query) {
        url += `?${query}`
    }

    return axios
        .get(url)
        .then((d: AxiosResponse<RolesQueryResponse>) => d.data)
}

const getRoleById = (id: any): Promise<Role | undefined> => {
    return axios
        .get(`${GET_ROLES_URL}/${id}`)
        .then((response: AxiosResponse<Response<Role>>) => response.data)
        .then((response: Response<Role>) => response.data)
}

const createRole = (role: Role): Promise<Role | undefined> => {
    return axios
        .post(`${GET_ROLES_URL}`, role)
        .then((response: AxiosResponse<Response<Role>>) => response.data)
        .then((response: Response<Role>) => response.data)
}

const updateRole = (id: any, role: Role): Promise<Role | undefined> => {
    return axios
        .put(`${GET_ROLES_URL}/${id}`, role)
        .then((response: AxiosResponse<Response<Role>>) => response.data)
        .then((response: Response<Role>) => response.data)
}

export {getRoles, getRoleById, createRole, updateRole}
