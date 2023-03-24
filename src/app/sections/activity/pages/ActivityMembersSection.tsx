import {QueryResponseProvider} from '../../../modules/table/QueryResponseProvider'
import {QUERIES} from '../../../helpers/crud-helper/consts'
import {EXPORT_ENDPOINT, getActivityMembers} from '../core/requests/ActivityRequests'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'
import {KTCard, KTCardBody, KTCardHeader} from '../../../helpers/components'
import {ActivityMembersFilter} from '../partials/ActivityMembersFilter'
import {ActivityMembers} from './ActivityMembers'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import React, {useState} from 'react'
import {useActivity} from '../core/contexts/ActivityContext'
import {
  CreateCardAction,
  ExportCardAction,
  FilterCardAction,
} from '../../../components/misc/CardAction'
import {UserFilter} from '../../iam/user/partials/UserFilter'

export const ActivityMembersSection = () => {
  const {activity} = useActivity()

  const [exportQuery, setExportQuery] = useState<string>('')
  const [showFilter, setShowFilter] = useState<boolean>(false)

  const EXPORT_USERS_ENDPOINT = EXPORT_ENDPOINT + '/' + activity?.id + '/users'

  return activity ? (
    <QueryRequestProvider>
      <QueryResponseProvider
        id={QUERIES.ACTIVITIES_MEMBER_LIST}
        requestFunction={getActivityMembers}
        requestId={activity?.id}>
        <ListViewProvider>
          <KTCard>
            <KTCardHeader
              text='All Users'
              icon='fa-regular fa-list'
              icon_style='fs-3 text-primary'
              actions={[
                new ExportCardAction(exportQuery, EXPORT_USERS_ENDPOINT),
                new FilterCardAction('activity-users-list-filter', showFilter, setShowFilter),
              ]}
            />
            <KTCardBody>
              <ActivityMembersFilter setExportQuery={setExportQuery} showFilter={showFilter} />

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
