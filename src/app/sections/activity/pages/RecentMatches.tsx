import React, {FC, useEffect, useState} from 'react'
import {Match} from '../models/matches/Match'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {calculateTeamScore} from '../../../helpers/MCHelper'
import {useNavigate, useParams} from 'react-router-dom'
import {TeamImage} from '../components/TeamImage'
import {useActivity} from '../ActivityContext'

const RecentMatches: FC = () => {
  const {matches, setMatch} = useActivity()
  const params = useParams()
  const navigate = useNavigate()
  const [closedMatches, setClosedMatches] = useState<Match[] | undefined>()

  const handleMatchClick = (match: Match, to: string) => {
    setMatch(match)
    navigate(to)
  }

  function filterClosedMatches(element: Match) {
    return element.status === 3
  }

  useEffect(() => {
    setClosedMatches(matches?.filter(filterClosedMatches))
  }, [matches])

  return (
    <>
      <KTCard>
        <div className='card-header bg-mc-secondary' id='activities_recent_matches_header'>
          <div className='card-title'>
            <h3 className='card-label text-white'>Recent Matches</h3>
          </div>
        </div>
        <KTCardBody className='py-5 scroll-y mh-300px' id='activity_recent_matches_body'>
          <div className='d-flex flex-column'>
            {closedMatches && closedMatches?.length > 0 ? (
              matches?.filter(filterClosedMatches).map((match) => (
                <div
                  key={match.id}
                  className='nav-link text-active-primary me-6 cursor-pointer'
                  onClick={() =>
                    handleMatchClick(match, '/activities/' + params.id + '/matches/' + match?.id)
                  }
                >
                  <div className='d-flex flex-stack '>
                    {match?.teams && match?.teams[0] ? (
                      <div className='flex-grow-1 mw-200px'>
                        <div className='d-flex justify-content-start flex-stack'>
                          <TeamImage team={match?.teams[0]} className='me-3' />
                        </div>
                      </div>
                    ) : (
                      <div className='flex-grow-1 mw-200px'>
                        <div className='d-inline-block'>
                          <TeamImage className='mb-3' />
                        </div>
                      </div>
                    )}
                    {match?.teams && match?.teams[0] && match?.teams[1] && (
                      <div className='flex-grow-1'>
                        <div className='fs-6 fw-semibold text-gray-600 text-center'>
                          {calculateTeamScore(match, match?.teams[0])} -{' '}
                          {calculateTeamScore(match, match?.teams[1])}
                        </div>
                      </div>
                    )}
                    {match?.teams && match?.teams[1] ? (
                      <div className='flex-grow-1 mw-200px'>
                        <div className='d-flex flex-stack justify-content-end'>
                          <TeamImage team={match?.teams[1]} className='ms-3' textPosition='up' />
                        </div>
                      </div>
                    ) : (
                      <div className='flex-grow-1 mw-200px'>
                        <div className='text-end'>
                          <TeamImage textPosition='up' />
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

export {RecentMatches}
