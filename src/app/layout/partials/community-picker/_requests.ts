import axios, {AxiosResponse} from 'axios'

import {Community, CommunityQueryResponse} from "../../../models/community/Community";
import {Response} from "../../../../_metronic/helpers";

const API_URL = process.env.REACT_APP_API_URL
const GET_ADMIN_COMMUNITIES_URL = `${API_URL}/admin/communities`
const GET_ACTIVE_ADMIN_COMMUNITIES_URL = `${API_URL}/admin/communities/active`

const getAdminCommunities = (): Promise<CommunityQueryResponse> => {
    return axios
        .get(`${GET_ADMIN_COMMUNITIES_URL}`)
        .then((d: AxiosResponse<CommunityQueryResponse>) => d.data)
}

const getActiveAdminCommunity = (): Promise<Community | undefined> => {
    return axios
        .get(`${GET_ACTIVE_ADMIN_COMMUNITIES_URL}`)
        .then((response: AxiosResponse<Response<Community>>) => response.data)
        .then((response: Response<Community>) => response.data)
}

const setAdminCommunities = (id: any): Promise<Community | undefined> => {
    return axios
        .post(`${GET_ADMIN_COMMUNITIES_URL}/${id}`)
        .then((response: AxiosResponse<Response<Community>>) => response.data)
        .then((response: Response<Community>) => response.data)
}

export {getAdminCommunities, setAdminCommunities, getActiveAdminCommunity}