import {QueryRequestProvider} from "../../../modules/table/QueryRequestProvider";
import {QueryResponseProvider} from "../../../modules/table/QueryResponseProvider";
import {KTCard, QUERIES} from "../../../../_metronic/helpers";
import {ListViewProvider} from "../../../modules/table/ListViewProvider";
import React from "react";
import {PageTitle} from "../../../../_metronic/layout/core";
import {TableHeader} from "../../../modules/table/TableHeader";
import {getSubscriptions} from "./core/_requests";
import {SubscriptionTable} from "./SubscriptionTable";

const SubscriptionList = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>{'Subscriptions'}</PageTitle>
            <KTCard>
                <TableHeader name='Subscription' url="/subscriptions" showAdd={false}/>
                <SubscriptionTable/>
            </KTCard>
        </>
    )
}

const SubscriptionIndex = () => (
    <QueryRequestProvider>
        <QueryResponseProvider id={QUERIES.SUBSCRIPTIONS_LIST} requestFunction={getSubscriptions}>
            <ListViewProvider>
                <SubscriptionList/>
            </ListViewProvider>
        </QueryResponseProvider>
    </QueryRequestProvider>
)
export {SubscriptionIndex}