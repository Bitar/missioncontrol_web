import {Navigate, Route, Routes} from 'react-router-dom'
import {MasterLayout} from '../layout/MasterLayout'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {Marketing} from '../pages/marketing/Marketing'
import {BillingPlanWrapper} from '../sections/billing/BillingPlanWrapper'
import {BillingComplete} from '../sections/billing/BillingComplete'
import {SubscriptionIndex} from '../sections/billing/subscriptions/SubscriptionIndex'
import {PermissionPage} from '../sections/identity/permission/pages/PermissionPage'
import {SuspenseView} from '../layout/SuspenseView'
import React, {lazy} from 'react'
import {Restricted} from '../modules/auth/core/AuthPermission'
import { AdminCommunityCreate } from "../sections/community-admin/AdminCommunityCreate";

const PrivateRoutes = () => {
  const CommunityPage = lazy(() => import('../sections/community/pages/CommunityPage'))
  const GamePage = lazy(() => import('../sections/games/pages/GamePage'))
  const PlansPage = lazy(() => import('../sections/billing/plan/pages/PlansPage'))
  const ActivityPage = lazy(() => import('../sections/activity/pages/ActivityPage'))
  const RolePage = lazy(() => import('../sections/identity/role/pages/RolePage'))
  const UserPage = lazy(() => import('../sections/identity/user/pages/UserPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />

        {/* Pages */}
        <Route path='dashboard/*' element={<DashboardWrapper />} />
        <Route path='marketing-support' element={<Marketing />} />
        {/* Pages */}

        {/* Sections */}
        <Route
        path='admin/communities/create'
        element={
          <SuspenseView>
            <AdminCommunityCreate/>
          </SuspenseView>
        }
        />
        <Route
          path='communities/*'
          element={
            <Restricted to='view-communities'>
              <SuspenseView>
                <CommunityPage />
              </SuspenseView>
            </Restricted>
          }
        />
        <Route path='games/*' element={<GamePage />} />

        <Route
          path='users/*'
          element={
            <SuspenseView>
              <UserPage />
            </SuspenseView>
          }
        />
        <Route
          path='roles/*'
          element={
            <SuspenseView>
              <RolePage />
            </SuspenseView>
          }
        />
        <Route path='permissions/*' element={<PermissionPage />} />

        <Route
          path='activities/*'
          element={
            <SuspenseView>
              <Restricted to='view-activities'>
                <ActivityPage />
              </Restricted>
            </SuspenseView>
          }
        />

        <Route path='plans/*' element={<PlansPage />} />
        {/* Sections */}

        <Route path='billing/plan' element={<BillingPlanWrapper />} />
        <Route path='billing/:id/complete' element={<BillingComplete />} />
        <Route path='subscriptions' element={<SubscriptionIndex />} />

        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/auth/login' />} />
      </Route>
    </Routes>
  )
}

export {PrivateRoutes}
