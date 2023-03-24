import {Column} from 'react-table'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import React from 'react'
import {ActivityRegistration} from '../../../../models/activity/ActivityRegistration'
import {BadgeCell} from '../../../../modules/table/columns/BadgeCell'
import {getTeamStatus} from '../../../../models/squad/Team'
import {QUERIES} from '../../../../helpers/crud-helper/consts'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {TextImageCell} from '../../../../modules/table/columns/TextImageCell'
import {useActivity} from '../contexts/ActivityContext'
import { Announcement } from "../../../../models/announcement/Announcements";
import { useAccessControl } from "../../../../modules/auth/core/AuthPermission";

const ActivityAnnouncementsColumns: ReadonlyArray<Column<Announcement>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'title',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].title} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Email' />,
    id: 'body',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].body} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Announcer' />,
    id: 'announcer',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].user?.name} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Actions' />,
    id: 'actions',
    Cell: ({...props}) => {
      const {activity} = useActivity()
      const accessControl = useAccessControl()

      return (
        <ActionsCell
          id={props.data[props.row.index].id}
          path={`activities/${activity?.id}/announcements`}
          queryKey={QUERIES.ACTIVITIES_ANNOUNCEMENT_LIST}
          showEdit={accessControl.userCan('manage-activities')}
          editPage={true}
          showDelete={accessControl.userCan('manage-activities')}
        />
      )
    },
  },
]

export {ActivityAnnouncementsColumns}
