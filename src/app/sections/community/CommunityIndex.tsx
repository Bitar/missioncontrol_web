import {KTCard, QUERIES} from "../../../_metronic/helpers";
import {QueryRequestProvider} from "../../modules/table/QueryRequestProvider";
import {QueryResponseProvider} from "../../modules/table/QueryResponseProvider";
import {ListViewProvider} from "../../modules/table/ListViewProvider";
import {getCommunities} from "./core/_requests";
import {PageTitle} from "../../../_metronic/layout/core";
import {TableHeader} from "../../modules/table/TableHeader";
import {CommunityTable} from "./CommunityTable";

const CommunityList = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>{'Communities'}</PageTitle>
            <KTCard>
                <TableHeader name='Community' url='/communities' showAdd={false}/>
                <CommunityTable/>
            </KTCard>
        </>
    )
}

const CommunityIndex = () => (
    <QueryRequestProvider>
        <QueryResponseProvider id={QUERIES.COMMUNITIES_LIST} requestFunction={getCommunities}>
            <ListViewProvider>
                <CommunityList/>
            </ListViewProvider>
        </QueryResponseProvider>
    </QueryRequestProvider>
)

export {CommunityIndex}