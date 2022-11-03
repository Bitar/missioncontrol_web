import React from "react";
import { KTCard, KTCardBody, QUERIES } from "../../../_metronic/helpers";
import { TableHeader } from "../../modules/table/TableHeader";
import { QueryRequestProvider } from "../../modules/table/QueryRequestProvider";
import { QueryResponseProvider } from "../../modules/table/QueryResponseProvider";
import { getGames } from "./core/GameRequests";
import { ListViewProvider } from "../../modules/table/ListViewProvider";
import { GameTable } from "./GameTable";
import { GameFilters } from "./partials/GameFilters";

const GamesList = () => {
  return (
    <>
      <KTCard>
        <TableHeader name="Game" url="/games" />
        <KTCardBody>
          <GameFilters />
          <GameTable />
        </KTCardBody>
      </KTCard>
    </>
  );
};

const GameIndex = () => (
  <QueryRequestProvider>
    <QueryResponseProvider id={QUERIES.GAMES_LIST} requestFunction={getGames}>
      <ListViewProvider>
        <GamesList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
);

export { GameIndex };
