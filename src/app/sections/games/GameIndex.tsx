import React, { useState } from "react";
import { KTCard, KTCardBody, QUERIES } from "../../../_metronic/helpers";
import { QueryRequestProvider } from "../../modules/table/QueryRequestProvider";
import { QueryResponseProvider } from "../../modules/table/QueryResponseProvider";
import { getGames } from "./core/GameRequests";
import { ListViewProvider } from "../../modules/table/ListViewProvider";
import { GameTable } from "./GameTable";
import { GameFilters } from "./partials/GameFilters";
import { KTCardHeader } from "../../helpers/components";
import { Actions } from "../../helpers/variables";
import { Col, Collapse, Row } from "react-bootstrap";
import { ActivityFilter } from "../activity/partials/ActivityFilter";

const GameIndex = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const headerActions = [
    {
      type: Actions.FILTER,
      target: "games-list-filter",
      showFilter: showFilter,
      setShowFilter: setShowFilter
    },
    { type: Actions.CREATE, url: "/activities" }
  ];

  return (
    <QueryRequestProvider>
      <QueryResponseProvider id={QUERIES.GAMES_LIST} requestFunction={getGames}>
        <ListViewProvider>
          <KTCard>
            <KTCardHeader
              text="All Games"
              icon="fa-regular fa-list"
              icon_style="fs-3 text-primary"
              actions={headerActions}
            />
            <KTCardBody>
              <Collapse in={showFilter}>
                <Row id="#games-list-filter">
                  <Col>
                    <GameFilters />
                  </Col>
                </Row>
              </Collapse>
              <GameTable />
            </KTCardBody>
          </KTCard>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  );
};

export { GameIndex };
