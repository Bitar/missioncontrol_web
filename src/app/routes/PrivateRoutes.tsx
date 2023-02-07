import {Navigate, Route, Routes} from 'react-router-dom'
import {MasterLayout} from '../layout/MasterLayout'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {Resources} from '../pages/marketing/Resources'
import {SubscriptionIndex} from '../sections/billing/subscriptions/SubscriptionIndex'
import {PermissionPage} from '../sections/iam/permission/pages/PermissionPage'
import {SuspenseView} from '../layout/SuspenseView'
import React, {lazy} from 'react'
import {Restricted} from '../modules/auth/core/AuthPermission'
import {AdminCommunityCreate} from '../sections/community-admin/AdminCommunityCreate'
import {ActivityCreate} from '../sections/activity/pages/ActivityCreate'

const PrivateRoutes = () => {
  const CommunityPage = lazy(() => import('../sections/community/pages/CommunityPage'))
  const GamePage = lazy(() => import('../sections/games/pages/GamePage'))
  const PlansPage = lazy(() => import('../sections/billing/plan/pages/PlansPage'))
  const ActivityPage = lazy(() => import('../sections/activity/pages/ActivityPage'))
  const RolePage = lazy(() => import('../sections/iam/role/pages/RolePage'))
  const UserPage = lazy(() => import('../sections/iam/user/pages/UserPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />

        {/* Pages */}
        <Route path='dashboard/*' element={<DashboardWrapper />} />
        <Route path='resources' element={<Resources />} />
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
          path='users/*'
          element={
            <Restricted to='view-users'>
              <SuspenseView>
                <UserPage />
              </SuspenseView>
            </Restricted>
          }
        />
        <Route
          path='roles/*'
          element={
            <Restricted to='view-users'>
              <SuspenseView>
                <RolePage />
              </SuspenseView>
            </Restricted>
          }
        />
        <Route
          path='permissions/*'
          element={
            <Restricted to='view-users'>
              <SuspenseView>
                <PermissionPage />
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
                <ActivityPage />
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

export {PrivateRoutes}