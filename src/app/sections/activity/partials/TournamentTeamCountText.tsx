import React, {FC} from 'react'
import {Badge} from 'react-bootstrap'

type Props = {
  teamCount: number
}

export const TournamentTeamCountText: FC<Props> = ({teamCount}) => {
  return (
    <>
      <Badge bg='warning' text='dark'>
        {isNaN(teamCount) || teamCount < 2 ? (
          <>At least 2 teams are needed.</>
        ) : (
          <>You need at least {Math.ceil(Math.log2(teamCount))} playable days of playoffs </>
        )}
      </Badge>{' '}
      The playoffs dates highly depends on the number of teams. <br />
      Make sure the number of teams is enough for the dates to generate enough matches for the whole
      tournament.
    </>
  )
}
