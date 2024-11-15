import React, {FC} from 'react'
import {ActivityStandings} from '../partials/ActivityStandings'
import {ActivityDetails} from './ActivityDetails'
import {QUERIES} from '../../../helpers/crud-helper/consts'
import {getActivityStandings} from '../core/requests/ActivityRequests'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import {useActivity} from '../core/contexts/ActivityContext'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'
import {QueryResponseProvider} from '../../../modules/table/QueryResponseProvider'

const ActivityOverview: FC = () => {
  const {activity} = useActivity()

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-lg-6 col-md-12'>
        <div className='mb-5'>
          <ActivityDetails />
        </div>
      </div>

      {activity?.type?.id !== 2 && (
        <div className='col-lg-6 col-md-12'>
          <div className='mb-5'>
            {activity && (
              <QueryRequestProvider>
                <QueryResponseProvider
                  id={QUERIES.STANDINGS_LIST}
                  requestFunction={getActivityStandings}
                  requestId={activity.id}>
                  <ListViewProvider>
                    <ActivityStandings scroll={true} />
                  </ListViewProvider>
                </QueryResponseProvider>
              </QueryRequestProvider>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export {ActivityOverview}
