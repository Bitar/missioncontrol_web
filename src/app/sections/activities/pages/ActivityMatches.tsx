import React, {FC, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {KTCard, KTCardBody, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Activity} from '../models/Activity'
import {Match} from '../models/matches/Match'
import {getActivityMatches} from '../core/ActivityRequests'
import {ActivityObject} from '../../identity/user/objects/activity/ActivityObject'

type Props = {
  activity: Activity | undefined
}

const ActivityMatches: FC<Props> = ({activity}) => {
  const [matches, setMatches] = useState<Match[] | undefined>([])
  const params = useParams()

  useEffect(() => {
    getActivityMatches(params.id).then((response) => {
      setMatches(response.data)
    })
  }, [params.id])

  const calculateTeamScore = (match: any, team: any) => {
    let totalScore = 0

    match?.rounds.map((round: any) => {
      let scores = round.scores

      scores.map((score: any) => {
        if (score.team_id === team.id) {
          totalScore += score.score
        }
      })
    })

    return totalScore
  }

  return (
    <>
      <KTCard className='bg-light'>
        <h3 className='fw-bold my-2'>Matches</h3>
        <KTCardBody className='py-4 px-0'>
          <div className='d-flex flex-column pt-5'>
            {matches?.map((match) => (
              <div className='row mb-5' key={match.id}>
                <div className='col-md-6 col-lg-4'>
                  {match?.teams && match?.teams[0] && (
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-50px me-3'>
                        <img src={match?.teams[0].image} className='' alt='' />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <span className='text-gray-800 fw-bold text-hover-primary mb-1 fs-6'>
                          {match?.teams[0].name}
                        </span>
                        <span className='text-gray-400 fw-semibold d-block fs-7'>
                          {match?.teams[0].users?.map((user, index) => (
                            <div
                              key={'potato-' + index}
                              className='symbol symbol-20px symbol-circle'
                              data-bs-toggle='tooltip'
                              title={user.name}
                            >
                              {user.meta?.image ? (
                                <img alt='Pic' src={toAbsoluteUrl(user.meta?.image)} />
                              ) : (
                                <img alt='Pic' src={toAbsoluteUrl('/media/avatars/blank.png')} />
                              )}
                            </div>
                          ))}
                        </span>
                      </div>
                      <div className='potato'>{calculateTeamScore(match, match?.teams[0])}</div>
                    </div>
                  )}
                </div>
                <div className='col-md-2'>VS</div>
                <div className='col-md-6'>
                  {match?.teams && match?.teams[1] && (
                    <div className='d-flex align-items-center text-end'>
                      <div className='potato'>{calculateTeamScore(match, match?.teams[1])}</div>
                      <div className='d-flex flex-column text-end'>
                        <span className='text-gray-800 fw-bold text-hover-primary mb-1 fs-6'>
                          {match?.teams[1].name}
                        </span>
                        <span className='text-gray-400 fw-semibold d-block fs-7'>
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
                                <img alt='Pic' src={toAbsoluteUrl('/media/avatars/blank.png')} />
                              )}
                            </div>
                          ))}
                        </span>
                      </div>
                      <div className='symbol symbol-50px me-3'>
                        <img src={match?.teams[1].image} className='' alt='' />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export { ActivityMatches };