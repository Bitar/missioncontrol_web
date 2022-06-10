import axios, {AxiosResponse} from 'axios'
import {Game, GameQueryResponse } from '../../../models/game/Game';
import { IgdbQueryResponse } from '../../../models/game/Igdb';
import { Response } from '../../../../_metronic/helpers';
// import process from "process";

const API_URL = process.env.REACT_APP_API_URL
const GET_GAMES_URL = `${API_URL}/games`

const getIgdb = (query: string , page:number): Promise<IgdbQueryResponse> => {
    return axios
         //igdb/search?filter[name]=war 
        .get(`${GET_GAMES_URL}/igdb/search?filter[name]=${query}&page=${page}`)
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

const createGame = (igdb_id: number ): Promise<Game | undefined> => {
    return axios
    .post(`${GET_GAMES_URL}`,{},{params: {igdb_id }})
    .then((response: AxiosResponse<Response<Game>>) => response.data)
    .then((response: Response<Game>) => response.data)
    
}

const updateGame = (id: any, game: Game): Promise<Game | undefined> => {
    return axios
        .put(`${GET_GAMES_URL}/${id}`, {"title":game.title,"description":game.description})
        .then((response: AxiosResponse<Response<Game>>) => response.data)
        .then((response: Response<Game>) => response.data)
}

export {getGames, getGameById, createGame , updateGame, getIgdb}