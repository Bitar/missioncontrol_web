import {KTCard, QUERIES} from '../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import {QueryResponseProvider} from '../../../modules/table/QueryResponseProvider'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'
import {getCommunities} from '../core/CommunityRequests'
import {TableHeader} from '../../../modules/table/TableHeader'
import {CommunityTable} from '../CommunityTable'

const CommunityList = () => {
  return (
    <>
      <KTCard>
        <TableHeader name='Community' url='/communities' />
        <CommunityTable />
      </KTCard>
    </>
  )
}

const CommunityIndex = () => (
  <QueryRequestProvider>
    <QueryResponseProvider id={QUERIES.COMMUNITIES_LIST} requestFunction={getCommunities}>
      <ListViewProvider>
        <CommunityList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {CommunityIndex}