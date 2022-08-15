import { ID, Response } from "../../../_metronic/helpers";
import { Platform } from "./Platform";

export type Game = {
  id?: ID
  title: string
  description?: string
  is_featured: boolean
  is_cross_play: boolean
  image: string
  platforms: Platform[]
}

export const initialGame = (game?: Game) => {
  return {
    title: game?.title || "",
    is_cross_play: game?.is_cross_play || false,
    is_featured: game?.is_featured || false,
    description: game?.description || "",
    image: game?.image || "",
    platforms: []
  };
};

export type GameQueryResponse = Response<Array<Game>>
