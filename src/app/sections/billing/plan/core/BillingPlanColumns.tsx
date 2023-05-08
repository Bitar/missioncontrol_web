import {Column} from 'react-table'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {Plan} from '../../../../models/billing/Plan'

const BillingPlanColumns: ReadonlyArray<Column<Plan>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].name} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Description' className='min-w-125px' />
    ),
    id: 'description',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].description} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Type' className='min-w-125px' />,
    id: 'type',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].type} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Price' className='min-w-125px' />,
    id: 'price',
    Cell: ({...props}) => <TextCell dObject={'$' + props.data[props.row.index].price} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Launch' className='min-w-125px' />,
    id: 'launch',
    Cell: ({...props}) => <TextCell dObject={'$' + props.data[props.row.index].launch} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Actions' className='min-w-100px' />,
    id: 'actions',
    Cell: ({...props}) => (
      <ActionsCell
        id={props.data[props.row.index].id}
        path={'plans'}
        queryKey={QUERIES.PLANS_LIST}
      />
    ),
  },
]

export {BillingPlanColumns}
