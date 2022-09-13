import React from 'react'
import {KTCard, QUERIES} from '../../../../_metronic/helpers'
import {TableHeader} from '../../../modules/table/TableHeader'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import {QueryResponseProvider} from '../../../modules/table/QueryResponseProvider'
import {getActivities} from '../core/ActivityRequests'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'
import {ActivityTable} from '../ActivityTable'

const ActivitiesList = () => {
  return (
    <>
      <KTCard>
        <TableHeader name='Activity' url='/activities' />
        <ActivityTable />
      </KTCard>
    </>
  )
}

const ActivityIndex = () => (
  <QueryRequestProvider>
    <QueryResponseProvider id={QUERIES.ACTIVITIES_LIST} requestFunction={getActivities}>
      <ListViewProvider>
        <ActivitiesList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export { ActivityIndex };
