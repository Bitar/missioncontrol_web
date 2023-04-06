import {Column} from 'react-table'
import {TextCell} from '../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../modules/table/columns/CustomHeader'
import {Community} from '../../../models/community/Community'
import {QUERIES} from '../../../../_metronic/helpers'
import {ActionsCell} from '../../../modules/table/columns/ActionsCell'
import {TextImageCell} from '../../../modules/table/columns/TextImageCell'
import React from 'react'
import {communityStatus} from '../../../helpers/CommunityHelper'
import {useAccessControl} from '../../../modules/auth/core/AuthPermission'

const communitiesColumns: ReadonlyArray<Column<Community>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    defaultCanSort: true,
    Cell: ({...props}) => (
      <TextImageCell
        dImage={props.data[props.row.index].logo}
        dText={props.data[props.row.index].name}
        link={`/communities/${props.data[props.row.index].id}`}
      />
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Members' className='min-w-125px' />,
    id: 'users_count',
    defaultCanSort: true,
    Cell: ({...props}) => (
      <TextCell dObject={props.data[props.row.index].additional_data.players_count} />
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Status' className='min-w-125px' />,
    id: 'status',
    defaultCanSort: true,
    Cell: ({...props}) => {
      const {color, text} = communityStatus(props.data[props.row.index]?.status)

      return (
        <div className='d-flex align-items-center'>
          <div className='d-flex flex-column'>
            <span className={`badge badge-${color}`}>{text}</span>
          </div>
        </div>
      )
    },
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Activities In Progress' className='min-w-125px' />
    ),
    id: 'activities_count',
    defaultCanSort: true,
    Cell: ({...props}) => (
      <TextCell dObject={props.data[props.row.index].additional_data.activities_in_progress} />
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Actions' className='min-w-125px' />,
    id: 'actions',
    Cell: ({...props}) => {
      const accessControl = useAccessControl()

      return (
        <ActionsCell
          id={props.data[props.row.index].id}
          path={'communities'}
          showView={accessControl.userCan('view-communities')}
          showDelete={accessControl.userCan('manage-communities')}
          queryKey={QUERIES.COMMUNITIES_LIST}
        />
      )
    },
  },
]

export {communitiesColumns}
