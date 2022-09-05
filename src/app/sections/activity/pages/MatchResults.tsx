import React, {Dispatch, FC, SetStateAction} from 'react'
import {Match} from '../models/matches/Match'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {calculateTeamScore} from '../../../helpers/MCHelper'
import {Link, useNavigate, useParams} from 'react-router-dom'

type Props = {
  matches: Match[] | undefined
  setMatch: Dispatch<SetStateAction<Match | undefined>>
}

const MatchResults: FC<Props> = ({matches, setMatch}) => {
  const params = useParams()
  const navigate = useNavigate()

  const handleMatchClick = (match: Match, to: string) => {
    setMatch(match)
    navigate(to)
  }

  function closedMatches(element: Match) {
    return element.status === 3
  }

  return (
    <>
      <KTCard>
        <div className='card-header bg-info' id='activities_recent_matches_header'>
          <div className='card-title'>
            <h3 className='card-label text-white'>Recent Matches</h3>
          </div>
        </div>
        <KTCardBody className='py-5' id='activity_recent_matches_body'>
          <div
            className={'scroll-y me-n5 pe-5 h-300px h-lg-auto'}
            data-kt-element='matches'
            data-kt-scroll='true'
            data-kt-scroll-activate='{default: false, lg: true}'
            data-kt-scroll-max-height='300px'
            data-kt-scroll-dependencies={
              '#kt_header, #kt_toolbar, #kt_footer, #activities_recent_matches_header'
            }
            data-kt-scroll-wrappers={'#kt_content, #activity_recent_matches_body'}
            data-kt-scroll-offset={'-2px'}
          >
            <div className='d-flex flex-column'>
              {matches?.filter(closedMatches).map((match) => (
                <div
                  key={match.id}
                  className='nav-link text-active-primary me-6 cursor-pointer'
                  onClick={() =>
                    handleMatchClick(match, '/activities/' + params.id + '/matches/' + match?.id)
                  }
                >
                  <div className='d-flex flex-stack '>
                    {match?.teams && match?.teams[0] && (
                      <div className='flex-grow-1'>
                        <div className='d-flex justify-content-start flex-stack'>
                          <div className='symbol symbol-30px symbol-circle me-3'>
                            <img
                              alt={match?.teams[0].name + ' team image'}
                              src={match?.teams[0].image}
                            />
                          </div>
                          <div className='fs-6 fw-bold'>{match?.teams[0].name}</div>
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
                    {match?.teams && match?.teams[1] && (
                      <div className='flex-grow-1'>
                        <div className='d-flex flex-stack justify-content-end'>
                          <div className='fs-6 fw-bold'>{match?.teams[1].name}</div>
                          <div className='symbol symbol-30px symbol-circle ms-3'>
                            <img
                              alt={match?.teams[1].name + ' team image'}
                              src={match?.teams[1].image}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='separator my-3'></div>
                </div>
              ))}
            </div>
          </div>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export { MatchResults };