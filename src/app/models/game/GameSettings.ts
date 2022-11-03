import {ID} from '../../../_metronic/helpers'

export type GameSettings = {
  id?: ID
  setting: string
}

export const initGameSettings = () => {
  return {
    setting: ""
  }
}
