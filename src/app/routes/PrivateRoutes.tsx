import {Navigate, Route, Routes} from 'react-router-dom'
import {MasterLayout} from '../layout/MasterLayout'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {Resources} from '../pages/marketing/Resources'
import {SubscriptionIndex} from '../sections/billing/subscriptions/SubscriptionIndex'
import {PermissionRoutes} from './iam/PermissionRoutes'
import {SuspenseView} from '../layout/SuspenseView'
import React, {lazy} from 'react'
import {Restricted} from '../modules/auth/core/AuthPermission'
import {AdminCommunityCreate} from '../sections/community-admin/AdminCommunityCreate'
import {ActivityCreate} from '../sections/activity/pages/ActivityCreate'

const PrivateRoutes = () => {
  const CommunityPage = lazy(() => import('../sections/community/pages/CommunityPage'))
  const GamePage = lazy(() => import('../sections/games/pages/GamePage'))
  const PlansPage = lazy(() => import('../sections/billing/plan/pages/PlansPage'))
  const ActivityRoutes = lazy(() => import('./activity/ActivityRoutes'))
  const RolePage = lazy(() => import('./iam/RoleRoutes'))
  const UserPage = lazy(() => import('./iam/UserRoutes'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />

        {/* Pages */}
        <Route path='dashboard/*' element={<DashboardWrapper />} />
        <Route
          path='resources'
          element={
            <Restricted to='view-resources'>
              <SuspenseView>
                <Resources />
              </SuspenseView>
            </Restricted>
          }
        />
        {/* Pages */}

        {/* Sections */}
        <Route
          path='admin/communities/create'
          element={
            <SuspenseView>
              <AdminCommunityCreate />
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

        <Route
          path='games/*'
          element={
            <Restricted to='view-games'>
              <SuspenseView>
                <GamePage />
              </SuspenseView>
            </Restricted>
          }
        />

        <Route
          path='iam/users/*'
          element={
            <Restricted to='view-users'>
              <SuspenseView>
                <UserPage />
              </SuspenseView>
            </Restricted>
          }
        />
        <Route
          path='iam/roles/*'
          element={
            <Restricted to='view-users'>
              <SuspenseView>
                <RolePage />
              </SuspenseView>
            </Restricted>
          }
        />
        <Route
          path='iam/permissions/*'
          element={
            <Restricted to='view-users'>
              <SuspenseView>
                <PermissionRoutes />
              </SuspenseView>
            </Restricted>
          }
        />

        <Route
          path='activity/create'
          element={
            <Restricted to='manage-activities'>
              <SuspenseView>
                <ActivityCreate />
              </SuspenseView>
            </Restricted>
          }
        />

        <Route
          path='activities/*'
          element={
            <Restricted to='view-activities'>
              <SuspenseView>
                <ActivityRoutes />
              </SuspenseView>
            </Restricted>
          }
        />

        <Route path='plans/*' element={<PlansPage />} />
        {/* Sections */}

        {/*<Route path='billing/plan' element={<BillingPlanWrapper />} />*/}
        {/*<Route path='billing/:id/complete' element={<BillingComplete />} />*/}
        <Route path='subscriptions' element={<SubscriptionIndex />} />

        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/auth/login' />} />
      </Route>
    </Routes>
  )
}

export { PrivateRoutes };
