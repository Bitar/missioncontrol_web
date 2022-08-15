import React from 'react'
import {KTCard, QUERIES} from '../../../../_metronic/helpers'
import {TableHeader} from '../../../modules/table/TableHeader'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import {RoleTable} from './RoleTable'
import {QueryResponseProvider} from '../../../modules/table/QueryResponseProvider'
import {getRoles} from './core/RoleRequests'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'

const RolesList = () => {
  return (
    <>
      <KTCard>
        <TableHeader name='Role' url='/roles' />
        <RoleTable />
      </KTCard>
    </>
  )
}

const RoleIndex = () => (
  <QueryRequestProvider>
    <QueryResponseProvider id={QUERIES.ROLES_LIST} requestFunction={getRoles}>
      <ListViewProvider>
        <RolesList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {RoleIndex}
