import React, {useState} from 'react'
import {KTCard, KTCardBody, QUERIES} from '../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import {QueryResponseProvider} from '../../../modules/table/QueryResponseProvider'
import {getActivities} from '../core/requests/ActivityRequests'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'
import {ActivityTable} from '../partials/ActivityTable'
import {ActivityFilter} from '../partials/ActivityFilter'
import {Actions} from '../../../helpers/variables'
import {KTCardHeader} from '../../../helpers/components'
import {Col, Collapse, Row} from 'react-bootstrap'

const ActivityIndex = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false)

  return (
    <QueryRequestProvider>
      <QueryResponseProvider id={QUERIES.ACTIVITIES_LIST} requestFunction={getActivities}>
        <ListViewProvider>
          <KTCard>
            <KTCardHeader
              text='All Activities'
              icon='fa-regular fa-list'
              icon_style='fs-3 text-primary'
              actions={[
                {
                  type: Actions.FILTER,
                  target: 'users-list-filter',
                  showFilter: showFilter,
                  setShowFilter: setShowFilter,
                },
                {type: Actions.CREATE, url: '/activities'},
              ]}
            />
            <KTCardBody>
              <Collapse in={showFilter}>
                <Row id='#users-list-filter'>
                  <Col>
                    <ActivityFilter />
                  </Col>
                </Row>
              </Collapse>
              <ActivityTable />
            </KTCardBody>
          </KTCard>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  )
}

export { ActivityIndex };
