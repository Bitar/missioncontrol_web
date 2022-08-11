import {Navigate, Route, Routes} from "react-router-dom";
import {UsersIndex} from "./UsersIndex";
import {UsersCreate} from "../UsersCreate";
import {UsersEdit} from "../UsersEdit";
import {PageLink, PageTitle} from "../../../../../_metronic/layout/core";
import React from "react";
import {UsersView} from "./UsersView";

const usersBreadCrumbs: Array<PageLink> = [
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
                    <PageTitle breadcrumbs={usersBreadCrumbs}>{"Overview"}</PageTitle>
                    <UsersIndex/>
                </>
            }/>
            <Route path='/create' element={
                <>
                    <PageTitle breadcrumbs={usersBreadCrumbs}>{"Add User"}</PageTitle>
                    <UsersCreate/>
                </>
            }/>
            <Route path='/:id/edit' element={
                <>
                    <PageTitle breadcrumbs={usersBreadCrumbs}>{"Update User"}</PageTitle>
                    <UsersEdit/>
                </>
            }/>
            <Route path='/:id/*' element={
                <>
                    <PageTitle breadcrumbs={usersBreadCrumbs}>{"View User"}</PageTitle>
                    <UsersView/>
                </>
            }/>
            <Route index element={<Navigate to='/users/overview' replace={true}/>}/>
        </Routes>
    )
}

export {UsersPage}