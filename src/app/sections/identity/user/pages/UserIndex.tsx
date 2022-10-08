import React, {useRef} from 'react'
import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {TableHeader} from '../../../../modules/table/TableHeader'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {QueryResponseProvider} from '../../../../modules/table/QueryResponseProvider'
import {getUsers} from '../core/UserRequests'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {UserTable} from '../UserTable'
import {UserFilter} from '../UserFilter'

const UsersList = () => {
  return (
    <KTCard>
      <TableHeader name='User' url='/users' showFilter={true} />
      <KTCardBody>
        <UserFilter />
        <UserTable />
      </KTCardBody>
    </KTCard>
  )
}

const UserIndex = () => (
  <QueryRequestProvider>
    <QueryResponseProvider id={QUERIES.USERS_LIST} requestFunction={getUsers}>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export { UserIndex };
