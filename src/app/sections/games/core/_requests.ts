import axios, {AxiosResponse} from 'axios'
import { GameQueryResponse } from '../../../models/game/Game';
// import process from "process";

const API_URL = process.env.REACT_APP_API_URL
// const API_URL = 'https://v3.staging.missioncontrol.gg/api-fe'
const GAMES_URL = `${API_URL}/games`

const getGames = (query: string): Promise<GameQueryResponse> => {
    return axios
        .get(`${GAMES_URL}?${query}`)
        .then((d: AxiosResponse<GameQueryResponse>) => d.data)
}

export {getGames, GAMES_URL}
