import {useMcApp} from '../../../modules/general/McApp'
import React, {useEffect, useState} from 'react'
import {generatePageTitle} from '../../../helpers/pageTitleGenerator'
import {Sections} from '../../../helpers/sections'
import {PageTypes} from '../../../helpers/variables'
import {QueryResponseProvider} from '../../../modules/table/QueryResponseProvider'
import {QUERIES} from '../../../helpers/crud-helper/consts'
import {EXPORT_ENDPOINT, getArchivedActivities} from '../core/requests/ActivityRequests'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'
import {KTCard, KTCardBody, KTCardHeader} from '../../../helpers/components'
import {ExportCardAction, FilterCardAction} from '../../../components/misc/CardAction'
import {ActivityFilter} from '../partials/ActivityFilter'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import ActivityTable from '../partials/ActivityTable'
// import { ActivityTable } from './ActivityIndex'

const ActivityArchive = () => {
  const mcApp = useMcApp()

  useEffect(() => {
    mcApp.setPageTitle(generatePageTitle(Sections.ACTIVITIES, PageTypes.INDEX))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [exportQuery, setExportQuery] = useState<string>('')
  const [showFilter, setShowFilter] = useState<boolean>(false)

  return (
    <QueryRequestProvider>
      <QueryResponseProvider id={QUERIES.ACTIVITIES_LIST} requestFunction={getArchivedActivities}>
        <ListViewProvider>
          <KTCard>
            <KTCardHeader
              text='Archived Activities'
              icon='fa-regular fa-list'
              icon_style='fs-3 text-primary'
              actions={[
                new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                new FilterCardAction('activities-archive-list-filter', showFilter, setShowFilter),
              ]}
            />
            <KTCardBody>
              <ActivityFilter
                showFilter={showFilter}
                setExportQuery={setExportQuery}
                targetFilter='activities-archive-list-filter'
              />

              <ActivityTable />
            </KTCardBody>
          </KTCard>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  )
}

export default ActivityArchive
