import React, {FC} from 'react'
import {Round} from '../../activity/models/matches/Round'
import {Match} from '../../activity/models/matches/Match'
import {useActivity} from '../../activity/core/contexts/ActivityContext'
import {ScoreSheet} from '../../activity/models/matches/ScoreSheet'
import {TextImageCell} from '../../../modules/table/columns/TextImageCell'
import { ErrorMessage, Field, useFormikContext } from "formik";
import {EmptyScoresBlock} from './EmptyScoresBlock'
import InputMask from "react-input-mask";

export const RoundBlock: FC<{roundIndex: number; round: Round; match: Match}> = ({
  roundIndex,
  round,
  match,
}) => {
  const {activity} = useActivity()
  const {setFieldValue} = useFormikContext()

  let teamsAdded: any[] = []

  const getScoringKeyVisual = (scoringSheet: ScoreSheet) => {
    const scoringKey = activity?.game_mode?.scoring_settings?.find(
      (element: any) => element.id === scoringSheet.score_settings_id
    )

    let returnValue: string
    if (scoringKey?.key.type === 1) {
      returnValue =
        scoringSheet.value *
          (scoringKey?.values?.find((e: any) => e.id === scoringSheet?.scoring_value_id)?.value ||
            0) +
        ''
    } else {
      returnValue =
        scoringKey?.values.find((e: any) => e.id === scoringSheet.scoring_value_id)?.key + ''
    }

    return {
      key: scoringKey?.key,
      value: returnValue,
    }
  }

  return (
    <div key={`round-block-inner-${roundIndex}`}>
      <div className='round-scores rounded border-warning border border-dashed p-6'>
        <h4 className='text-center'>Round {roundIndex + 1}</h4>

        <div className='mt-6 d-flex justify-content-around'>
          {round?.scores.map((score, teamScoreIndex) => {
            const team = match?.teams?.find((el) => el.id === score.team_id)

            teamsAdded.push(score.team_id)

            return (
              <React.Fragment key={`round-score-per-team-${teamScoreIndex}`}>
                <div>
                  <TextImageCell dImage={team?.image} dText={team?.name} size={'30'} />

                  <div>
                    {score?.score_sheet.map((scoreSheet, i) => {
                      const stuff = getScoringKeyVisual(scoreSheet)

                      return (
                        <div className='row mb-6' key={`scoresheet-${i}`}>
                          <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                            {stuff?.key?.key}
                          </label>
                          <div className='col-lg-8 fv-row'>

                            <Field
                              type='text'
                              name={`rounds.${roundIndex}.scores.${teamScoreIndex}.keys.${i}.value`}
                              className='form-control form-control-sm mb-3 mb-lg-0'
                            />

                            <div className='text-danger mt-2'>
                              <ErrorMessage
                                name={`rounds.[${roundIndex}].scores.[${teamScoreIndex}].keys.[${i}].value`}
                              />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </React.Fragment>
            )
          })}
          {match?.teams
            ?.filter((team) => !teamsAdded.includes(team?.id))
            .map((team, teamScoreIndex) => {
              return (
                <EmptyScoresBlock
                  roundIndex={roundIndex}
                  team={team}
                  teamScoreIndex={1}
                  key={`round-empty-score-per-team-${teamScoreIndex}`}
                />
              )
            })}
        </div>
      </div>

      <div className='my-5'></div>
    </div>
  )
}
