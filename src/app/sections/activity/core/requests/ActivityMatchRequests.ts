import { MatchQueryResponse, NewMatch } from "../../../../models/activity/matches/Match";
import axios, { AxiosResponse } from "axios";
import { Response } from "../../../../helpers/crud-helper/models";

const API_URL = process.env.REACT_APP_API_URL;
const ACTIVITIES_URL = `${API_URL}/activities`;

export const getActivityMatches = (id: any, query?: string): Promise<MatchQueryResponse> => {
  let url = `${ACTIVITIES_URL}/${id}/matches`;

  if (query) {
    url += `?${query}`;
  }

  return axios.get(url).then((response: AxiosResponse<MatchQueryResponse>) => response.data);
};

export const getUpcomingActivityMatches = (
  id: any,
  query?: string
): Promise<MatchQueryResponse> => {
  let q = query + "&filter[status]=1,2";

  return getActivityMatches(id, q);
};

export const getRecentActivityMatches = (id: any, query?: string): Promise<MatchQueryResponse> => {
  let url = `${ACTIVITIES_URL}/${id}/matches/recent`;

  if (query) {
    url += `?${query}`;
  }

  return axios.get(url).then((response: AxiosResponse<MatchQueryResponse>) => response.data);
};

export const getDisputedActivityMatches = (
  id: any,
  query?: string
): Promise<MatchQueryResponse> => {
  let q = query + "&filter[status]=4,6,7";

  return getActivityMatches(id, q);
};

export const getActivityMatch = (id: any, matchId: any): Promise<NewMatch | undefined> => {
  let url = `${ACTIVITIES_URL}/${id}/matches/${matchId}`;

  return axios
    .get(url)
    .then((response: AxiosResponse<Response<NewMatch>>) => response.data)
    .then((response: Response<NewMatch>) => response.data);
};
