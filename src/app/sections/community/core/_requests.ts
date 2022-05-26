import axios, {AxiosResponse} from 'axios'
import {Response} from '../../../../_metronic/helpers';
import {Community, CommunityQueryResponse} from "../../../models/community/Community";
// import process from "process";

const API_URL = process.env.REACT_APP_API_URL
const GET_COMMUNITIES_URL = `${API_URL}/communities`

const getCommunities = (query: String): Promise<CommunityQueryResponse> => {
    return axios
        .get(`${GET_COMMUNITIES_URL}?${query}`)
        .then((response: AxiosResponse<CommunityQueryResponse>) => response.data)
}

const getCommunityById = (id: any): Promise<Community | undefined> => {
    return axios
        .get(`${GET_COMMUNITIES_URL}/${id}`)
        .then((response: AxiosResponse<Response<Community>>) => response.data)
        .then((response: Response<Community>) => response.data)
}

const createCommunity = (community: Community): Promise<Community | undefined> => {
    return axios
        .post(`${GET_COMMUNITIES_URL}`, community)
        .then((response: AxiosResponse<Response<Community>>) => response.data)
        .then((response: Response<Community>) => response.data)
}

export {getCommunities, getCommunityById, createCommunity}