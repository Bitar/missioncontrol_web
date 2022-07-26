import axios, {AxiosError, AxiosResponse} from 'axios'
import {Response} from '../../../../_metronic/helpers';
import {Community, CommunityQueryResponse } from "../../../models/community/Community";
import { CommunityFollowersQueryResponse,} from '../../../models/community/CommunityFollowers';
import {Simulate} from "react-dom/test-utils";
// import process from "process";

const API_URL = process.env.REACT_APP_API_URL
const GET_COMMUNITIES_URL = `${API_URL}/communities`

const getCommunities = (query: String): Promise<CommunityQueryResponse> => {
    return axios
        .get(`${GET_COMMUNITIES_URL}?${query}`)
        .then((response: AxiosResponse<CommunityQueryResponse>) => response.data)
}

const getCommunityById = (id: any, query : String | undefined): Promise<Community | undefined> => {
    return axios
        .get(`${GET_COMMUNITIES_URL}/${id}?${query}`)
        .then((response: AxiosResponse<Response<Community>>) => response.data)
        .then((response: Response<Community>) => response.data)
}

const createCommunity = (formData: FormData): Promise<Community | undefined | void> => {
    console.log(formData)
    return axios
        .post(`${GET_COMMUNITIES_URL}`, formData)
        .then((response: AxiosResponse<Response<Community>>) => response.data)
        .then((response: Response<Community>) => response.data)
}


const getCommunityFollowers = (id: any): Promise<CommunityFollowersQueryResponse> => {
    return axios
        .get(`${GET_COMMUNITIES_URL}/${id}/followers`)
        .then((response: AxiosResponse<CommunityFollowersQueryResponse>) => response.data)
}

export {getCommunities, getCommunityById, createCommunity,getCommunityFollowers}