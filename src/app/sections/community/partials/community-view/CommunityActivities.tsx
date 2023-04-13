import {
  QueryResponseProvider,
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {QUERIES} from '../../../../helpers/crud-helper/consts'
import {EXPORT_ENDPOINT, getCommunityActivities} from '../../core/CommunityRequests'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {KTCard, KTCardBody, KTCardHeader} from '../../../../helpers/components'
import {
  CreateCardAction,
  ExportCardAction,
  FilterCardAction,
} from '../../../../components/misc/CardAction'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import React, {useEffect, useMemo, useState} from 'react'
import {useCommunity} from '../../core/CommunityContext'
import {useMcApp} from '../../../../modules/general/McApp'
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator'
import {Sections} from '../../../../helpers/sections'
import {PageTypes} from '../../../../helpers/variables'
import {McTable} from '../../../../components/McTable'
import {ActivityColumns} from '../../../activity/core/columns/ActivityColumns'
import {ActivityFilter} from '../../../activity/partials/ActivityFilter'

const CommunityActivitiesTable = () => {
  const communityActivities = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => communityActivities, [communityActivities])
  const columns = useMemo(() => ActivityColumns, [])

  return (
    <McTable
      data={data}
      columns={columns}
      model={communityActivities.length > 0 ? communityActivities[0] : null}
      isLoading={isLoading}
    />
  )
}

const CommunityActivities = () => {
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
        id={QUERIES.COMMUNITIES_ACTIVITIES_LIST}
        requestFunction={getCommunityActivities}
        requestId={community?.id}>
        <ListViewProvider>
          <KTCard>
            <KTCardHeader
              text='Community Activities'
              icon='fa-regular fa-list'
              icon_style='fs-3 text-primary'
              actions={[
                new ExportCardAction(exportQuery, EXPORT_USERS_ENDPOINT),
                new FilterCardAction(
                  'communities-activities-list-filter',
                  showFilter,
                  setShowFilter
                ),
                new CreateCardAction('/activities', 'manage-activities'),
              ]}
            />
            <KTCardBody>
              <ActivityFilter showFilter={showFilter} setExportQuery={setExportQuery} />

              <CommunityActivitiesTable />
            </KTCardBody>
          </KTCard>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  ) : (
    <div></div>
  )
}

export default CommunityActivities
