import {KTCard, QUERIES} from "../../../../_metronic/helpers";
import {QueryRequestProvider} from "../../../modules/table/QueryRequestProvider";
import {QueryResponseProvider} from "../../../modules/table/QueryResponseProvider";
import {ListViewProvider} from "../../../modules/table/ListViewProvider";
import {getPlans} from "./core/_requests";
import {TableHeader} from "../../../modules/table/TableHeader";
import React from "react";
import {PlansTable} from "./PlansTable";

const PoleList = () => {
    return (
        <>
            <KTCard>
                <TableHeader name='Plan' url='/plans'/>
                <PlansTable/>
            </KTCard>
        </>
    )
}

const PlansIndex = () => (
    <QueryRequestProvider>
        <QueryResponseProvider id={QUERIES.PLANS_LIST} requestFunction={getPlans}>
            <ListViewProvider>
                <PoleList/>
            </ListViewProvider>
        </QueryResponseProvider>
    </QueryRequestProvider>
)



export {PlansIndex}