import React, {FC} from 'react'
import {ActivityStandings} from '../partials/ActivityStandings'
import {useActivity} from '../AuthContext'

const ActivityTeams: FC = () => {
  const {activity} = useActivity()

  return (
    <>
      <div className='mb-5'>
        <ActivityStandings activity={activity} />
      </div>
    </>
  )
}

export {ActivityTeams}
