import React, {FC, useMemo, useState} from 'react'
import {KTCard, KTCardBody, QUERIES} from '../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import {
  QueryResponseProvider,
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../modules/table/QueryResponseProvider'
import {getCommunityUsers} from '../core/CommunityRequests'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'
import {CommunityUsersColumns} from '../core/CommunityUsersColumns'
import {useCommunity} from '../CommunityContext'
import {CommunityUserFilters} from '../partials/CommunityUserFilters'
import {KTCardHeader} from '../../../helpers/components'
import {Col, Collapse, Row} from 'react-bootstrap'
import {Actions} from '../../../helpers/variables'
import {McTable} from '../../../components/McTable'

const CommunityUsersTable = () => {
  const communityUsers = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => communityUsers, [communityUsers])
  const columns = useMemo(() => CommunityUsersColumns, [])

  return (
    <McTable
      data={data}
      columns={columns}
      model={communityUsers.length > 0 ? communityUsers[0] : null}
      isLoading={isLoading}
    />
  )
}

const CommunityUsers: FC = () => {
  const {community} = useCommunity()
  const [showFilter, setShowFilter] = useState<boolean>(false)

  const headerActions = [
    {
      type: Actions.FILTER,
      target: 'community-members-list-filter',
      showFilter: showFilter,
      setShowFilter: setShowFilter,
    },
  ]

  return (
    <QueryRequestProvider>
      <QueryResponseProvider
        id={QUERIES.COMMUNITIES_USERS_LIST}
        requestFunction={getCommunityUsers}
        requestId={community?.id}
      >
        <ListViewProvider>
          <KTCard>
            <KTCardHeader
              text='Community Members'
              icon='fa-regular fa-list'
              icon_style='fs-3 text-primary'
              actions={headerActions}
            />
            <KTCardBody>
              <Collapse in={showFilter}>
                <Row id='#community-members-list-filter'>
                  <Col>
                    <CommunityUserFilters />
                  </Col>
                </Row>
              </Collapse>
              <CommunityUsersTable />
            </KTCardBody>
          </KTCard>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  )
}

export {CommunityUsers}
