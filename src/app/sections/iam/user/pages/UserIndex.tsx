import React from 'react'
import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {QueryResponseProvider} from '../../../../modules/table/QueryResponseProvider'
import {getUsers} from '../core/UserRequests'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {UserTable} from './UserTable'
import {KTCardHeader} from '../../../../helpers/components'
import {Actions} from '../../../../helpers/variables'
import {UserFilter} from '../UserFilter'

const UserIndex = () => (
  <QueryRequestProvider>
    <QueryResponseProvider id={QUERIES.USERS_LIST} requestFunction={getUsers}>
      <ListViewProvider>
        <KTCard>
          <KTCardHeader
            text='All Users'
            icon='fa-regular fa-list'
            icon_style='fs-3 text-primary'
            actions={[{type: Actions.CREATE, url: '/iam/users'}]}
          />
          <KTCardBody>
            <UserFilter />
            <UserTable />
          </KTCardBody>
        </KTCard>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export { UserIndex };
