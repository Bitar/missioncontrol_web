import React from 'react'
import {KTCard, QUERIES} from "../../../../_metronic/helpers";
import {TableHeader} from "../../../modules/table/TableHeader";
import {QueryRequestProvider} from "../../../modules/table/QueryRequestProvider";
import {RolesTable} from "./RolesTable";
import {QueryResponseProvider} from "../../../modules/table/QueryResponseProvider";
import {getRoles} from "./core/_requests";
import {ListViewProvider} from "../../../modules/table/ListViewProvider";

const RolesList = () => {
    return (
        <>
            <KTCard>
                <TableHeader name='Role' url='/roles'/>
                <RolesTable/>
            </KTCard>
        </>
    )
}

const RolesIndex = () => (
    <QueryRequestProvider>
        <QueryResponseProvider id={QUERIES.ROLES_LIST} requestFunction={getRoles}>
            <ListViewProvider>
                <RolesList/>
            </ListViewProvider>
        </QueryResponseProvider>
    </QueryRequestProvider>
)

export {RolesIndex}
