import {FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {ActivitiesIndex} from '../sections/activities/ActivitiesIndex'
import {GamesIndex} from '../sections/games/GamesIndex'
import {GameCreate} from '../sections/games/GameCreate'
import {GamesEdit} from '../sections/games/GameEdit'
import {Marketing} from '../pages/marketing/Marketing'
import {BillingPlanWrapper} from '../sections/billing/BillingPlanWrapper'
import {BillingComplete} from '../sections/billing/BillingComplete'
import {SubscriptionIndex} from '../sections/billing/subscriptions/SubscriptionIndex'
import {UserPage} from '../sections/identity/user/pages/UserPage'
import {RolePage} from '../sections/identity/role/pages/RolePage'
import {PermissionPage} from '../sections/identity/permission/pages/PermissionPage'
import {PlansPage} from '../sections/billing/plan/pages/PlansPage'
import {CommunityPage} from '../sections/community/pages/CommunityPage'

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
        <Route path='communities/*' element={<CommunityPage />} />

        <Route path='users/*' element={<UserPage />} />
        <Route path='roles/*' element={<RolePage />} />
        <Route path='permissions/*' element={<PermissionPage />} />

        <Route path='plans/*' element={<PlansPage />} />
        {/* Sections */}

        <Route path='billing/plan' element={<BillingPlanWrapper />} />
        <Route path='billing/:id/complete' element={<BillingComplete />} />
        <Route path='subscriptions' element={<SubscriptionIndex />} />
        {/*<Route path='communities' element={<CommunityIndex/>}/>*/}

        {/*<Route path='communities/create' element={<CommunityCreate/>}/>*/}

        {/*<Route*/}
        {/*    path='communities/:id/*'*/}
        {/*    element={*/}
        {/*        <SuspensedView>*/}
        {/*            <CommunityView/>*/}
        {/*        </SuspensedView>*/}
        {/*    }*/}
        {/*/>*/}

        <Route path='/activities' element={<ActivitiesIndex />} />

        <Route path='games' element={<GamesIndex />} />

        <Route
          path='games/create'
          element={
            <SuspensedView>
              <GameCreate />
            </SuspensedView>
          }
        />

        <Route
          path='games/:id/edit'
          element={
            <SuspensedView>
              <GamesEdit />
            </SuspensedView>
          }
        />

        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
