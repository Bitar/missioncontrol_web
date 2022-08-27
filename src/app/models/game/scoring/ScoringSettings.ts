import { ID } from "../../../../_metronic/helpers";
import { ScoringKey } from "./ScoringKey";
import { ScoringValues } from "./ScoringValues";

export type ScoringSettings = {
  id?: ID
  key: ScoringKey,
  values: ScoringValues[]
}