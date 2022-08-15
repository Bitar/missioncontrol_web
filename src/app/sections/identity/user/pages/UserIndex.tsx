import React from 'react'
import {KTCard, QUERIES} from '../../../../../_metronic/helpers'
import {TableHeader} from '../../../../modules/table/TableHeader'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {QueryResponseProvider} from '../../../../modules/table/QueryResponseProvider'
import {getUsers} from '../core/UserRequests'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {UserTable} from '../UserTable'

const UsersList = () => (
  <KTCard>
    <TableHeader name='User' url='/users' />
    <UserTable />
  </KTCard>
)

const UserIndex = () => (
  <QueryRequestProvider>
    <QueryResponseProvider id={QUERIES.USERS_LIST} requestFunction={getUsers}>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {UserIndex}
