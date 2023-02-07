import React, {FC} from 'react'
import {useActivity} from '../../activity/core/contexts/ActivityContext'
import {TextImageCell} from '../../../modules/table/columns/TextImageCell'
import {RoundScoreObject, ScoreObjectKey} from '../../activity/models/matches/Score'
import {useMatch} from '../core/MatchContext'
import {ErrorMessage, Field} from 'formik'

export const RoundBlock: FC<{roundIndex: number; round: RoundScoreObject}> = ({
  roundIndex,
  round,
}) => {
  const {activity} = useActivity()
  const {teams} = useMatch()

  const getScoringKeyVisual = (scoreObjectKey: ScoreObjectKey) => {
    const scoringKey = activity?.game_mode?.scoring_settings?.find((element: any) => {
      return element?.id === scoreObjectKey.key
    })

    return {
      key: scoringKey?.key,
      value: scoreObjectKey?.value,
    }
  }

  return (
    <div key={`round-block-inner-${roundIndex}`}>
      <div className='round-scores rounded border-warning border border-dashed p-6'>
        <h4 className='text-center'>Round {roundIndex}</h4>

        <div className='mt-6 d-flex justify-content-around'>
          {round?.scores?.map((scoreObject, teamScoreIndex) => {
            let team = teams?.find((team) => team?.id === scoreObject?.team_id)

            return (
              <React.Fragment key={`round-score-per-team-${teamScoreIndex}`}>
                <div>
                  <TextImageCell dImage={team?.image} dText={team?.name} size={'30'} />

                  <div>
                    {scoreObject?.keys?.map((scoreObjectKey, i) => {
                      const scoringKeyVisual = getScoringKeyVisual(scoreObjectKey)
                      console.log(scoringKeyVisual)
                      return (
                        <div className='row mb-6' key={`scoresheet-${i}`}>
                          <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                            {scoringKeyVisual?.key?.key}
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
                    {/*{score?.score_sheet.map((scoreSheet, i) => {*/}

                    {/*  return (*/}
                    {/*  )*/}
                    {/*})}*/}
                  </div>
                </div>
              </React.Fragment>
            )
          })}

          {/*{round?.scores.map((score, teamScoreIndex) => {*/}
          {/*  const team = match?.teams?.find((el) => el.id === score.team_id)*/}

          {/*  teamsAdded.push(score.team_id)*/}

          {/*  return (*/}
          {/*    <React.Fragment key={`round-score-per-team-${teamScoreIndex}`}>*/}
          {/*      <div>*/}
          {/*        <TextImageCell dImage={team?.image} dText={team?.name} size={'30'} />*/}

          {/*        <div>*/}
          {/*          {score?.score_sheet.map((scoreSheet, i) => {*/}
          {/*            const stuff = getScoringKeyVisual(scoreSheet)*/}

          {/*            return (*/}
          {/*              <div className='row mb-6' key={`scoresheet-${i}`}>*/}
          {/*                <label className='col-lg-4 col-form-label required fw-bold fs-6'>*/}
          {/*                  {stuff?.key?.key}*/}
          {/*                </label>*/}
          {/*                <div className='col-lg-8 fv-row'>*/}
          {/*                  <Field*/}
          {/*                    type='text'*/}
          {/*                    name={`rounds.${roundIndex}.scores.${teamScoreIndex}.keys.${i}.value`}*/}
          {/*                    className='form-control form-control-sm mb-3 mb-lg-0'*/}
          {/*                  />*/}

          {/*                  <div className='text-danger mt-2'>*/}
          {/*                    <ErrorMessage*/}
          {/*                      name={`rounds.[${roundIndex}].scores.[${teamScoreIndex}].keys.[${i}].value`}*/}
          {/*                    />*/}
          {/*                  </div>*/}
          {/*                </div>*/}
          {/*              </div>*/}
          {/*            )*/}
          {/*          })}*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </React.Fragment>*/}
          {/*  )*/}
          {/*})}*/}
          {/*{match?.teams*/}
          {/*  ?.filter((team) => !teamsAdded.includes(team?.id))*/}
          {/*  .map((team, teamScoreIndex) => {*/}
          {/*    return (*/}
          {/*      <EmptyScoresBlock*/}
          {/*        roundIndex={roundIndex}*/}
          {/*        team={team}*/}
          {/*        teamScoreIndex={1}*/}
          {/*        key={`round-empty-score-per-team-${teamScoreIndex}`}*/}
          {/*      />*/}
          {/*    )*/}
          {/*  })}*/}
        </div>
      </div>

      <div className='my-5'></div>
    </div>
  )
}
