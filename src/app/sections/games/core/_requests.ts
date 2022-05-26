import axios, {AxiosResponse} from 'axios'
import {Response} from '../../../../_metronic/helpers';
import {Game, GameQueryResponse} from '../../../models/game/Game';

const API_URL = process.env.REACT_APP_API_URL
const GET_GAMES_URL = `${API_URL}/games`

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
const createGame = (game: Game): Promise<Game | undefined> => {
    return axios
        .post(`${GET_GAMES_URL}`, game)
        .then((response: AxiosResponse<Response<Game>>) => response.data)
        .then((response: Response<Game>) => response.data)
}

const updateGame = (id: any, game: Game): Promise<Game | undefined> => {
    return axios
        .put(`${GET_GAMES_URL}/${id}`, game)
        .then((response: AxiosResponse<Response<Game>>) => response.data)
        .then((response: Response<Game>) => response.data)
}
export {getGames, getGameById, createGame, updateGame}
