import { ID, Response } from "../../../_metronic/helpers";
import { Platform } from "./Platform";
import { GameMode } from "./GameMode";
import * as Yup from "yup";

export const gameSchema = Yup.object().shape({
  title: Yup.string().required("Name is required")
});

export type Game = {
  id?: ID
  title: string
  description?: string
  is_featured: boolean
  is_cross_play: boolean
  image: string
  platforms: Platform[]
  game_modes?: GameMode[]
}

export type GameQueryResponse = Response<Array<Game>>
