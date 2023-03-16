import React, {useEffect, useMemo, useState} from 'react'
import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {
  QueryResponseProvider,
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {EXPORT_ENDPOINT, getUsers} from '../core/UserRequests'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {KTCardHeader} from '../../../../helpers/components'
import {PageTypes} from '../../../../helpers/variables'
import {UserFilter} from '../partials/UserFilter'
import {useMcApp} from '../../../../modules/general/McApp'
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator'
import {Sections} from '../../../../helpers/sections'
import {
  CreateCardAction,
  ExportCardAction,
  FilterCardAction,
} from '../../../../components/misc/CardAction'
import {usersColumns} from '../core/UserColumns'
import {McTable} from '../../../../components/McTable'

const UserIndex = () => {
  const mcApp = useMcApp()

  useEffect(() => {
    mcApp.setPageTitle(generatePageTitle(Sections.IAM_USERS, PageTypes.INDEX))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [exportQuery, setExportQuery] = useState<string>('')
  const [showFilter, setShowFilter] = useState<boolean>(false)

  return (
    <QueryRequestProvider>
      <QueryResponseProvider id={QUERIES.USERS_LIST} requestFunction={getUsers}>
        <ListViewProvider>
          <KTCard>
            <KTCardHeader
              text='All Users'
              icon='fa-regular fa-list'
              icon_style='fs-3 text-primary'
              actions={[
                new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                new FilterCardAction('users-list-filter', showFilter, setShowFilter),
                new CreateCardAction('/iam/users', 'manage-iam'),
              ]}
            />
            <KTCardBody>
              <UserFilter showFilter={showFilter} setExportQuery={setExportQuery} />

              <UserTable />
            </KTCardBody>
          </KTCard>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  )
}

const UserTable = () => {
  const users = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => users, [users])
  const columns = useMemo(() => usersColumns, [])

  return (
    <McTable
      data={data}
      columns={columns}
      model={users.length > 0 ? users[0] : null}
      isLoading={isLoading}
    />
  )
}

export default UserIndex
