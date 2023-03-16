import { KTCard, KTCardBody, QUERIES } from "../../../../_metronic/helpers";
import { QueryRequestProvider } from "../../../modules/table/QueryRequestProvider";
import {
  QueryResponseProvider,
  useQueryResponseData,
  useQueryResponseLoading
} from "../../../modules/table/QueryResponseProvider";
import { ListViewProvider } from "../../../modules/table/ListViewProvider";
import { EXPORT_ENDPOINT, getCommunities } from "../core/CommunityRequests";
import { CommunityFilter } from "../partials/CommunityFilter";
import { PageTypes } from "../../../helpers/variables";
import { KTCardHeader } from "../../../helpers/components";
import React, { useEffect, useMemo, useState } from "react";
import { CreateCardAction, ExportCardAction, FilterCardAction } from "../../../components/misc/CardAction";
import { useMcApp } from "../../../modules/general/McApp";
import { generatePageTitle } from "../../../helpers/pageTitleGenerator";
import { Sections } from "../../../helpers/sections";
import { communitiesColumns } from "../core/CommunityColumns";
import { McTable } from "../../../components/McTable";

const CommunityIndex = () => {
  const [exportQuery, setExportQuery] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const mcApp = useMcApp();

  useEffect(() => {
    mcApp.setPageTitle(generatePageTitle(Sections.COMMUNITIES, PageTypes.INDEX));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QueryRequestProvider>
      <QueryResponseProvider id={QUERIES.COMMUNITIES_LIST} requestFunction={getCommunities}>
        <ListViewProvider>
          <KTCard>
            <KTCardHeader
              text="All Communities"
              icon="fa-regular fa-list"
              icon_style="fs-3 text-primary"
              actions={[
                new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                new FilterCardAction("communities-list-filter", showFilter, setShowFilter),
                new CreateCardAction("/communities", "manage-communities")
              ]}
            />
            <KTCardBody>
              <CommunityFilter showFilter={showFilter} setExportQuery={setExportQuery} />

              <CommunityTable />
            </KTCardBody>
          </KTCard>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  );
};

export default CommunityIndex;

const CommunityTable = () => {
  const communities = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => communities, [communities])
  const columns = useMemo(() => communitiesColumns, [])

  return (
    <McTable
      data={data}
      columns={columns}
      model={communities.length > 0 ? communities[0] : null}
      isLoading={isLoading}
    />
  )
}
