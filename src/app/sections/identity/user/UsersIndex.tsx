import React from 'react'
import {PageTitle} from "../../../../_metronic/layout/core";
import {KTCard, QUERIES} from "../../../../_metronic/helpers";
import {TableHeader} from "../../../modules/table/TableHeader";
import {QueryRequestProvider} from "../../../modules/table/QueryRequestProvider";
import {QueryResponseProvider} from "../../../modules/table/QueryResponseProvider";
import {getUsers} from "./core/_requests";
import {ListViewProvider} from "../../../modules/table/ListViewProvider";
import {UsersTable} from "./UsersTable";

const UsersList = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>{'Users'}</PageTitle>
            <KTCard>
                <TableHeader name='User' url='/users'/>
                <UsersTable/>
            </KTCard>
        </>
    )
}

const UsersIndex = () => (
    <QueryRequestProvider>
        <QueryResponseProvider id={QUERIES.USERS_LIST} requestFunction={getUsers}>
            <ListViewProvider>
                <UsersList/>
            </ListViewProvider>
        </QueryResponseProvider>
    </QueryRequestProvider>
)

export {UsersIndex}
