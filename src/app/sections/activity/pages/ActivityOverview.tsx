import React, {FC} from 'react'
import {ActivityStandings} from '../partials/ActivityStandings'
import {UpcomingMatches} from './UpcomingMatches'
import {RecentMatches} from './RecentMatches'
import {ActivityAnnouncement} from '../partials/ActivityAnnouncement'
import { ActivityDetails } from "./ActivityDetails";
// import {ActivityAnnouncement} from '../partials/ActivityAnnouncement'

const ActivityOverview: FC = () => {
  return (
    <>
      <div className='row g-5 g-xxl-8'>
        <div className='col-lg-6 col-md-12'>
          <div className="mb-5">
            <ActivityDetails/>
          </div>
          <div className='mb-5'>
            <ActivityStandings minimal={true} />
          </div>
          <div>
            <ActivityAnnouncement />
          </div>
        </div>

        {/*{matches && matches.length > 0 &&*/}
        <div className='col-lg-6 col-md-12'>
          <div className='mb-5'>
            <UpcomingMatches />
          </div>
          <div className='mt-5'>
            <RecentMatches />
          </div>
        </div>
        {/*}*/}
      </div>
    </>
  )
}

export {ActivityOverview}
