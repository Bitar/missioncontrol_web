import {UpcomingMatches} from './UpcomingMatches'
import {RecentMatches} from './RecentMatches'
import React from 'react'

const ActivityMatches = () => {
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-lg-6 col-md-12'>
        <div className='mb-5'>
          <UpcomingMatches />
        </div>
      </div>

      <div className='col-lg-6 col-md-12'>
        <div className='mb-5'>
          <RecentMatches />
        </div>
      </div>
    </div>
  )
}

export {ActivityMatches}
