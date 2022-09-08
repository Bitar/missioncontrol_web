import React, {FC} from 'react'
import {Activity} from '../models/Activity'
import {ActivityStandings} from '../partials/ActivityStandings'

type Props = {
  activity: Activity | undefined
}

const ActivityTeams: FC<Props> = ({activity}) => {
  return (
    <>
      <div className='mb-5'>
        <ActivityStandings activity={activity} />
      </div>
    </>
  )
}

export {ActivityTeams}
