import { GameMode } from "../../../models/game/GameMode";
import axios, { AxiosResponse } from "axios";
import {Response} from '../../../../_metronic/helpers'

const API_URL = process.env.REACT_APP_API_URL;
const GAMES_URL = `${API_URL}/games`;

export const updateGameMode = (gameId: any, gameModeId: any, formData: FormData): Promise<GameMode | undefined> => {
  let url = `${GAMES_URL}/${gameId}/modes/${gameModeId}`

  return axios
    .post(url, formData)
    .then((response: AxiosResponse<Response<GameMode>>) => response.data)
    .then((response: Response<GameMode>) => response.data)
};

export const createGameMode = (gameId: any, formData: FormData): Promise<GameMode | undefined> => {
  let url = `${GAMES_URL}/${gameId}/modes`

  return axios
    .post(url, formData)
    .then((response: AxiosResponse<Response<GameMode>>) => response.data)
    .then((response: Response<GameMode>) => response.data)
};