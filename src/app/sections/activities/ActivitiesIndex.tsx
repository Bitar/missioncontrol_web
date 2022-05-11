import React from 'react'
import {PageTitle} from "../../../_metronic/layout/core";
import {KTCard, QUERIES} from "../../../_metronic/helpers";
import {TableHeader} from "../../modules/table/TableHeader";
import {QueryRequestProvider} from "../../modules/table/QueryRequestProvider";
import {QueryResponseProvider} from "../../modules/table/QueryResponseProvider";
import {getActivities} from "./core/_requests";
import {ListViewProvider} from "../../modules/table/ListViewProvider";
import {ActivitiesTable} from "./ActivitiesTable";

const ActivitiesList = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>{'Activities'}</PageTitle>
            <KTCard>
                <TableHeader name='Activity' url='/activities'/>
                <ActivitiesTable/>
            </KTCard>
        </>
    )
}

const ActivitiesIndex = () => (
    <QueryRequestProvider>
        <QueryResponseProvider id={QUERIES.ROLES_LIST} requestFunction={getActivities}>
            <ListViewProvider>
                <ActivitiesList/>
            </ListViewProvider>
        </QueryResponseProvider>
    </QueryRequestProvider>
)

export {ActivitiesIndex}
