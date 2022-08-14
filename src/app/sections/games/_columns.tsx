import {Column} from 'react-table'
import {TextCell} from '../../modules/table/columns/TextCell'
import {CustomHeader} from '../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../_metronic/helpers'
import {Game} from '../../models/game/Game'
import {ImageCell} from '../../modules/table/columns/ImageCell'

const gamesColumns: ReadonlyArray<Column<Game>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Title' className='min-w-125px' />,
    id: 'title',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].title} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Cover Image' className='min-w-125px' />
    ),
    id: 'image',
    Cell: ({...props}) => <ImageCell dObject={props.data[props.row.index].image} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Description' className='min-w-125px' />
    ),
    id: 'description',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].description} />,
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
      />
    ),
  },
]

export {gamesColumns}
