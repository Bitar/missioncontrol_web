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

const ActivityMembersColumns: ReadonlyArray<Column<ActivityRegistration>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => (
      <TextImageCell
        dImage={props.data[props.row.index].meta?.image}
        dText={props.data[props.row.index].name}
        size={'30'}
      />
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Email' />,
    id: 'email',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].email} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Team' />,
    id: 'team',
    Cell: ({...props}) => <TextImageCell
        dImage={props.data[props.row.index].team?.image}
        dText={props.data[props.row.index].team?.name}
        size={'30'}
    />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Team Status' />,
    id: 'team_status',
    Cell: ({...props}) => {
      const {status, color} = getTeamStatus(props.data[props.row.index].team?.status)
      return <BadgeCell status={status} color={color} align={'left'} />
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Actions' />,
    id: 'actions',
    Cell: ({...props}) => {
      const {activity} = useActivity()

      return (
        <ActionsCell
          id={props.data[props.row.index].id}
          path={`activities/${activity?.id}/members`}
          queryKey={QUERIES.ACTIVITIES_MEMBER_LIST}
          showView={false}
          showDelete={true}
        />
      )
    },
  },
]

export {ActivityMembersColumns}
