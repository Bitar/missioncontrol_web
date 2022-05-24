import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {RolesIndex} from "../sections/user/role/RolesIndex";
import {PermissionsIndex} from "../sections/user/permission/PermissionsIndex";
import {PermissionsCreate} from "../sections/user/permission/PermissionsCreate";
import {RolesCreate} from "../sections/user/role/RolesCreate";
import {ActivitiesIndex} from "../sections/activities/ActivitiesIndex";
import {PermissionsEdit} from "../sections/user/permission/PermissionsEdit";
import {RolesEdit} from "../sections/user/role/RolesEdit";
import {GamesIndex} from '../sections/games/GamesIndex'
import {BillingPlan} from "../sections/billing/BillingPlan";


const PrivateRoutes = () => {
    const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
    const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
    const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
    const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
    const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))

    return (
        <Routes>
            <Route element={<MasterLayout/>}>
                {/* Redirect to Dashboard after success login/registartion */}
                <Route path='auth/*' element={<Navigate to='/dashboard'/>}/>
                {/* Pages */}
                <Route path='dashboard' element={<DashboardWrapper/>}/>
                <Route path='menu-test' element={<MenuTestPage/>}/>
                {/* Pages */}

                <Route path='billing/plan' element={<BillingPlan/>}/>

                <Route path='activities' element={<ActivitiesIndex/>}/>
                <Route path='games' element={<GamesIndex/>}/>

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




                {/* Lazy Modules */}
                <Route
                    path='crafted/pages/profile/*'
                    element={
                        <SuspensedView>
                            <ProfilePage/>
                        </SuspensedView>
                    }
                />
                <Route
                    path='crafted/pages/wizards/*'
                    element={
                        <SuspensedView>
                            <WizardsPage/>
                        </SuspensedView>
                    }
                />
                <Route
                    path='crafted/widgets/*'
                    element={
                        <SuspensedView>
                            <WidgetsPage/>
                        </SuspensedView>
                    }
                />
                <Route
                    path='crafted/account/*'
                    element={
                        <SuspensedView>
                            <AccountPage/>
                        </SuspensedView>
                    }
                />
                <Route
                    path='apps/chat/*'
                    element={
                        <SuspensedView>
                            <ChatPage/>
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
