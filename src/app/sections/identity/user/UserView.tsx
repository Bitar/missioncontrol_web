import React, {useEffect, useState} from "react"
import {getUserById} from "./core/_requests"
import {Navigate, Outlet, Route, Routes, useParams} from "react-router-dom"
import {User} from "../../../models/identity/User";
import {UsersInfo} from "./UsersInfo";
import {PageLink, PageTitle} from "../../../../_metronic/layout/core";
import {UsersEdit} from "./UsersEdit";
import {UsersActivities} from "./UserActivities";
import {UsersTeams} from "./UsersTeams";

const UserView: React.FC = () => {
    const [user, setUser] = useState<User | undefined>();
    const params = useParams()

    const userViewBreadCrumbs: Array<PageLink> = [
        {
            title: 'Users',
            path: '/users/overview',
            isSeparator: false,
            isActive: false,
        },
        {
            title: '',
            path: '',
            isSeparator: true,
            isActive: false,
        },
        {
            title: user?.name || "",
            path: '/users/' + params.id + '/overview',
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

    useEffect(() => {
        const query = 'include=roles'
        getUserById(params.id, query).then(response => {
            setUser(response)
        })
    }, [params.id]);

    return (
        <Routes>
            <Route
                element={
                    <>
                        <UsersInfo user={user}/>
                        <Outlet/>
                    </>
                }
            >
                <Route
                    path='/overview'
                    element={
                        <>
                            <PageTitle breadcrumbs={userViewBreadCrumbs}>Overview</PageTitle>
                            {/*<UsersEdit/>*/}
                        </>
                    }
                />
                <Route
                    path='/activities'
                    element={
                        <>
                            <PageTitle breadcrumbs={userViewBreadCrumbs}>Activities</PageTitle>
                            {/*<CommunityFollower/>*/}
                            <UsersActivities/>
                        </>
                    }
                />
                <Route
                    path='/teams'
                    element={
                        <>
                            <PageTitle breadcrumbs={userViewBreadCrumbs}>Teams</PageTitle>
                            <UsersTeams/>
                            {/*<CommunityFollower/>*/}
                        </>
                    }
                />
                <Route
                    path='/settings'
                    element={
                        <>
                            <PageTitle breadcrumbs={userViewBreadCrumbs}>Settings</PageTitle>
                            <UsersEdit/>
                        </>
                    }
                />
                <Route index element={<Navigate to={'/users/' + params.id + '/overview'}/>}/>
            </Route>
        </Routes>
        // <>
        //     <PageTitle breadcrumbs={[]}>{'Community Details'}</PageTitle>
        //     <CommunityInfo community={community}/>
        //
        //     <div className='card mb-5 mb-xl-10'>
        //         <CommunityFollower/>
        //     </div>
        //
        // </>

    )
}

export {UserView}