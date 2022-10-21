import { Column } from "react-table";
import { User } from "../../../../identity/user/models/User";
import { CustomHeader } from "../../../../../modules/table/columns/CustomHeader";
import { TextImageCell } from "../../../../../modules/table/columns/TextImageCell";
import { ActionsCell } from "../../../../../modules/table/columns/ActionsCell";
import { QUERIES } from "../../../../../helpers/crud-helper/consts";
import React from "react";
import { useCommunity } from "../../../CommunityContext";
import { BadgeCell } from "../../../../../modules/table/columns/BadgeCell";
import { CommunityPermission } from "../../../models/CommunityPermission";

const PermissionColumns: ReadonlyArray<Column<CommunityPermission>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title="Name" className="min-w-125px" />,
    id: "name",
    Cell: ({ ...props }) => (
      <TextImageCell
        dImage={props.data[props.row.index]?.user?.meta?.image}
        dText={props.data[props.row.index]?.user?.name}
        link={`/users/${props.data[props.row.index]?.user?.id}`}
        dExtraText={props.data[props.row.index]?.user?.email}
      />
    )
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Is Owner' className='min-w-125px' />,
    id: 'is_owner',
    Cell: ({...props}) => {
      if(props.data[props.row.index]?.is_owner) {
        return <BadgeCell status='Owner' color='mc-secondary' />
      } else {
        return <BadgeCell status='Admin' color='secondary' />
      }
    },
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title="Actions" className="text-end min-w-100px" />
    ),
    id: "actions",
    Cell: ({ ...props }) => {
      const { community } = useCommunity();

      return <ActionsCell
        id={props.data[props.row.index]?.user?.id}
        path={`communities/${community?.id}/permission`}
        queryKey={QUERIES.COMMUNITIES_PERMISSIONS_LIST}
        showDelete={true}
      />;
    }
  }
];

export { PermissionColumns };