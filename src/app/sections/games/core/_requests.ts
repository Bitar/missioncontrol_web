import axios, {AxiosResponse} from 'axios'
import { GameQueryResponse } from '../../../models/game/Game';

const API_URL = process.env.REACT_APP_API_URL

const GAMES_URL = `${API_URL}/games`

const getGames = (query: string): Promise<GameQueryResponse> => {
    return axios
        .get(`${GAMES_URL}?${query}`)
        .then((d: AxiosResponse<GameQueryResponse>) => d.data)
}

export {getGames, GAMES_URL}
