import React from 'react'
import {KTCard, KTCardBody, QUERIES} from '../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import {RoleTable} from './RoleTable'
import {QueryResponseProvider} from '../../../modules/table/QueryResponseProvider'
import {getRoles} from './core/RoleRequests'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'
import {Actions} from '../../../helpers/variables'
import {KTCardHeader} from '../../../helpers/components'

const RoleIndex = () => (
  <QueryRequestProvider>
    <QueryResponseProvider id={QUERIES.ROLES_LIST} requestFunction={getRoles}>
      <ListViewProvider>
        <KTCard>
          <KTCardHeader
            text='All Roles'
            icon='fa-regular fa-list'
            icon_style='fs-3 text-primary'
            actions={[{type: Actions.CREATE, url: '/iam/roles'}]}
          />
          <KTCardBody>
            <RoleTable />
          </KTCardBody>
        </KTCard>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {RoleIndex}
