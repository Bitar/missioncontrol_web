import {Column} from 'react-table'
import {TextCell} from '../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../_metronic/helpers'
import {Subscription} from '../../../models/billing/Subscription'

const subscriptionColumns: ReadonlyArray<Column<Subscription>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Id' className='min-w-125px' />,
    id: 'id',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='User' className='min-w-125px' />,
    id: 'user',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].user.name} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Plan' className='min-w-125px' />,
    id: 'plan',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].plan.name} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => (
      <ActionsCell
        id={props.data[props.row.index].id}
        path={'subscriptions'}
        queryKey={QUERIES.SUBSCRIPTIONS_LIST}
        showEdit={false}
      />
    ),
  },
]

export {subscriptionColumns}
