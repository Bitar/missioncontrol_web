import {Column} from 'react-table'
import {TextCell} from '../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../modules/table/columns/ActionsCell'
import {QUERIES, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Game} from '../../../models/game/Game'
import {Platform} from '../../../models/game/Platform'
import {Link} from 'react-router-dom'
import {useAccessControl} from '../../../modules/auth/core/AuthPermission'

const GamesColumns: ReadonlyArray<Column<Game>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Title' className='min-w-125px' />,
    id: 'title',
    Cell: ({...props}) => (
      <div className='d-flex align-items-center'>
        <div className='w-100px me-3'>
          <Link to={'/games/' + props.data[props.row.index].id} className='d-block'>
            <img
              src={toAbsoluteUrl(props.data[props.row.index].image)}
              alt={props.data[props.row.index].title + ' poster'}
              className='w-100 h-100vh rounded'
            />
          </Link>
        </div>
        <div className='d-flex flex-column'>
          <Link to={'/games/' + props.data[props.row.index].id} className='d-block'>
            <span className='text-gray-800 mb-1'>{props.data[props.row.index].title}</span>
          </Link>
        </div>
      </div>
    ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Platforms' className='min-w-125px' />
    ),
    id: 'platforms',
    Cell: ({...props}) => (
      <TextCell
        dObject={props.data[props.row.index].platforms?.map((platform: Platform) => (
          <span key={platform.id} className='badge badge-mc-secondary me-2 mb-1'>
            {platform.abbreviation}
          </span>
        ))}
      />
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Actions' className='min-w-100px' />,
    id: 'actions',
    Cell: ({...props}) => {
      const accessControl = useAccessControl()

      return (
        <ActionsCell
          id={props.data[props.row.index].id}
          path={'games'}
          queryKey={QUERIES.GAMES_LIST}
          showView={true}
          showEdit={accessControl.userCan('manage-games')}
          showDelete={accessControl.userCan('manage-games')}
        />
      )
    },
  },
]

export default GamesColumns
