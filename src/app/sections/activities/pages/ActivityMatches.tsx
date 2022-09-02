import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {KTCard, KTCardBody, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Match} from '../models/matches/Match'
import {getActivityMatches} from '../core/ActivityRequests'
import {getDateFromTimestamp} from '../../../helpers/MCHelper'
import {Activity} from '../models/Activity'

let matchesLoaded = false

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity | undefined>>
}

const ActivityMatches: FC<Props> = ({activity, setActivity}) => {
  const [matches, setMatches] = useState<Match[] | undefined>([])
  const params = useParams()

  useEffect(() => {
    if (!matchesLoaded) {
      getActivityMatches(params.id).then((response) => {
        setMatches(response.data)
        matchesLoaded = true
        //TODO: Check this one
        // updateData(
        //   {
        //     matches: response.data,
        //   },
        //   setActivity,
        //   activity
        // )
      })
    }
  }, [params.id])

  const calculateTeamScore = (match: any, team: any) => {
    let totalScore = 0

    match?.rounds.forEach((round: any) => {
      let scores = round.scores

      scores.forEach((score: any) => {
        if (score.team_id === team.id) {
          totalScore += score.score
        }
      })
    })

    return totalScore
  }

  return (
    <>
      <KTCard>
        <div className='card-header'>
          <div className='card-title'>
            <h3 className='card-label'>Matches</h3>
          </div>
        </div>
        <KTCardBody className='py-4'>
          <div className='d-flex flex-column pt-5'>
            {matches?.map((match) => (
              <React.Fragment key={match.id}>
                <div className='row'>
                  <div className='col-md-6 col-lg-5'>
                    {match?.teams && match?.teams[0] && (
                      <div className='card card-dashed h-xl-100 flex-row flex-stack flex-wrap pe-6'>
                        <div className='d-flex flex-column'>
                          <div className='d-flex align-items-center'>
                            <img src={match?.teams[0].image} alt='' className='me-4' />
                            <div>
                              <div className='fs-4 fw-bold'>{match?.teams[0].name}</div>
                              <div className='fs-6 fw-semibold text-gray-400'>
                                {getDateFromTimestamp(match?.start_date)}
                              </div>
                              <div className='fs-6 fw-semibold text-gray-400'>
                                {match?.teams[1].users?.map((user, index) => (
                                  <div
                                    className='symbol symbol-20px symbol-circle'
                                    data-bs-toggle='tooltip'
                                    title={user.name}
                                    key={'something-' + index}
                                  >
                                    {user.meta?.image ? (
                                      <img alt='Pic' src={toAbsoluteUrl(user.meta?.image)} />
                                    ) : (
                                      <img
                                        alt='Pic'
                                        src={toAbsoluteUrl('/media/avatars/blank.png')}
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='d-flex align-items-center py-2'>
                          <div className='fs-4 fw-bold'>
                            {calculateTeamScore(match, match?.teams[1])}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='col-md-2'>
                    <div className='d-flex h-xl-100'>
                      <div className='d-flex align-items-center py-2'>
                        <div className='fs-4 fw-bold'>VS</div>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6 col-lg-5'>
                    {match?.teams && match?.teams[1] && (
                      <div className='card card-dashed h-xl-100 flex-row flex-stack flex-wrap ps-6'>
                        <div className='d-flex align-items-center py-2'>
                          <div className='fs-4 fw-bold'>
                            {calculateTeamScore(match, match?.teams[1])}
                          </div>
                        </div>
                        <div className='d-flex flex-column'>
                          <div className='d-flex align-items-center text-end'>
                            <div>
                              <div className='fs-4 fw-bold'>{match?.teams[1].name}</div>
                              <div className='fs-6 fw-semibold text-gray-400'>
                                {getDateFromTimestamp(match?.start_date)}
                              </div>
                              <div className='fs-6 fw-semibold text-gray-400'>
                                {match?.teams[1].users?.map((user, index) => (
                                  <div
                                    className='symbol symbol-20px symbol-circle'
                                    data-bs-toggle='tooltip'
                                    title={user.name}
                                    key={'something-' + index}
                                  >
                                    {user.meta?.image ? (
                                      <img alt='Pic' src={toAbsoluteUrl(user.meta?.image)} />
                                    ) : (
                                      <img
                                        alt='Pic'
                                        src={toAbsoluteUrl('/media/avatars/blank.png')}
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <img src={match?.teams[1].image} alt='' className='ms-4' />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className='separator separator-dashed my-6'></div>
              </React.Fragment>
            ))}
          </div>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export { ActivityMatches };