import React from 'react'
import {PageTitle} from "../../../../_metronic/layout/core";
// import {QueryRequestProvider} from "../../../modules/apps/user-management/users-list/core/QueryRequestProvider";
// import {QueryResponseProvider} from "../../../modules/apps/user-management/users-list/core/QueryResponseProvider";
import {ListViewProvider} from "../../../modules/apps/user-management/users-list/core/ListViewProvider";
import {KTCard, QUERIES} from "../../../../_metronic/helpers";
// import {UsersListHeader} from "../../../modules/apps/user-management/users-list/components/header/UsersListHeader";
// import {UsersTable} from "../../../modules/apps/user-management/users-list/table/UsersTable";
// import {UserEditModal} from "../../../modules/apps/user-management/users-list/user-edit-modal/UserEditModal";
import {TableHeader} from "../../../modules/table/TableHeader";
import {QueryRequestProvider} from "../../../modules/table/QueryRequestProvider";
import {QueryResponseProvider} from "./core/QueryResponseProvider";
import {RolesTable} from "./RolesTable";

const RolesList = () => {
    // const {itemIdForUpdate} = useListView()
    return (
        <>
            <PageTitle breadcrumbs={[]}>{'Roles'}</PageTitle>
            <KTCard>
                <TableHeader/>
                <RolesTable/>
            </KTCard>
            {/*{itemIdForUpdate !== undefined && <UserEditModal/>}*/}
        </>
    )
}

const RolesListWrapper = () => (
    <QueryRequestProvider>
        <QueryResponseProvider id={QUERIES.ROLES_LIST}>
            <ListViewProvider>
                <RolesList/>
            </ListViewProvider>
        </QueryResponseProvider>
    </QueryRequestProvider>
)

export {RolesListWrapper}
