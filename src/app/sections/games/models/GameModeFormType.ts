import { GameMode } from "../../../models/game/GameMode";
import { GameSettings } from "../../../models/game/GameSettings";

export type GameModeFormType = {
  name: string
  description: string
  scoring_type_id: string | number
  instructions: string
  min_players: number | string
  max_players: number | string
  game_time: number | string
  settings: GameSettings[]
  scoring_settings: any[]
}

export const initGameModeFormType = (gameMode?: GameMode) => {
  return {
    name: gameMode?.name || "",
    description: gameMode?.description || "",
    scoring_type_id: gameMode?.scoring_type?.id || "",
    instructions: gameMode?.instructions || "",
    min_players: gameMode?.min_players || "",
    max_players: gameMode?.max_players || "",
    game_time: gameMode?.game_time || "",
    settings: gameMode?.settings || [],
    scoring_settings: gameMode?.scoring_settings || []
  };
};