import React from 'react'
import {KTCard, QUERIES} from "../../../../_metronic/helpers";
import {TableHeader} from "../../../modules/table/TableHeader";
import {QueryRequestProvider} from "../../../modules/table/QueryRequestProvider";
import {PermissionTable} from "./PermissionTable";
import {getPermissions} from "./core/_requests";
import {QueryResponseProvider} from "../../../modules/table/QueryResponseProvider";
import {ListViewProvider} from "../../../modules/table/ListViewProvider";

const PermissionsList = () => {
    return (
        <>
            <KTCard>
                <TableHeader name='Permission' url="/permissions"/>
                <PermissionTable/>
            </KTCard>
        </>
    )
}

const PermissionIndex = () => (
    <QueryRequestProvider>
        <QueryResponseProvider id={QUERIES.PERMISSIONS_LIST} requestFunction={getPermissions}>
            <ListViewProvider>
                <PermissionsList/>
            </ListViewProvider>
        </QueryResponseProvider>
    </QueryRequestProvider>
)

export {PermissionIndex}
