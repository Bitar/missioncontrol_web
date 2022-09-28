import {Column} from 'react-table'
import {TextCell} from '../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../modules/table/columns/CustomHeader'
import {ActivityStanding} from '../models/ActivityStanding'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import { TeamImage } from "../components/TeamImage";
import React from "react";

const ActivityStandingsColumns: ReadonlyArray<Column<ActivityStanding>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Team' />,
    id: 'image',
    Cell: ({...props}) => (
      <div className='d-flex align-items-center'>
        <TeamImage team={props.data[props.row.index]} className='me-3' />
      </div>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='M' />,
    id: 'matches',
    Cell: ({...props}) => (
      <TextCell
        dObject={props.data[props.row.index].score?.win + props.data[props.row.index].score?.lose}
      />
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='W - L' />,
    id: 'record',
    Cell: ({...props}) => (
      <TextCell
        dObject={
          props.data[props.row.index].score?.win + ' - ' + props.data[props.row.index].score?.lose
        }
      />
    ),
  },
]

export {ActivityStandingsColumns}
