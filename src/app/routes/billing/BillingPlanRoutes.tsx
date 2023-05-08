import React, {FC} from 'react'
import {PageLink, PageTitle} from '../../layout/core'
import {Route, Routes} from 'react-router-dom'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {BillingPlanIndex} from '../../sections/billing/plan/BillingPlanIndex'
import {PlansCreate} from '../../sections/billing/plan/PlansCreate'

const plansBreadCrumbs: Array<PageLink> = [
  {
    title: 'Plans',
    path: '/plans',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const BillingPlanRoutes: FC = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <SuspenseView>
            <PageTitle breadcrumbs={plansBreadCrumbs}>{'Overview'}</PageTitle>
            <BillingPlanIndex />
          </SuspenseView>
        }
      />
      <Route
        path='/create'
        element={
          <SuspenseView>
            <PageTitle breadcrumbs={plansBreadCrumbs}>{'Add Plan'}</PageTitle>
            <PlansCreate />
          </SuspenseView>
        }
      />
      <Route
        path='/:id/*'
        element={
          <SuspenseView>
            <PageTitle breadcrumbs={plansBreadCrumbs}>{'View Plan'}</PageTitle>
            {/*<GameViewRoutes />*/}
          </SuspenseView>
        }
      />
    </Routes>
  )
}

export default BillingPlanRoutes
