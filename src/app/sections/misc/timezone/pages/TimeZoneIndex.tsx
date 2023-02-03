import {QueryResponseProvider} from '../../../../modules/table/QueryResponseProvider'
import {KTCard, QUERIES} from '../../../../../_metronic/helpers'
import {getUsers} from '../../../iam/user/core/UserRequests'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import React from 'react'
import {TableHeader} from '../../../../modules/table/TableHeader'

const TimeZoneList = () => (
  <KTCard>
    <TableHeader name='Time Zone' url='/misc/timezones' />
  </KTCard>
)

const TimeZoneIndex = () => (
  <QueryRequestProvider>
    <QueryResponseProvider id={QUERIES.USERS_LIST} requestFunction={getUsers}>
      <ListViewProvider>
        <TimeZoneList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {TimeZoneIndex}
