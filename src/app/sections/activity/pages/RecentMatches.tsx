import React, {FC, useEffect, useState} from 'react'
import {Match} from '../models/matches/Match'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {calculateTeamScore} from '../../../helpers/MCHelper'
import {useNavigate, useParams} from 'react-router-dom'
import {TeamImage} from '../components/TeamImage'
import {useActivity} from '../ActivityContext'
import { MatchRow } from "../components/MatchRow";

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
        <KTCardBody className='p-0 scroll-y mh-600px' id='activity_recent_matches_body'>
          <div className='d-flex flex-column'>
            {closedMatches && closedMatches?.length > 0 ? (
              matches?.filter(filterClosedMatches).map((match) => (
                <div
                  key={match.id}
                  className='nav-link text-active-primary cursor-pointer'
                  onClick={() =>
                    handleMatchClick(match, '/activities/' + params.id + '/matches/' + match?.id)
                  }
                >
                  <MatchRow match={match}/>
                  <div className='separator'></div>
                </div>
              ))
            ) : (
              <div className='p-6 d-flex text-center w-100 align-content-center justify-content-center'>
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
