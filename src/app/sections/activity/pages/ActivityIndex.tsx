import React, { useEffect, useMemo, useState } from "react";
import { KTCard, KTCardBody, QUERIES } from "../../../../_metronic/helpers";
import { QueryRequestProvider } from "../../../modules/table/QueryRequestProvider";
import {
  QueryResponseProvider,
  useQueryResponseData,
  useQueryResponseLoading
} from "../../../modules/table/QueryResponseProvider";
import { EXPORT_ENDPOINT, getActivities } from "../core/requests/ActivityRequests";
import { ListViewProvider } from "../../../modules/table/ListViewProvider";
import { ActivityFilter } from "../partials/ActivityFilter";
import { PageTypes } from "../../../helpers/variables";
import { KTCardHeader } from "../../../helpers/components";
import { CreateCardAction, ExportCardAction, FilterCardAction } from "../../../components/misc/CardAction";
import { useMcApp } from "../../../modules/general/McApp";
import { generatePageTitle } from "../../../helpers/pageTitleGenerator";
import { Sections } from "../../../helpers/sections";
import { ActivityColumns } from "../core/columns/ActivityColumns";
import { McTable } from "../../../components/McTable";

const ActivityIndex = () => {
  const mcApp = useMcApp();

  useEffect(() => {
    mcApp.setPageTitle(generatePageTitle(Sections.ACTIVITIES, PageTypes.INDEX));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [exportQuery, setExportQuery] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);

  return (
    <QueryRequestProvider>
      <QueryResponseProvider id={QUERIES.ACTIVITIES_LIST} requestFunction={getActivities}>
        <ListViewProvider>
          <KTCard>
            <KTCardHeader
              text="All Activities"
              icon="fa-regular fa-list"
              icon_style="fs-3 text-primary"
              actions={[
                new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                new FilterCardAction("activities-list-filter", showFilter, setShowFilter),
                new CreateCardAction("/activities", "manage-activities")
              ]}
            />
            <KTCardBody>
              <ActivityFilter showFilter={showFilter} setExportQuery={setExportQuery} />

              <ActivityTable />
            </KTCardBody>
          </KTCard>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  );
};

export default ActivityIndex;

const ActivityTable = () => {
  const activities = useQueryResponseData();
  const isLoading = useQueryResponseLoading();
  const data = useMemo(() => activities, [activities]);
  const columns = useMemo(() => ActivityColumns, []);

  return (
    <McTable
      data={data}
      columns={columns}
      model={activities.length > 0 ? activities[0] : null}
      isLoading={isLoading}
    />
  );
};
