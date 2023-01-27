import {QueryResponseProvider} from '../../../modules/table/QueryResponseProvider'
import {QUERIES} from '../../../helpers/crud-helper/consts'
import {getActivityMembers} from '../core/requests/ActivityRequests'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'
import {KTCard, KTCardBody} from '../../../helpers/components'
import {ActivityMembersFilter} from '../partials/ActivityMembersFilter'
import {ActivityMembers} from './ActivityMembers'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import React from 'react'
import {useActivity} from '../core/contexts/ActivityContext'

export const ActivityMembersSection = () => {
  const {activity} = useActivity()

  return activity ? (
    <QueryRequestProvider>
      <QueryResponseProvider
        id={QUERIES.ACTIVITIES_MEMBER_LIST}
        requestFunction={getActivityMembers}
        requestId={activity?.id}
      >
        <ListViewProvider>
          <KTCard>
            <KTCardBody>
              <ActivityMembersFilter />
              <ActivityMembers />
            </KTCardBody>
          </KTCard>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  ) : (
    <div></div>
  )
}
