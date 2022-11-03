import axios, { AxiosResponse } from "axios";
import { StateQueryResponse } from "../../../models/misc/State";
import { CountryQueryResponse } from "../../../models/misc/Country";
import { TimeZoneCollection } from "../../../models/misc/TimeZone";
import { BillingPlanOptionQueryResponse } from "../../../models/billing/PlanOption";
import { ScoringTypeQueryResponse } from "../../../models/game/scoring/ScoringType";
import { ScoringKeyQueryResponse } from "../../../models/game/scoring/ScoringKey";

const API_URL = process.env.REACT_APP_API_URL;
const GET_MISC_URL = `${API_URL}/misc`;

export const getStates = (): Promise<StateQueryResponse> => {
  return axios.get(`${GET_MISC_URL}/states`).then((d: AxiosResponse<StateQueryResponse>) => d.data);
};

export const getCountries = (): Promise<CountryQueryResponse> => {
  return axios
    .get(`${GET_MISC_URL}/countries`)
    .then((d: AxiosResponse<CountryQueryResponse>) => d.data);
};
export const getTimeZones = (): Promise<TimeZoneCollection> => {
  return axios
    .get(`${GET_MISC_URL}/timezones`)
    .then((d: AxiosResponse<TimeZoneCollection>) => d.data);
};

export const getBillingPlanOptions = (): Promise<BillingPlanOptionQueryResponse> => {
  return axios
    .get(`${GET_MISC_URL}/billing-plan-options`)
    .then((d: AxiosResponse<BillingPlanOptionQueryResponse>) => d.data);
};

export const getScoringTypes = (): Promise<ScoringTypeQueryResponse> => {
  return axios
    .get(`${GET_MISC_URL}/scoring-types`)
    .then((d: AxiosResponse<ScoringTypeQueryResponse>) => d.data);
};

export const getScoringKeys = (): Promise<ScoringKeyQueryResponse> => {
  return axios
    .get(`${GET_MISC_URL}/scoring-keys`)
    .then((d: AxiosResponse<ScoringKeyQueryResponse>) => d.data);
};
