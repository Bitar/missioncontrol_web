import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL
// const API_URL = 'https://v3.staging.missioncontrol.gg/api-fe'
const MATCHES_URL = `${API_URL}/matches`

export const updateScores = (id: any, formData: FormData): Promise<any> =>  {
  let url = `${MATCHES_URL}/${id}/scores`

  return axios.post(url, formData)
    .then((response) => response.data)

}