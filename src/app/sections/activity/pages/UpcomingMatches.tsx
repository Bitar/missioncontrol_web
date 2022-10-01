import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { KTCard, KTCardBody } from "../../../../_metronic/helpers";
import { Match } from "../models/matches/Match";
import {useActivity} from '../ActivityContext'
import { MatchRow } from "../components/MatchRow";

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
        <KTCardBody className='p-0 scroll-y mh-600px' id='activity_matches_body'>
          <div className='d-flex flex-column'>
            {openMatches && openMatches?.length > 0 ? (
              openMatches?.map((match) => (
                <div
                  key={match.id}
                  className='nav-link text-active-primary cursor-pointer'
                  onClick={() =>
                    handleMatchClick(match, '/activities/' + params.id + '/matches/' + match?.id)
                  }
                >
                  <MatchRow match={match} upcoming={true}/>
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

export { UpcomingMatches };
