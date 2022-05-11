import React from 'react'
import {PageTitle} from "../../../../_metronic/layout/core";
import {KTCard, QUERIES} from "../../../../_metronic/helpers";
import {TableHeader} from "../../../modules/table/TableHeader";
import {QueryRequestProvider} from "../../../modules/table/QueryRequestProvider";
import {PermissionsTable} from "./PermissionsTable";
import {GET_PERMISSIONS_URL, getPermissions} from "./core/_requests";
import {QueryResponseProvider} from "../../../modules/table/QueryResponseProvider";
import {ListViewProvider} from "../../../modules/table/ListViewProvider";

const PermissionsList = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>{'Permissions'}</PageTitle>
            <KTCard>
                <TableHeader name='Permission' url="/permissions"/>
                <PermissionsTable/>
            </KTCard>
        </>
    )
}

const PermissionsIndex = () => (
    <QueryRequestProvider>
        <QueryResponseProvider id={QUERIES.ROLES_LIST} requestFunction={getPermissions}>
            <ListViewProvider>
                <PermissionsList/>
            </ListViewProvider>
        </QueryResponseProvider>
    </QueryRequestProvider>
)

export {PermissionsIndex}
