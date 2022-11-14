import {ID} from '../../../../_metronic/helpers'
import {ScoringKey} from './ScoringKey'
import {ScoringValues} from './ScoringValues'

export type ScoringSettings = {
  id?: ID
  key: ScoringKey
  values: ScoringValues[]
}

export type ScoringSettingForm = {
  scoring_key_id: number | string
  scoring_values: number | string
}

export const initScoringSetting = (scoringSetting?: any) => {
  return {
    scoring_key_id: scoringSetting?.scoring_key_id || '',
    scoring_values: scoringSetting?.scoring_values || '',
  }
}
