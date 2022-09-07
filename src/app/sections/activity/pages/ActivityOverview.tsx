import React, {Dispatch, FC, SetStateAction} from 'react'
import {Activity} from '../models/Activity'
import {ActivityStandings} from '../partials/ActivityStandings'
import {ActivityMatches} from './ActivityMatches'
import {Match} from '../models/matches/Match'
import {MatchResults} from './MatchResults'
import {ActivityAnnouncement} from '../partials/ActivityAnnouncement'
// import {ActivityAnnouncement} from '../partials/ActivityAnnouncement'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity | undefined>>
  matches: Match[] | undefined
  setMatch: Dispatch<SetStateAction<Match | undefined>>
}

const ActivityOverview: FC<Props> = ({activity, matches, setActivity, setMatch}) => {
  return (
    <>
      <div className='row g-5 g-xxl-8'>
        <div className='col-lg-6 col-md-12'>
          <div className='mb-5'>
            <ActivityStandings activity={activity} minimal={true}/>
          </div>
          <div>
            <ActivityAnnouncement activity={activity} setActivity={setActivity} />
          </div>
        </div>

        <div className='col-lg-6 col-md-12'>
          <div className='mb-5'>
            <ActivityMatches matches={matches} setMatch={setMatch} />
          </div>
          <div className='mt-5'>
            <MatchResults matches={matches} setMatch={setMatch}></MatchResults>
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
