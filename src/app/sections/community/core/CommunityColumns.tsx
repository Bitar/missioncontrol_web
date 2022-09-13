import {Column} from 'react-table'
import {TextCell} from '../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../modules/table/columns/CustomHeader'
import {Community} from '../models/Community'
import {QUERIES} from '../../../../_metronic/helpers'
import {ActionsCell} from '../../../modules/table/columns/ActionsCell'
import {TextImageCell} from '../../../modules/table/columns/TextImageCell'
import React from 'react'
import {communityAccessType} from '../../../helpers/CommunityHelper'

const communitiesColumns: ReadonlyArray<Column<Community>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => (
      <TextImageCell
        dImage={props.data[props.row.index].logo}
        dText={props.data[props.row.index].name}
        link={`/communities/${props.data[props.row.index].id}`}
      />
    ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Is Featured' className='min-w-125px' />
    ),
    id: 'is_featured',
    Cell: ({...props}) => (
      <TextCell dObject={props.data[props.row.index].is_featured ? 'Yes' : 'No'} />
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Members' className='min-w-125px' />,
    id: 'members',
    Cell: ({...props}) => (
      <TextCell dObject={props.data[props.row.index].additional_data.players_count} />
    ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Access Type' className='min-w-125px' />
    ),
    id: 'access_type',
    Cell: ({...props}) => {
      const {color, text} = communityAccessType(props.data[props.row.index]?.access?.type)

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
    Cell: ({...props}) => (
      <TextCell dObject={props.data[props.row.index].additional_data.activities_in_progress} />
    ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end min-w-125px' />
    ),
    id: 'actions',
    Cell: ({...props}) => (
      <ActionsCell
        id={props.data[props.row.index].id}
        path={'communities'}
        showView={true}
        showEdit={false}
        showDelete={false}
        queryKey={QUERIES.COMMUNITIES_LIST}
      />
    ),
  },
]

export {communitiesColumns}
