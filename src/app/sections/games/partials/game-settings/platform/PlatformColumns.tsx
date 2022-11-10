import { Column } from "react-table";
import { Platform } from "../../../../../models/game/Platform";
import { CustomHeader } from "../../../../../modules/table/columns/CustomHeader";
import { ActionsCell } from "../../../../../modules/table/columns/ActionsCell";
import { QUERIES } from "../../../../../helpers/crud-helper/consts";
import React from "react";
import { useGame } from "../../../core/GameContext";

export const PlatformColumns: ReadonlyArray<Column<Platform>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title="Name" className="min-w-125px" />,
    id: "name",
    Cell: ({ ...props }) => (
      <div className="d-flex align-items-center">
        <div className="d-flex flex-column">
          {/*<Link to={'/activities/' + props.data[props.row.index].id} className='d-block'>*/}
          <span
            className="text-gray-800 mb-1">{props.data[props.row.index].name + " - " + props.data[props.row.index].abbreviation}</span>
          {/*</Link>*/}
        </div>
      </div>
    )
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title="Actions" className="text-end min-w-100px" />
    ),
    id: "actions",
    Cell: ({ ...props }) => {
      const { game, updateGame } = useGame();

      return <ActionsCell
        id={props.data[props.row.index]?.id}
        path={`games/${game?.id}/platforms`}
        queryKey={QUERIES.GAMES_PLATFORMS_LIST}
        showDelete={true}
        showEdit={false}
        callBackFn={updateGame}
      />;
    }
  }
];