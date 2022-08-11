import React from 'react'
import {KTCard, QUERIES} from "../../../../_metronic/helpers";
import {TableHeader} from "../../../modules/table/TableHeader";
import {QueryRequestProvider} from "../../../modules/table/QueryRequestProvider";
import {PermissionsTable} from "./PermissionsTable";
import {getPermissions} from "./core/_requests";
import {QueryResponseProvider} from "../../../modules/table/QueryResponseProvider";
import {ListViewProvider} from "../../../modules/table/ListViewProvider";

const PermissionsList = () => {
    return (
        <>
            <KTCard>
                <TableHeader name='Permission' url="/permissions"/>
                <PermissionsTable/>
            </KTCard>
        </>
    )
}

const PermissionsIndex = () => (
    <QueryRequestProvider>
        <QueryResponseProvider id={QUERIES.PERMISSIONS_LIST} requestFunction={getPermissions}>
            <ListViewProvider>
                <PermissionsList/>
            </ListViewProvider>
        </QueryResponseProvider>
    </QueryRequestProvider>
)

export {PermissionsIndex}
