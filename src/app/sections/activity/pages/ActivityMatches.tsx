import {MatchesTable} from '../partials/MatchesTable'
import React from 'react'
import {getRecentActivityMatches, getUpcomingActivityMatches} from '../core/requests/ActivityMatchRequests'
import {useParams} from 'react-router-dom'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import {QueryResponseProvider} from '../../../modules/table/QueryResponseProvider'
import {QUERIES} from '../../../helpers/crud-helper/consts'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'
import {useActivity} from '../core/contexts/ActivityContext'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'

const ActivityMatches = () => {
  const params = useParams()
  const {activity} = useActivity()

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-lg-6 col-md-12'>
        <div className='mb-5'>
          <KTCard>
            <div className='card-header bg-info'>
              <div className='card-title'>
                <h3 className='card-label text-white'>Upcoming Matches</h3>
              </div>
            </div>
            <KTCardBody className='scroll-y mh-800px'>
              {activity && (
                <QueryRequestProvider>
                  <QueryResponseProvider
                    id={QUERIES.UPCOMING_MATCH_LIST}
                    requestFunction={getUpcomingActivityMatches}
                    requestId={params?.id}
                  >
                    <ListViewProvider>
                      <MatchesTable title={'Upcoming Matches'} />
                    </ListViewProvider>
                  </QueryResponseProvider>
                </QueryRequestProvider>
              )}
            </KTCardBody>
          </KTCard>
        </div>
      </div>

      <div className='col-lg-6 col-md-12'>
        <div className='mb-5'>
          <KTCard>
            <div className='card-header bg-mc-secondary'>
              <div className='card-title'>
                <h3 className='card-label text-white'>Recent Matches</h3>
              </div>
            </div>
            <KTCardBody className='scroll-y mh-800px'>
              {activity && (
                <QueryRequestProvider>
                  <QueryResponseProvider
                    id={QUERIES.RECENT_MATCH_LIST}
                    requestFunction={getRecentActivityMatches}
                    requestId={params?.id}
                  >
                    <ListViewProvider>
                      <MatchesTable title={'Recent Matches'} />
                    </ListViewProvider>
                  </QueryResponseProvider>
                </QueryRequestProvider>
              )}
            </KTCardBody>
          </KTCard>
        </div>
      </div>
    </div>
  )
}

export {ActivityMatches}
