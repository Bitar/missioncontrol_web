import {KTCard, KTCardBody, KTCardHeader} from '../../helpers/components'
import React, {FC} from 'react'
import {Match} from '../../models/activity/matches/Match'
import {ScoreSheet} from '../../models/activity/matches/ScoreSheet'
import {Round} from '../../models/activity/matches/Round'
import {TeamImage} from '../activity/components/TeamImage'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import {User} from '../../models/iam/User'
import {Activity} from '../../models/activity/Activity'

type Props = {
  activity: Activity | undefined
  match: Match | undefined
}

const MatchOverview: FC<Props> = ({match, activity}) => {
  const getScoringKeyIcon = (key?: string) => {
    if (key) {
      switch (key) {
        case 'Elimination':
        case 'Kill':
          return 'fa-crosshairs'
        case 'Place':
          return 'fa-ranking-star'
        case 'Round':
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

  const getUser = (userId: number) => {
    let userExist: User | undefined

    match?.teams?.forEach(function (element: any) {
      return element.users.forEach((e: any) => {
        if (e.id === userId) {
          userExist = e
        }
      })
    })

    return userExist
  }

  const getScoringKeyVisual = (scoringSheet: ScoreSheet, flip?: boolean) => {
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

  const getImages = (round: Round) => {
    let imagesIds: any = []
    let imagesShown: any = []
    let imageObject: any = []

    let teamAScoreImages = round?.scores[0]?.images
    let teamBScoreImages = round?.scores[1]?.images

    teamAScoreImages?.forEach((image) => {
      if (imagesIds.indexOf(image.id) === -1) {
        imagesIds.push(image.id)
        imagesShown.push(image)
        imageObject.push({
          image: image,
          team_id: round?.scores[0]?.team_id,
          user_id: round?.scores[0]?.user_id,
        })
      }
    })

    teamBScoreImages?.forEach((image) => {
      if (imagesIds.indexOf(image.id) === -1) {
        imagesIds.push(image.id)
        imagesShown.push(image)
        imageObject.push({
          image: image,
          team_id: round?.scores[1]?.team_id,
          user_id: round?.scores[1]?.user_id,
        })
      }
    })

    return imageObject
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
                    <React.Fragment key={round.round}>
                      <div className='py-1'>
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
                                      <div key={index}>{getScoringKeyVisual(scoreSheet, true)}</div>
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
                                      <div key={index}>{getScoringKeyVisual(scoreSheet)}</div>
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
                          <div className='score-images-container'>
                            <ul>
                              {getImages(round).map((image: any, index: any) => (
                                <li
                                  key={`score-image-list-item-${index}`}
                                  className='rounded score-image-item'
                                >
                                  <Zoom>
                                    <div
                                      aria-label='Score Screenshot'
                                      role='img'
                                      style={{
                                        backgroundColor: '#fff',
                                        backgroundImage: `url("${image.image.image}")`,
                                        backgroundPosition: '50%',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        height: '0',
                                        paddingBottom: '56%',
                                        width: '100%',
                                      }}
                                    />
                                  </Zoom>
                                  <div className='score-image-detail text-white fw-bold'>
                                    {getTeam(round?.scores[1]?.team_id) && (
                                      <>
                                        <span className='d-block'>
                                          User: {getUser(image?.user_id)?.name}
                                        </span>
                                        <span>
                                          Team: {getTeam(round?.scores[1]?.team_id)?.name}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  )
              )}
            </KTCardBody>
          </KTCard>
        </div>
      </div>
    </>
  )
}

export {MatchOverview}
