import React from 'react'
import {KTCard, KTCardBody, QUERIES} from '../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import {PermissionTable} from './PermissionTable'
import {getPermissions} from './core/PermissionRequests'
import {QueryResponseProvider} from '../../../modules/table/QueryResponseProvider'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'
import {Actions} from '../../../helpers/variables'
import {KTCardHeader} from '../../../helpers/components'

const PermissionIndex = () => (
  <QueryRequestProvider>
    <QueryResponseProvider id={QUERIES.PERMISSIONS_LIST} requestFunction={getPermissions}>
      <ListViewProvider>
        <KTCard>
          <KTCardHeader
            text='All Permissions'
            icon='fa-regular fa-list'
            icon_style='fs-3 text-primary'
            actions={[{type: Actions.CREATE, url: '/iam/permissions'}]}
          />
          <KTCardBody>
            <PermissionTable />
          </KTCardBody>
        </KTCard>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export { PermissionIndex };
