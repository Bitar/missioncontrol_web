import React, {useEffect, useMemo} from 'react'
import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {
  QueryResponseProvider,
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {getRoles} from '../core/RoleRequests'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {KTCardHeader} from '../../../../helpers/components'
import {useMcApp} from '../../../../modules/general/McApp'
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator'
import {Sections} from '../../../../helpers/sections'
import {PageTypes} from '../../../../helpers/variables'
import {CreateCardAction} from '../../../../components/misc/CardAction'
import {rolesColumns} from '../core/RoleColumns'
import {McTable} from '../../../../components/McTable'

const RoleIndex = () => {
  const mcApp = useMcApp()

  useEffect(() => {
    mcApp.setPageTitle(generatePageTitle(Sections.IAM_ROLES, PageTypes.INDEX))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <QueryRequestProvider>
      <QueryResponseProvider id={QUERIES.ROLES_LIST} requestFunction={getRoles}>
        <ListViewProvider>
          <KTCard>
            <KTCardHeader
              text='All Roles'
              icon='fa-regular fa-list'
              icon_style='fs-3 text-primary'
              actions={[new CreateCardAction('/iam/roles', 'manage-iam')]}
            />
            <KTCardBody>
              <RoleTable />
            </KTCardBody>
          </KTCard>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  )
}

export default RoleIndex

const RoleTable = () => {
  const roles = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => roles, [roles])
  const columns = useMemo(() => rolesColumns, [])

  return (
    <McTable
      data={data}
      columns={columns}
      model={roles.length > 0 ? roles[0] : null}
      isLoading={isLoading}
    />
  )
}
