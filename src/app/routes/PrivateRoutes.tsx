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
import {ProfilePage} from '../sections/profile/ProfilePage'

const PrivateRoutes = () => {
  const CommunityRoutes = lazy(() => import('./community/CommunityRoutes'))
  const GameRoutes = lazy(() => import('./game/GameRoutes'))
  const ActivityRoutes = lazy(() => import('./activity/ActivityRoutes'))
  // const BillingPlanRoutes = lazy(() => import('./billing/BillingPlanRoutes'))
  const RoleRoutes = lazy(() => import('./iam/RoleRoutes'))
  const UserRoutes = lazy(() => import('./iam/user/UserRoutes'))

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
                <CommunityRoutes />
              </SuspenseView>
            </Restricted>
          }
        />

        <Route
          path='games/*'
          element={
            <Restricted to='view-games'>
              <SuspenseView>
                <GameRoutes />
              </SuspenseView>
            </Restricted>
          }
        />

        <Route
          path='profile'
          element={
            <SuspenseView>
              <ProfilePage />
            </SuspenseView>
          }
        />

        <Route
          path='iam/users/*'
          element={
            <Restricted to='view-iam'>
              <SuspenseView>
                <UserRoutes />
              </SuspenseView>
            </Restricted>
          }
        />
        <Route
          path='iam/roles/*'
          element={
            <Restricted to='view-iam'>
              <SuspenseView>
                <RoleRoutes />
              </SuspenseView>
            </Restricted>
          }
        />
        <Route
          path='iam/permissions/*'
          element={
            <Restricted to='view-iam'>
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
            <SuspenseView>
              <ActivityRoutes />
            </SuspenseView>
          }
        />

        {/*<Route*/}
        {/*  path='plans/*'*/}
        {/*  element={*/}
        {/*    <Restricted to='view-plans'>*/}
        {/*      <SuspenseView>*/}
        {/*        <BillingPlanRoutes />*/}
        {/*      </SuspenseView>*/}
        {/*    </Restricted>*/}
        {/*  }*/}
        {/*/>*/}
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
