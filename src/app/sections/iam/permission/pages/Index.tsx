import React, {useMemo} from 'react'
import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {getPermissions} from '../core/Requests'
import {
  QueryResponseProvider,
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {KTCardHeader} from '../../../../helpers/components'
import PermissionColumns from '../core/PermissionColumns'
import {McTable} from '../../../../components/McTable'
import {CreateCardAction} from '../../../../components/misc/CardAction'

const PermissionIndex = () => (
  <QueryRequestProvider>
    <QueryResponseProvider id={QUERIES.PERMISSIONS_LIST} requestFunction={getPermissions}>
      <ListViewProvider>
        <KTCard>
          <KTCardHeader
            text='All Permissions'
            icon='fa-regular fa-list'
            icon_style='fs-3 text-primary'
            actions={[new CreateCardAction('/iam/permissions', 'manage-iam')]}
          />
          <KTCardBody>
            <PermissionTable />
          </KTCardBody>
        </KTCard>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export default PermissionIndex

const PermissionTable = () => {
  const permissions = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => permissions, [permissions])
  const columns = useMemo(() => PermissionColumns, [])

  return (
    <McTable
      data={data}
      columns={columns}
      model={permissions.length > 0 ? permissions[0] : null}
      isLoading={isLoading}
    />
  )
}
