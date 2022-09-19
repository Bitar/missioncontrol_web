import React, {FC} from 'react'
import {ActivityStandings} from '../partials/ActivityStandings'
import {ActivityAnnouncement} from '../partials/ActivityAnnouncement'
import {ActivityDetails} from './ActivityDetails'
// import {ActivityAnnouncement} from '../partials/ActivityAnnouncement'

const ActivityOverview: FC = () => {
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-lg-6 col-md-12'>
        <div className='mb-5'>
          <ActivityDetails />
        </div>
      </div>

      <div className='col-lg-6 col-md-12'>
        <div className='mb-5'>
          <ActivityStandings minimal={true} scroll={true} />
        </div>
        <div className='mt-5'>
          <ActivityAnnouncement />
        </div>
      </div>
    </div>
  )
}

export {ActivityOverview}
