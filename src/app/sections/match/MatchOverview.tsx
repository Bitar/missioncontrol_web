import {KTCard, KTCardBody} from '../../../_metronic/helpers'
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
    if (key) {
      switch (key) {
        case 'Elimination':
          return 'fa-crosshairs'
        case 'Place':
          return 'fa-ranking-star'
        case 'Round':
          return 'fa-futbol'
        case 'Goal':
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

  // const getImages = (round: Round) => {
  //   let imagesIds: any = []
  //   let imagesShown: any = []
  //
  //   let teamAScoreImages = round?.scores[0]?.images
  //   let teamBScoreImages = round?.scores[1]?.images
  //
  //   teamAScoreImages?.forEach((image) => {
  //     if (imagesIds.indexOf(image.id) === -1) {
  //       imagesIds.push(image.id)
  //       imagesShown.push(image)
  //     }
  //   })
  //
  //   teamBScoreImages?.forEach((image) => {
  //     if (imagesIds.indexOf(image.id) === -1) {
  //       imagesIds.push(image.id)
  //       imagesShown.push(image)
  //     }
  //   })
  //
  //   return imagesShown
  // }

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
                      <div className='fs-6 ps-10'>
                        <div className='d-flex flex-stack text-center mb-3'>
                          <div className='flex-shrink-1'>
                            <span className='fs-1 text-black'>Round: {round.round}</span>
                          </div>
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

                          <div className='flex-grow-1'>
                            <div className='d-flex flex-stack'>
                              {getTeam(round.scores[0]?.team_id) && (
                                <div className='fs-1 text-mc-primary'>
                                  {round?.scores[0]?.score_sheet.map((scoreSheet, index) => (
                                    <div key={index}>{getScoringKey(scoreSheet, true)}</div>
                                  ))}
                                </div>
                              )}
                              {getTeam(round.scores[0]?.team_id) &&
                                getTeam(round.scores[1]?.team_id) && (
                                  <div className='fs-6 fw-semibold text-gray-600 px-5'>
                                    <p className='display-6 text-dark m-0'>-</p>
                                  </div>
                                )}
                              {getTeam(round.scores[1]?.team_id) && (
                                <div className='fs-1 text-mc-primary'>
                                  {round?.scores[1]?.score_sheet.map((scoreSheet, index) => (
                                    <div key={index}>{getScoringKey(scoreSheet)}</div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

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
                        <div className='images-container'>
                          {/*{getImages(round).map((image: any, index: any) => (*/}
                          {/*  <div*/}
                          {/*    key={`image-match-${match?.id}-round-${round.round}-image-${image.id}`}*/}
                          {/*    className='image-container d-inline-block'*/}
                          {/*  >*/}
                          {/*    <img src={image.image} className='mw-400px' alt='' />*/}
                          {/*  </div>*/}
                          {/*))}*/}
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
