import React, {FC} from 'react'
import {ActivityStandings} from '../partials/ActivityStandings'
import {ActivityAnnouncement} from '../partials/ActivityAnnouncement'
import {ActivityDetails} from './ActivityDetails'
import {QUERIES} from '../../../helpers/crud-helper/consts'
import {getActivityStandings} from '../core/ActivityRequests'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import {useActivity} from '../ActivityContext'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'
import {QueryResponseProvider} from '../../../modules/table/QueryResponseProvider'
// import {ActivityAnnouncement} from '../partials/ActivityAnnouncement'

const ActivityOverview: FC = () => {
  const {activity} = useActivity()

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-lg-6 col-md-12'>
        <div className='mb-5'>
          <ActivityDetails />
        </div>
      </div>

      <div className='col-lg-6 col-md-12'>
        <div className='mb-5'>
          {activity && (
            <QueryRequestProvider>
              <QueryResponseProvider
                id={QUERIES.STANDINGS_LIST}
                requestFunction={getActivityStandings}
                requestId={activity.id}
              >
                <ListViewProvider>
                  <ActivityStandings scroll={true} />
                </ListViewProvider>
              </QueryResponseProvider>
            </QueryRequestProvider>
          )}
        </div>
        <div className='mt-5'>
          <ActivityAnnouncement />
        </div>
      </div>
    </div>
  )
}

export {ActivityOverview}
