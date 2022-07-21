import {FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {RolesIndex} from "../sections/identity/role/RolesIndex";
import {PermissionsIndex} from "../sections/identity/permission/PermissionsIndex";
import {PermissionsCreate} from "../sections/identity/permission/PermissionsCreate";
import {RolesCreate} from "../sections/identity/role/RolesCreate";
import {ActivitiesIndex} from "../sections/activities/ActivitiesIndex";
import {PermissionsEdit} from "../sections/identity/permission/PermissionsEdit";
import {RolesEdit} from "../sections/identity/role/RolesEdit";
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
import {CommunityFollower} from '../sections/community/CommunityFollowers'
import {ActivityCreate} from "../sections/activities/ActivityCreate";
import {UsersIndex} from "../sections/identity/user/UsersIndex";

const PrivateRoutes = () => {

    return (
        <Routes>
            <Route element={<MasterLayout/>}>
                <Route path='auth/*' element={<Navigate to='/dashboard'/>}/>

                {/* Pages */}
                <Route path='dashboard' element={<DashboardWrapper/>}/>
                <Route path='marketing-support' element={<Marketing/>}/>
                {/* Pages */}

                <Route path='billing/plan' element={<BillingPlanWrapper/>}/>
                <Route path='billing/:id/complete' element={<BillingComplete/>}/>
                <Route path='subscriptions' element={<SubscriptionIndex/>}/>
                <Route path='communities' element={<CommunityIndex/>}/>

                <Route path='communities/create' element={<CommunityCreate/>}/>

                <Route
                    path='communities/:id/*'
                    element={
                        <SuspensedView>
                            <CommunityView />
                        </SuspensedView>
                    }
                />

                {/*<Route path='/communities/:id/followers'*/}
                {/*       element={<SuspensedView>*/}
                {/*           <CommunityFollower/>*/}
                {/*       </SuspensedView>*/}
                {/*       }*/}
                {/*/>*/}


                <Route path='activities' element={<ActivitiesIndex/>}/>
                <Route path='activities/create' element={<ActivityCreate/>}/>

                <Route path='games' element={<GamesIndex/>}/>


                <Route path='plans' element={<PlansIndex/>}/>
                <Route path='plans/create' element={
                    <SuspensedView>
                        <PlansCreate/>
                    </SuspensedView>
                }/>
                <Route
                    path='plans/:id/edit'
                    element={
                        <SuspensedView>
                            <PlansEdit/>
                        </SuspensedView>
                    }
                />

                <Route path='users' element={<UsersIndex/>}/>

                <Route path='roles' element={<RolesIndex/>}/>
                <Route
                    path='roles/create'
                    element={
                        <SuspensedView>
                            <RolesCreate/>
                        </SuspensedView>
                    }
                />

                <Route
                    path='roles/:id/edit'
                    element={
                        <SuspensedView>
                            <RolesEdit/>
                        </SuspensedView>
                    }
                />

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

                <Route path='permissions' element={<PermissionsIndex/>}/>
                <Route
                    path='permissions/create'
                    element={
                        <SuspensedView>
                            <PermissionsCreate/>
                        </SuspensedView>
                    }
                />

                <Route
                    path='permissions/:id/edit'
                    element={
                        <SuspensedView>
                            <PermissionsEdit/>
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
