import {Navigate, Route, Routes} from "react-router-dom";
import {UsersIndex} from "./UsersIndex";
import {UsersCreate} from "./UsersCreate";
import {UsersEdit} from "./UsersEdit";
import {PageLink, PageTitle} from "../../../../_metronic/layout/core";
import React from "react";
import {UserView} from "./UserView";

const userBreadCrumbs: Array<PageLink> = [
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
]

const UsersPage: React.FC = () => {
    return (
        <Routes>
            <Route path='/overview' element={
                <>
                    <PageTitle breadcrumbs={userBreadCrumbs}>{"Overview"}</PageTitle>
                    <UsersIndex/>
                </>
            }/>
            <Route path='/create' element={
                <>
                    <PageTitle breadcrumbs={userBreadCrumbs}>{"Add User"}</PageTitle>
                    <UsersCreate/>
                </>
            }/>
            <Route path='/:id/edit' element={
                <>
                    <PageTitle breadcrumbs={userBreadCrumbs}>{"Update User"}</PageTitle>
                    <UsersEdit/>
                </>
            }/>
            <Route path='/:id/*' element={
                <>
                    <PageTitle breadcrumbs={userBreadCrumbs}>{"View User"}</PageTitle>
                    <UserView/>
                </>
            }/>
            <Route index element={<Navigate to='/users/overview'/>}/>
        </Routes>
    )
}

export {UsersPage}