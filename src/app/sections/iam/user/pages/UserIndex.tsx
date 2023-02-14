import React, {useState} from 'react'
import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {QueryResponseProvider} from '../../../../modules/table/QueryResponseProvider'
import {getUsers} from '../core/UserRequests'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {UserTable} from './UserTable'
import {KTCardHeader} from '../../../../helpers/components'
import {Actions} from '../../../../helpers/variables'
import {UserFilter} from '../UserFilter'
import {Col, Collapse, Row} from 'react-bootstrap'

const UserIndex = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false)

  const headerActions = [
    {
      type: Actions.FILTER,
      target: 'users-list-filter',
      showFilter: showFilter,
      setShowFilter: setShowFilter,
    },
    {type: Actions.CREATE, url: '/iam/users'},
  ]

  return (
    <QueryRequestProvider>
      <QueryResponseProvider id={QUERIES.USERS_LIST} requestFunction={getUsers}>
        <ListViewProvider>
          <KTCard>
            <KTCardHeader
              text='All Users'
              icon='fa-regular fa-list'
              icon_style='fs-3 text-primary'
              actions={headerActions}
            />
            <KTCardBody>
              <Collapse in={showFilter}>
                <Row id='#users-list-filter'>
                  <Col>
                    <UserFilter />
                  </Col>
                </Row>
              </Collapse>
            </KTCardBody>
            <UserTable />
          </KTCard>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  )
}

export {UserIndex}
