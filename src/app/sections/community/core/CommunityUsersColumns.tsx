import {Column} from 'react-table'
import {CustomHeader} from '../../../modules/table/columns/CustomHeader'
import {TextImageCell} from '../../../modules/table/columns/TextImageCell'
import {TextCell} from '../../../modules/table/columns/TextCell'
import {User} from '../../../models/iam/User'
import {ActionsCell} from '../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../helpers/crud-helper/consts'
import React from 'react'
import {useCommunity} from '../CommunityContext'

const CommunityUsersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => (
      <TextImageCell
        dImage={props.data[props.row.index]?.meta?.image}
        dText={props.data[props.row.index].name}
        link={`/users/${props.data[props.row.index].id}`}
        dExtraText={props.data[props.row.index].email}
        size={'30'}
      />
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Username' className='min-w-125px' />,
    id: 'username',
    Cell: ({...props}) => (
      <TextCell
        dObject={
          props.data[props.row.index]?.meta?.username + '#' + props.data[props.row.index]?.meta?.rng
        }
      />
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Actions' />,
    id: 'actions',
    Cell: ({...props}) => {
      const {community} = useCommunity()

      return (
        <ActionsCell
          id={props.data[props.row.index].id}
          path={`communities/${community?.id}/users`}
          queryKey={QUERIES.ACTIVITIES_MEMBER_LIST}
          showView={false}
          showDelete={true}
        />
      )
    },
  },
]

export {CommunityUsersColumns}
