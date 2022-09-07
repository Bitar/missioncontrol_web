import React, {Dispatch, FC, SetStateAction} from 'react'
import {Activity} from '../models/Activity'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
// import {TeamCard} from '../partials/TeamCard'
import {TeamCard} from '../../../partials/team/TeamCard'
import {ActivityStandings} from '../partials/ActivityStandings'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity | undefined>>
}

const ActivityTeams: FC<Props> = ({activity, setActivity}) => {
  return (
    <>
      <div className='mb-5'>
        <ActivityStandings activity={activity} />
      </div>
    </>
  )
}

export {ActivityTeams}
