import axios, {AxiosResponse} from 'axios'

import {Response} from "../../../../../_metronic/helpers";
import {Permission, PermissionQueryResponse} from "../../../../models/identity/Permission";

const API_URL = process.env.REACT_APP_API_URL
const GET_PERMISSIONS_URL = `${API_URL}/permissions`

const getPermissions = (query: string): Promise<PermissionQueryResponse> => {
    return axios
        .get(`${GET_PERMISSIONS_URL}?${query}`)
        .then((d: AxiosResponse<PermissionQueryResponse>) => d.data)
}

const getPermissionById = (id: any): Promise<Permission | undefined> => {
    return axios
        .get(`${GET_PERMISSIONS_URL}/${id}`)
        .then((response: AxiosResponse<Response<Permission>>) => response.data)
        .then((response: Response<Permission>) => response.data)
}

const createPermission = (permission: Permission): Promise<Permission | undefined> => {
    return axios
        .post(`${GET_PERMISSIONS_URL}`, permission)
        .then((response: AxiosResponse<Response<Permission>>) => response.data)
        .then((response: Response<Permission>) => response.data)
}

const updatePermission = (id: any, permission: Permission): Promise<Permission | undefined> => {
    return axios
        .put(`${GET_PERMISSIONS_URL}/${id}`, permission)
        .then((response: AxiosResponse<Response<Permission>>) => response.data)
        .then((response: Response<Permission>) => response.data)
}

export {getPermissions, getPermissionById, createPermission, updatePermission}
