import {Column} from 'react-table'
import {TextCell} from '../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../modules/table/columns/ActionsCell'
import {QUERIES, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Game} from '../../../models/game/Game'

const gamesColumns: ReadonlyArray<Column<Game>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Title' className='min-w-125px' />,
    id: 'title',
    Cell: ({...props}) => (
      <div className='d-flex align-items-center'>
        <div className='w-75px me-3'>
          <img
            src={toAbsoluteUrl(props.data[props.row.index].image)}
            alt=''
            className='w-100 h-100vh rounded'
          />
        </div>
        <div className='d-flex flex-column'>
          <span className='text-gray-800 mb-1'>{props.data[props.row.index].title}</span>
        </div>
      </div>
    ),
  },

  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Crossplay' className='min-w-125px' />
    ),
    id: 'is_crossplay',
    Cell: ({...props}) => (
      <TextCell dObject={props.data[props.row.index].is_crossplay === 0 ? 'True' : 'False'} />
    ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Platforms' className='min-w-125px' />
    ),
    id: 'platforms',
    Cell: ({...props}) => (
      <TextCell
        dObject={props.data[props.row.index].platforms.map((platform: {abbreviation: string}) => {
          return platform.abbreviation + ' '
        })}
      />
    ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => (
      <ActionsCell
        id={props.data[props.row.index].id}
        path={'games'}
        queryKey={QUERIES.GAMES_LIST}
        showEdit={true}
      />
    ),
  },
]

export {gamesColumns}
