import React, {FC, useEffect, useMemo, useState} from 'react'
import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {
  QueryResponseProvider,
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {EXPORT_ENDPOINT, getCommunityUsers} from '../../core/CommunityRequests'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {CommunityUsersColumns} from '../../core/CommunityUsersColumns'
import {useCommunity} from '../../core/CommunityContext'
import {CommunityUserFilters} from '../CommunityUserFilters'
import {KTCardHeader} from '../../../../helpers/components'
import {PageTypes} from '../../../../helpers/variables'
import {McTable} from '../../../../components/McTable'
import {ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction'
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator'
import {Sections} from '../../../../helpers/sections'
import {useMcApp} from '../../../../modules/general/McApp'

const CommunityUsersTable = () => {
  const communityUsers = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => communityUsers, [communityUsers])
  const columns = useMemo(() => CommunityUsersColumns, [])

  return (
    <McTable
      data={data}
      columns={columns}
      model={communityUsers.length > 0 ? communityUsers[0] : null}
      isLoading={isLoading}
    />
  )
}

const CommunityUsers: FC = () => {
  const {community} = useCommunity()
  const mcApp = useMcApp()
  const [exportQuery, setExportQuery] = useState<string>('')
  const [showFilter, setShowFilter] = useState<boolean>(false)

  useEffect(() => {
    mcApp.setPageTitle(generatePageTitle(Sections.COMMUNITIES, PageTypes.INDEX))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const EXPORT_USERS_ENDPOINT = EXPORT_ENDPOINT + '/' + community?.id + '/users'

  return community ? (
    <QueryRequestProvider>
      <QueryResponseProvider
        id={QUERIES.COMMUNITIES_USERS_LIST}
        requestFunction={getCommunityUsers}
        requestId={community?.id}>
        <ListViewProvider>
          <KTCard>
            <KTCardHeader
              text='Community Members'
              icon='fa-regular fa-list'
              icon_style='fs-3 text-primary'
              actions={[
                new ExportCardAction(exportQuery, EXPORT_USERS_ENDPOINT),
                new FilterCardAction('communities-users-list-filter', showFilter, setShowFilter),
              ]}
            />
            <KTCardBody>
              <CommunityUserFilters showFilter={showFilter} setExportQuery={setExportQuery} />

              <CommunityUsersTable />
            </KTCardBody>
          </KTCard>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  ) : (
    <div></div>
  )
}

export {CommunityUsers}
