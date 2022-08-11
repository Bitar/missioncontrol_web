import {FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {ActivitiesIndex} from "../sections/activities/ActivitiesIndex";
import {GamesIndex} from '../sections/games/GamesIndex'
import {GameCreate} from '../sections/games/GameCreate'
import {GamesEdit} from '../sections/games/GameEdit'
import {Marketing} from '../pages/marketing/Marketing'
import {BillingPlanWrapper} from "../sections/billing/BillingPlanWrapper";
import {CommunityCreate} from "../sections/community/CommunityCreate";
import {PlansIndex} from '../sections/billing/plan/PlansIndex'
import {PlansCreate} from '../sections/billing/plan/PlansCreate'
import {PlansEdit} from "../sections/billing/plan/PlansEdit";
import {BillingComplete} from '../sections/billing/BillingComplete'
import {SubscriptionIndex} from "../sections/billing/subscriptions/SubscriptionIndex";
import {CommunityIndex} from "../sections/community/CommunityIndex";
import {CommunityView} from '../sections/community/CommunityView'
import {UsersPage} from "../sections/identity/user/pages/UsersPage";
import {RolesPage} from "../sections/identity/role/pages/RolesPage";
import {PermissionsPage} from "../sections/identity/permission/pages/PermissionsPage";
import {PlansPage} from "../sections/billing/plan/pages/PlansPage";


const PrivateRoutes = () => {

    return (
        <Routes>
            <Route element={<MasterLayout/>}>
                <Route path='auth/*' element={<Navigate to='/dashboard'/>}/>

                {/* Pages */}
                <Route path='dashboard' element={<DashboardWrapper/>}/>
                <Route path='marketing-support' element={<Marketing/>}/>
                {/* Pages */}

                {/* Sections */}
                <Route path='users/*' element={<UsersPage/>}/>
                <Route path='roles/*' element={<RolesPage/>}/>
                <Route path='permissions/*' element={<PermissionsPage/>}/>

                <Route path='plans/*' element={<PlansPage/>}/>
                {/* Sections */}

                <Route path='billing/plan' element={<BillingPlanWrapper/>}/>
                <Route path='billing/:id/complete' element={<BillingComplete/>}/>
                <Route path='subscriptions' element={<SubscriptionIndex/>}/>
                <Route path='communities' element={<CommunityIndex/>}/>

                <Route path='communities/create' element={<CommunityCreate/>}/>

                <Route
                    path='communities/:id/*'
                    element={
                        <SuspensedView>
                            <CommunityView/>
                        </SuspensedView>
                    }
                />

                <Route path='/activities' element={<ActivitiesIndex/>}/>

                <Route path='games' element={<GamesIndex/>}/>

                <Route
                    path='games/create'
                    element={
                        <SuspensedView>
                            <GameCreate/>
                        </SuspensedView>
                    }
                />


                <Route
                    path='games/:id/edit'
                    element={
                        <SuspensedView>
                            <GamesEdit/>
                        </SuspensedView>
                    }
                />

                {/* Page Not Found */}
                <Route path='*' element={<Navigate to='/error/404'/>}/>
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
    return <Suspense fallback={<TopBarProgress/>}>{children}</Suspense>
}

export {PrivateRoutes}
