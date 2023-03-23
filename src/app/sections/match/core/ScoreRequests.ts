import axios, { AxiosResponse } from "axios";
import { NewMatch } from "../../../models/activity/matches/Match";
import { Response } from "../../../helpers/crud-helper/models";

const API_URL = process.env.REACT_APP_API_URL;
const MATCHES_URL = `${API_URL}/matches`;

export const updateScores = (id: any, formData: FormData): Promise<NewMatch | undefined> => {
  let url = `${MATCHES_URL}/${id}/scores`;

  return axios
    .post(url, formData)
    .then((response: AxiosResponse<Response<NewMatch>>) => response.data)
    .then((response: Response<NewMatch>) => response.data);
};
