import React, {Dispatch, FC, SetStateAction} from 'react'
import {ActivityStandings} from '../partials/ActivityStandings'
import {UpcomingMatches} from './UpcomingMatches'
import {Match} from '../models/matches/Match'
import {RecentMatches} from './RecentMatches'
import {ActivityAnnouncement} from '../partials/ActivityAnnouncement'
import {useActivity} from '../AuthContext'
// import {ActivityAnnouncement} from '../partials/ActivityAnnouncement'

type Props = {
  setMatch: Dispatch<SetStateAction<Match | undefined>>
}

const ActivityOverview: FC<Props> = ({setMatch}) => {
  const {activity, setActivity, matches} = useActivity()
  return (
    <>
      <div className='row g-5 g-xxl-8'>
        <div className='col-lg-6 col-md-12'>
          <div className='mb-5'>
            <ActivityStandings activity={activity} minimal={true} />
          </div>
          <div>
            <ActivityAnnouncement activity={activity} setActivity={setActivity} />
          </div>
        </div>

        <div className='col-lg-6 col-md-12'>
          <div className='mb-5'>
            <UpcomingMatches matches={matches} setMatch={setMatch} />
          </div>
          <div className='mt-5'>
            <RecentMatches matches={matches} setMatch={setMatch}></RecentMatches>
          </div>
        </div>
        <div className='col-lg-6 col-md-12'>
          {/*<ActivityMatches activity={activity} setActivity={setActivity}/>*/}
        </div>
      </div>
    </>
  )
}

export {ActivityOverview}
