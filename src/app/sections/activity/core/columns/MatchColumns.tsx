import React from "react";
import { Column, UseSortByColumnOptions } from "react-table";
import { CustomHeader } from "../../../../modules/table/columns/CustomHeader";
import { ActionsCell } from "../../../../modules/table/columns/ActionsCell";
import { QUERIES } from "../../../../../_metronic/helpers";
import { Activity } from "../../../../models/activity/Activity";
import { formatActivityStatus } from "../../../../helpers/ActivityHelper";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { BadgeCell } from "../../../../modules/table/columns/BadgeCell";

dayjs.extend(localizedFormat);

const MatchColumns: (Column<Activity> & UseSortByColumnOptions<Activity>)[] = [
  {
    Header: (props) => <CustomHeader tableProps={props} title="Status" className="min-w-125px" />,
    id: "status",
    defaultCanSort: false,
    Cell: ({ ...props }) => {
      const { status, color } = formatActivityStatus(props.data[props.row.index].status);
      return <BadgeCell status={status} color={color} align={"left"} />;
    }
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title="Status" className="min-w-125px" />,
    id: "id",
    defaultCanSort: false,
    Cell: ({ ...props }) => props.data[props.row.index].id
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title="Actions" className="text-end min-w-100px" />
    ),
    id: "actions",
    defaultCanSort: false,
    Cell: ({ ...props }) => (
      <ActionsCell
        id={props.data[props.row.index].id}
        path={"activities"}
        queryKey={QUERIES.ACTIVITIES_LIST}
        showView={true}
        showDelete={true}
      />
    )
  }
];

export { MatchColumns };
