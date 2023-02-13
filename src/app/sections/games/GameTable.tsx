import { useMemo } from "react";
import { gamesColumns } from "./core/GameColumns";
import { useQueryResponseData, useQueryResponseLoading } from "../../modules/table/QueryResponseProvider";
import { McTable } from "../../components/McTable";

const GameTable = () => {
  const games = useQueryResponseData();
  const isLoading = useQueryResponseLoading();
  const data = useMemo(() => games, [games]);
  const columns = useMemo(() => gamesColumns, []);

  return (
    <McTable
      data={data}
      columns={columns}
      model={games.length > 0 ? games[0] : null}
      isLoading={isLoading}
    />
  );
};

export { GameTable };
