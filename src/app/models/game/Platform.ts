import {ID, Response} from '../../../_metronic/helpers'

export type Platform = {
  id?: ID
  name: string
  abbreviation: string
  description: string
}

export const initialPlatform = (platform?: Platform) => {
  return {
    name: platform?.name || "",
    abbreviation: platform?.abbreviation || "",
    description: platform?.description || ""
  }
}

export type PlatformQueryResponse = Response<Array<Platform>>
