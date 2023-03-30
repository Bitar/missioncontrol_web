import {Column} from 'react-table'
import React from 'react'
import {TextCell} from '../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../modules/table/columns/CustomHeader'
import {useCommunity} from './CommunityContext'
import {useAccessControl} from '../../../modules/auth/core/AuthPermission'
import {QUERIES} from '../../../helpers/crud-helper/consts'
import {ActionsCell} from '../../../modules/table/columns/ActionsCell'
import {Announcement} from '../../../models/announcement/Announcements'

const CommunityAnnouncementsColumns: ReadonlyArray<Column<Announcement>> = [
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
      const {community, link} = useCommunity()
      const accessControl = useAccessControl()

      let formattedLink = link?.slice(1)

      return (
        <ActionsCell
          id={props.data[props.row.index].id}
          path={`${formattedLink}/announcements`}
          queryKey={QUERIES.COMMUNITIES_ANNOUNCEMENT_LIST}
          showEdit={accessControl.userCan('manage-communities')}
          editPage={true}
          showDelete={accessControl.userCan('manage-communities')}
          deletePath={`communities/${community?.id}/announcements`}
        />
      )
    },
  },
]

export default CommunityAnnouncementsColumns
