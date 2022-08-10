import {Navigate, Route, Routes} from "react-router-dom";
import {PageLink, PageTitle} from "../../../../_metronic/layout/core";
import React from "react";
import {RolesIndex} from "./RolesIndex";
import {RolesCreate} from "./RolesCreate";
import {RolesEdit} from "./RolesEdit";

const roleBreadCrumbs: Array<PageLink> = [
    {
        title: 'Roles',
        path: '/roles/overview',
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

const RolesPage: React.FC = () => {
    return (
        <Routes>
            <Route path='/overview' element={
                <>
                    <PageTitle breadcrumbs={roleBreadCrumbs}>{"Overview"}</PageTitle>
                    <RolesIndex/>
                </>
            }/>
            <Route path='/create' element={
                <>
                    <PageTitle breadcrumbs={roleBreadCrumbs}>{"Add Role"}</PageTitle>
                    <RolesCreate/>
                </>
            }/>
            <Route path='/:id/edit' element={
                <>
                    <PageTitle breadcrumbs={roleBreadCrumbs}>{"Update Role"}</PageTitle>
                    <RolesEdit/>
                </>
            }/>
            <Route path='/:id' element={
                <>
                    <PageTitle breadcrumbs={roleBreadCrumbs}>{"View Role"}</PageTitle>
                    <RolesEdit/>
                </>
            }/>
            <Route index element={<Navigate to='/roles/overview'/>}/>
        </Routes>
    )
}

export {RolesPage}