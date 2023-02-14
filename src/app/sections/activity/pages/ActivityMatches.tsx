import {MatchesTable} from '../partials/MatchesTable'
import React from 'react'
import {
  getDisputedActivityMatches,
  getRecentActivityMatches,
  getUpcomingActivityMatches,
} from '../core/requests/ActivityMatchRequests'
import {useParams} from 'react-router-dom'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import {QueryResponseProvider} from '../../../modules/table/QueryResponseProvider'
import {QUERIES} from '../../../helpers/crud-helper/consts'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'
import {KTCard, KTCardBody} from '../../../helpers/components'

const ActivityMatches = () => {
  const params = useParams()

  return (
    <div className='row g-5 g-xxl-8'>
      {/*<div className='col-lg-4 col-md-6'>*/}
      {/*  <div className='mb-5'>*/}
      {/*    <KTCard>*/}
      {/*      <div className='card-header bg-info'>*/}
      {/*        <div className='card-title'>*/}
      {/*          <h3 className='card-label text-white'>Upcoming Matches</h3>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <KTCardBody className='scroll-y mh-800px pt-3'>*/}
      {/*        <QueryRequestProvider>*/}
      {/*          <QueryResponseProvider*/}
      {/*            id={QUERIES.UPCOMING_MATCH_LIST}*/}
      {/*            requestFunction={getUpcomingActivityMatches}*/}
      {/*            requestId={params?.id}*/}
      {/*          >*/}
      {/*            <MatchesTable />*/}
      {/*          </QueryResponseProvider>*/}
      {/*        </QueryRequestProvider>*/}
      {/*      </KTCardBody>*/}
      {/*    </KTCard>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className='col-lg-4 col-md-6'>
        <div className='mb-5'>
          <KTCard>
            <div className='card-header bg-mc-secondary'>
              <div className='card-title'>
                <h3 className='card-label text-white'>Past Matches</h3>
              </div>
            </div>
            <KTCardBody className='scroll-y mh-800px pt-3'>
              <QueryRequestProvider>
                <QueryResponseProvider
                  id={QUERIES.PAST_MATCH_LIST}
                  requestFunction={getRecentActivityMatches}
                  requestId={params?.id}
                >
                  <MatchesTable />
                </QueryResponseProvider>
              </QueryRequestProvider>
            </KTCardBody>
          </KTCard>
        </div>
      </div>

      {/*<div className='col-lg-4 col-md-6'>*/}
      {/*  <div className='mb-5'>*/}
      {/*    <KTCard>*/}
      {/*      <div className='card-header bg-dark'>*/}
      {/*        <div className='card-title'>*/}
      {/*          <h3 className='card-label text-white'>Disputed Matches</h3>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <KTCardBody className='scroll-y mh-800px pt-3'>*/}
      {/*        <QueryRequestProvider>*/}
      {/*          <QueryResponseProvider*/}
      {/*            id={QUERIES.DISPUTED_MATCH_LIST}*/}
      {/*            requestFunction={getDisputedActivityMatches}*/}
      {/*            requestId={params?.id}*/}
      {/*          >*/}
      {/*            <ListViewProvider>*/}
      {/*              <MatchesTable />*/}
      {/*            </ListViewProvider>*/}
      {/*          </QueryResponseProvider>*/}
      {/*        </QueryRequestProvider>*/}
      {/*      </KTCardBody>*/}
      {/*    </KTCard>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  )
}

export {ActivityMatches}
