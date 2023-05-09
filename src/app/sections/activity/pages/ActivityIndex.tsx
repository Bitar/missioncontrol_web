import React, {useEffect, useMemo, useState} from 'react'
import {KTCard, KTCardBody, QUERIES} from '../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import {
  QueryResponseProvider,
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../modules/table/QueryResponseProvider'
import {EXPORT_ENDPOINT, getActivities} from '../core/requests/ActivityRequests'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'
import {ActivityFilter} from '../partials/ActivityFilter'
import {PageTypes} from '../../../helpers/variables'
import {KTCardHeader} from '../../../helpers/components'
import {
  CreateCardAction,
  ExportCardAction,
  FilterCardAction,
} from '../../../components/misc/CardAction'
import {useMcApp} from '../../../modules/general/McApp'
import {generatePageTitle} from '../../../helpers/pageTitleGenerator'
import {Sections} from '../../../helpers/sections'
import {ActivityColumns} from '../core/columns/ActivityColumns'
import {McTable} from '../../../components/McTable'
import {Link} from 'react-router-dom'
import ActivityTable from '../partials/ActivityTable'

const ActivityIndex = () => {
  const mcApp = useMcApp()

  useEffect(() => {
    mcApp.setPageTitle(generatePageTitle(Sections.ACTIVITIES, PageTypes.INDEX))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [exportQuery, setExportQuery] = useState<string>('')
  const [showFilter, setShowFilter] = useState<boolean>(false)

  return (
    <>
      <QueryRequestProvider>
        <QueryResponseProvider id={QUERIES.ACTIVITIES_LIST} requestFunction={getActivities}>
          <ListViewProvider>
            <KTCard>
              <KTCardHeader
                text='All Activities'
                icon='fa-regular fa-list'
                icon_style='fs-3 text-primary'
                actions={[
                  new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                  new FilterCardAction('activities-list-filter', showFilter, setShowFilter),
                  new CreateCardAction('/activities', 'manage-activities'),
                ]}
              />
              <KTCardBody>
                <ActivityFilter showFilter={showFilter} setExportQuery={setExportQuery} />

                <ActivityTable />
              </KTCardBody>
            </KTCard>
          </ListViewProvider>
        </QueryResponseProvider>
      </QueryRequestProvider>

      <KTCard className='text-white bg-mc-primary mt-5'>
        <KTCardBody>
          <div
            style={{
              backgroundImage: 'url(/media/avatars/AstroPlay.png)',
              backgroundPosition: 'right bottom',
              backgroundSize: 'auto 100%',
              backgroundRepeat: 'no-repeat',
            }}>
            <h2 className='fw-bolder text-white'>Archived Activities</h2>
            <p className='fs-4 fw-bold mb-8'>
              Browse through the list of activities that have been completed/cancelled/archived
            </p>
            <Link to={'/activities/archived'} className='btn btn-mc-secondary fw-bold btn-sm'>
              Go to Archived Activities
            </Link>
          </div>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export default ActivityIndex
