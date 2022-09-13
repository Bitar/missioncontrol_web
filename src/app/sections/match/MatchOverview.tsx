import {KTCard, KTCardBody, KTSVG} from '../../../_metronic/helpers'
import React, {FC} from 'react'
import {KTCardHeader} from '../../helpers/components/KTCardHeader'
import {Match} from '../activity/models/matches/Match'
import {Activity} from '../activity/models/Activity'
import {ScoreSheet} from '../activity/models/matches/ScoreSheet'
import {TeamImage} from '../activity/components/TeamImage'

type Props = {
  activity: Activity | undefined
  match: Match | undefined
}

const MatchOverview: FC<Props> = ({match, activity}) => {
  // const [teamAScore, setTeamAScore] = useState(0)
  // const [teamBScore, setTeamBScore] = useState(0)
  // const [teams, setTeams] = useState()

  const getScoringKeyIcon = (key?: string) => {
    console.log(key)
    if (key) {
      switch (key) {
        case 'Elimination':
          return 'fa-crosshairs'
        case 'Place':
          return 'fa-ranking-star'
        case 'Round':
          return 'fa-futbol'
        default:
          return key
      }
    }
  }

  const getTeam = (teamId: number) => {
    return match?.teams?.find(function (element: any) {
      return element.id === teamId
    })
  }

  const getScoringKey = (scoringSheet: ScoreSheet, flip?: boolean) => {
    const scoringKey = activity?.game_mode?.scoring_settings?.find(function (element: any) {
      return element.id === scoringSheet.score_settings_id
    })

    let returnValue = ''
    if (scoringKey?.key.type === 1) {
      returnValue =
        scoringSheet.value *
        (scoringKey?.values?.find((e: any) => e.id === scoringSheet?.scoring_value_id)?.value ||
          0) +
        ''
    } else {
      returnValue =
        scoringKey?.values.find((e: any) => e.id === scoringSheet.scoring_value_id)?.value + ''
    }

    let scoringKeyIcon = getScoringKeyIcon(scoringKey?.key.key)

    return !flip ? (
      scoringKeyIcon && (
        <div className='text-start'>
          <div className='w-90px'>
            <div
              className='w-30px d-inline-block text-center me-3'
              data-bs-toggle='tooltip'
              data-bs-placement='top'
              data-bs-trigger='hover'
              title={scoringKey?.key.key}
            >
              <i className={`fa ${scoringKeyIcon} fs-2 text-mc-secondary`}></i>
            </div>
            {returnValue}
          </div>
        </div>
      )
    ) : (
      <div className='text-end'>
        <div className='w-90px'>
          {returnValue}
          <div
            className='w-30px d-inline-block text-center ms-3'
            data-bs-toggle='tooltip'
            data-bs-placement='top'
            data-bs-trigger='hover'
            title={scoringKey?.key.key}
          >
            <i className={`fa ${scoringKeyIcon} fs-2 text-mc-secondary`}></i>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='row g-5 g-xxl-8'>
        <div className='col-lg-12 col-md-12' style={{marginBottom: '500px'}}>
          <KTCard>
            <KTCardHeader text={'Scores'} bg='mc-primary' text_color='white' />
            <KTCardBody>
              {match?.rounds.map(
                (round) =>
                  round?.scores.length > 0 && (
                    <div className='py-1' key={round.round}>
                      <div className='py-3 d-flex flex-stack flex-wrap'>
                        <div
                          className='d-flex align-items-center collapsible toggle'
                          data-bs-toggle='collapse'
                          data-bs-target={`#mc_match_${match?.id}_scores_round_${round.round}`}
                        >
                          <div className='btn btn-sm btn-icon btn-active-color-primary ms-n3 me-2'>
                            <KTSVG
                              path='/media/icons/duotune/gen036.svg'
                              className='svg-icon-2 svg-icon-primary toggle-off'
                            />
                            <KTSVG
                              path='/media/icons/duotune/gen035.svg'
                              className='svg-icon-2 toggle-on'
                            />
                          </div>
                          <div className='fs-4 text-dark fw-bold me-3'>Round {round.round}:</div>
                          <TeamImage team={getTeam(round?.scores[0]?.team_id)} className='me-3' />
                        </div>
                      </div>
                      <div
                        id={`mc_match_${match?.id}_scores_round_${round.round}`}
                        className='collapse fs-6 ps-10'
                      >
                        <div className='d-flex flex-stack text-center mb-3'>
                          {getTeam(round.scores[0]?.team_id) && (
                            <div className='flex-grow-1'>
                              <div className='d-inline-block'>
                                <TeamImage
                                  team={getTeam(round?.scores[0]?.team_id)}
                                  className='mb-3'
                                  size='60px'
                                />
                              </div>
                            </div>
                          )}

                          {getTeam(round.scores[0]?.team_id) && getTeam(round.scores[1]?.team_id) && (
                            <div className='flex-grow-1'>
                              <div className='d-flex flex-stack'>
                                <div className='fs-1 text-mc-primary'>
                                  {round?.scores[0]?.score_sheet.map((scoreSheet, index) => (
                                    <div key={index}>{getScoringKey(scoreSheet, true)}</div>
                                  ))}
                                </div>
                                <div className='fs-6 fw-semibold text-gray-600 px-5'>
                                  <p className='display-6 text-dark m-0'>-</p>
                                </div>
                                <div className='fs-1 text-mc-primary'>
                                  {round?.scores[1]?.score_sheet.map((scoreSheet, index) => (
                                    <div key={index}>{getScoringKey(scoreSheet)}</div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {getTeam(round.scores[1]?.team_id) && (
                            <div className='flex-grow-1'>
                              <div className='d-inline-block'>
                                <TeamImage
                                  team={getTeam(round?.scores[1]?.team_id)}
                                  className='mb-3'
                                  size='60px'
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
              )}
            </KTCardBody>
          </KTCard>
        </div>
      </div>
    </>
  )
}

export { MatchOverview };
