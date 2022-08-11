import {Navigate, Route, Routes} from "react-router-dom";
import {PageLink, PageTitle} from "../../../../../_metronic/layout/core";
import React from "react";
import {PermissionsIndex} from "../PermissionsIndex";
import {PermissionsCreate} from "../PermissionsCreate";
import {PermissionsEdit} from "../PermissionsEdit";

const permissionsBreadCrumbs: Array<PageLink> = [
    {
        title: 'Permissions',
        path: '/permissions/overview',
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

const PermissionsPage: React.FC = () => {
    return (
        <Routes>
            <Route path='/overview' element={
                <>
                    <PageTitle breadcrumbs={permissionsBreadCrumbs}>{"Overview"}</PageTitle>
                    <PermissionsIndex/>
                </>
            }/>
            <Route path='/create' element={
                <>
                    <PageTitle breadcrumbs={permissionsBreadCrumbs}>{"Add Permission"}</PageTitle>
                    <PermissionsCreate/>
                </>
            }/>
            <Route path='/:id/edit' element={
                <>
                    <PageTitle breadcrumbs={permissionsBreadCrumbs}>{"Update Permission"}</PageTitle>
                    <PermissionsEdit/>
                </>
            }/>
            <Route index element={<Navigate to='/permissions/overview' replace={true}/>}/>
        </Routes>
    )
}

export {PermissionsPage}