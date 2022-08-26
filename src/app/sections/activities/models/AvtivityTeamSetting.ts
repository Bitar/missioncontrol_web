import {ID} from "../../../../_metronic/helpers";

export type ActivityTeamSetting = {
    id?: ID,
    min: number,
    max: number,
    players: number,
}

export const initialActivityTeamSetting = (activityTeamSetting?: ActivityTeamSetting) => {
    return {
        min: 0,
        max: 0,
        players: 0
    }
}