import {KTCard, KTCardBody, QUERIES} from '../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import {
  QueryResponseProvider,
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../modules/table/QueryResponseProvider'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'
import React, {useEffect, useMemo, useState} from 'react'
import {KTCardHeader} from '../../../helpers/components'
import {CreateCardAction, ExportCardAction} from '../../../components/misc/CardAction'
import {EXPORT_ENDPOINT} from '../../activity/core/requests/ActivityRequests'
import {McTable} from '../../../components/McTable'
import {useMcApp} from '../../../modules/general/McApp'
import {generatePageTitle} from '../../../helpers/pageTitleGenerator'
import {Sections} from '../../../helpers/sections'
import {PageTypes} from '../../../helpers/variables'
import {BillingPlanColumns} from './core/BillingPlanColumns'
import {getPlans} from './core/BillingPlanRequest'

const BillingPlanTable = () => {
  const billingPlans = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => billingPlans, [billingPlans])
  const columns = useMemo(() => BillingPlanColumns, [])

  return (
    <McTable
      data={data}
      columns={columns}
      model={billingPlans.length > 0 ? billingPlans[0] : null}
      isLoading={isLoading}
    />
  )
}

const BillingPlanIndex = () => {
  const mcApp = useMcApp()

  useEffect(() => {
    mcApp.setPageTitle(generatePageTitle(Sections.BILLING_PLANS, PageTypes.INDEX))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [exportQuery, setExportQuery] = useState<string>('')
  const [showFilter, setShowFilter] = useState<boolean>(false)

  return (
    <QueryRequestProvider>
      <QueryResponseProvider id={QUERIES.PLANS_LIST} requestFunction={getPlans}>
        <ListViewProvider>
          <KTCard>
            <KTCardHeader
              text='All Activities'
              icon='fa-regular fa-list'
              icon_style='fs-3 text-primary'
              actions={[
                new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                // new FilterCardAction('plans-list-filter', showFilter, setShowFilter),
                new CreateCardAction('/plans', 'manage-plans'),
              ]}
            />
            <KTCardBody>
              {/*<ActivityFilter showFilter={showFilter} setExportQuery={setExportQuery} />*/}

              <BillingPlanTable />
            </KTCardBody>
          </KTCard>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  )
}

export {BillingPlanIndex}
