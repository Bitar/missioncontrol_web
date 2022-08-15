import {FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {ActivityIndex} from '../sections/activities/ActivityIndex'
import {Marketing} from '../pages/marketing/Marketing'
import {BillingPlanWrapper} from '../sections/billing/BillingPlanWrapper'
import {BillingComplete} from '../sections/billing/BillingComplete'
import {SubscriptionIndex} from '../sections/billing/subscriptions/SubscriptionIndex'
import {UserPage} from '../sections/identity/user/pages/UserPage'
import {RolePage} from '../sections/identity/role/pages/RolePage'
import {PermissionPage} from '../sections/identity/permission/pages/PermissionPage'
import {PlansPage} from '../sections/billing/plan/pages/PlansPage'
import {CommunityPage} from '../sections/community/pages/CommunityPage'
import {GamePage} from '../sections/games/pages/GamePage'
import { SuspenseView } from "../layout/SuspenseView";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />

        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='marketing-support' element={<Marketing />} />
        {/* Pages */}

        {/* Sections */}
        <Route path='communities/*' element={<SuspenseView><CommunityPage /></SuspenseView>} />
        <Route path='games/*' element={<GamePage />} />

        <Route path='users/*' element={<SuspenseView><UserPage /></SuspenseView>} />
        <Route path='roles/*' element={<SuspenseView><RolePage /></SuspenseView>} />
        <Route path='permissions/*' element={<PermissionPage />} />

        <Route path='plans/*' element={<PlansPage />} />
        {/* Sections */}

        <Route path='billing/plan' element={<BillingPlanWrapper />} />
        <Route path='billing/:id/complete' element={<BillingComplete />} />
        <Route path='subscriptions' element={<SubscriptionIndex />} />

        <Route path='/activities' element={<ActivityIndex />} />

        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

export {PrivateRoutes}
