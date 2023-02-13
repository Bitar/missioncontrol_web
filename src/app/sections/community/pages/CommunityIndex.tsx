import { KTCard, KTCardBody, QUERIES } from "../../../../_metronic/helpers";
import { QueryRequestProvider } from "../../../modules/table/QueryRequestProvider";
import { QueryResponseProvider } from "../../../modules/table/QueryResponseProvider";
import { ListViewProvider } from "../../../modules/table/ListViewProvider";
import { getCommunities } from "../core/CommunityRequests";
import { TableHeader } from "../../../modules/table/TableHeader";
import { CommunityTable } from "../CommunityTable";
import { CommunityFilters } from "../partials/CommunityFilters";
import { Actions } from "../../../helpers/variables";
import { KTCardHeader } from "../../../helpers/components";
import React, { useState } from "react";
import { Col, Collapse, Row } from "react-bootstrap";

const CommunityIndex = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const headerActions = [
    {
      type: Actions.FILTER,
      target: "communities-list-filter",
      showFilter: showFilter,
      setShowFilter: setShowFilter
    },
    { type: Actions.CREATE, url: "/communities" }
  ];

  return (
    <QueryRequestProvider>
      <QueryResponseProvider id={QUERIES.COMMUNITIES_LIST} requestFunction={getCommunities}>
        <ListViewProvider>
          <KTCard>
            <KTCardHeader
              text="All Communities"
              icon="fa-regular fa-list"
              icon_style="fs-3 text-primary"
              actions={headerActions}
            />
            <KTCardBody>
              <Collapse in={showFilter}>
                <Row id="#communities-list-filter">
                  <Col>
                    <CommunityFilters />
                  </Col>
                </Row>
              </Collapse>
              <CommunityTable />
            </KTCardBody>
          </KTCard>

        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  );
};

export { CommunityIndex };
