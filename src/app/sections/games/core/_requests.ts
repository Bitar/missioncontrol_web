import axios, {AxiosResponse} from 'axios'
import {Game, GameQueryResponse } from '../../../models/game/Game';
import { IgdbQueryResponse } from '../../../models/game/Igdb';
import { Response } from '../../../../_metronic/helpers';
// import process from "process";

const API_URL = process.env.REACT_APP_API_URL
// const API_URL = 'https://v3.staging.missioncontrol.gg/api-fe'
const GET_GAMES_URL = `${API_URL}/games`

const getIgdb = (query: string): Promise<IgdbQueryResponse> => {
    return axios
         //igdb/search?filter[name]=war
        .get(`${GET_GAMES_URL}/igdb/search?filter[name]=${query}`)
        .then((d: AxiosResponse<IgdbQueryResponse>) => d.data)
}

const getGames = (query: string): Promise<GameQueryResponse> => {
    return axios
        .get(`${GET_GAMES_URL}?${query}`)
        .then((d: AxiosResponse<GameQueryResponse>) => d.data)
}

const getGameById = (id: any): Promise<Game | undefined> => {
    return axios
        .get(`${GET_GAMES_URL}/${id}`)
        .then((response: AxiosResponse<Response<Game>>) => response.data)
        .then((response: Response<Game>) => response.data)
}

//we are sending the body key val as key:igdb_id
const createGame = (igdb_id: number): Promise<Game | undefined> => {
    return axios
    .post(`${GET_GAMES_URL}`,{},{params: {igdb_id}})
    .then((response: AxiosResponse<Response<Game>>) => response.data)
    .then((response: Response<Game>) => response.data)
}

const updateGame = (id: any , game: Game): Promise <Game | undefined> =>{
    return axios
    .put(`${GET_GAMES_URL}/${id}`, game)
    .then((response: AxiosResponse<Response<Game>>) => response.data)
    .then((response: Response<Game>) => response.data)
}


export {getGames, getGameById, createGame , updateGame, getIgdb}
