import React, {FC, useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {Match} from '../models/matches/Match'
import {getDateFromTimestamp, getTimeFromTimestamp} from '../../../helpers/MCHelper'
import {formatMatchStatus} from '../../../helpers/ActivityHelper'
import {TeamImage} from '../components/TeamImage'
import {useActivity} from '../ActivityContext'

// let matchesLoaded = false

const UpcomingMatches: FC = () => {
  const {matches, setMatch} = useActivity()
  const params = useParams()
  const navigate = useNavigate()
  const [openMatches, setOpenMatches] = useState<Match[] | undefined>()

  useEffect(() => {
    setOpenMatches(matches?.filter(filterOpenMatches))
  }, [matches])

  // const calculateTeamScore = (match: any, team: any) => {
  //   let totalScore = 0
  //
  //   match?.rounds.forEach((round: any) => {
  //     let scores = round.scores
  //
  //     scores.forEach((score: any) => {
  //       if (score.team_id === team.id) {
  //         totalScore += score.score
  //       }
  //     })
  //   })
  //
  //   return totalScore
  // }

  const handleMatchClick = (match: Match, to: string) => {
    setMatch(match)
    navigate(to)
  }

  function filterOpenMatches(element: Match) {
    return element.status !== 3
  }

  return (
    <>
      <KTCard>
        <div className='card-header bg-success' id='activities_matches_header'>
          <div className='card-title'>
            <h3 className='card-label text-white'>Upcoming Matches</h3>
          </div>
        </div>
        <KTCardBody className='py-5 scroll-y mh-600px' id='activity_matches_body'>
          <div className='d-flex flex-column'>
            {openMatches && openMatches?.length > 0 ? (
              openMatches?.map((match) => (
                <div
                  key={match.id}
                  className='nav-link text-active-primary me-6 cursor-pointer'
                  onClick={() =>
                    handleMatchClick(match, '/activities/' + params.id + '/matches/' + match?.id)
                  }
                >
                  <div className='d-flex flex-stack text-center'>
                    {match?.teams && match?.teams[0] ? (
                      <div className='flex-grow-1 mw-200px'>
                        <div className='d-inline-block'>
                          <TeamImage team={match?.teams[0]} className='mb-3' size='60px' />
                        </div>
                      </div>
                    ) : (
                      <div className='flex-grow-1 mw-200px'>
                        <div className='d-inline-block'>
                          <TeamImage className='mb-3' size='60px' />
                        </div>
                      </div>
                    )}
                    <div className='flex-shrink-1'>
                      <div className='fs-6 fw-semibold text-gray-600 px-5'>
                        <p className='m-0'>{getTimeFromTimestamp(match?.start_date)}</p>
                        <p className='m-0'>{getDateFromTimestamp(match?.start_date)}</p>
                        <p className='m-0 text-center'>
                          <span
                            className={'badge badge-' + formatMatchStatus(match?.status)['color']}
                          >
                            {formatMatchStatus(match?.status)['status']}
                          </span>
                        </p>
                      </div>
                    </div>
                    {match?.teams && match?.teams[1] ? (
                      <div className='flex-grow-1 mw-200px'>
                        <div className='d-inline-block'>
                          <TeamImage team={match?.teams[1]} className='mb-3' size='60px' />
                        </div>
                      </div>
                    ) : (
                      <div className='flex-grow-1 mw-200px'>
                        <div className='d-inline-block'>
                          <TeamImage className='mb-3' size='60px' />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='separator my-3'></div>
                </div>
              ))
            ) : (
              <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                <span className='text-gray-600 fw-bold'>Matches are not scheduled yet</span>
              </div>
            )}
          </div>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export {UpcomingMatches}
