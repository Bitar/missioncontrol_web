import React, {FC} from 'react'
import {Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../layout/core'
import CommunityIndex from '../../sections/community/pages/CommunityIndex'
import {CommunityCreate} from '../../sections/community/pages/CommunityCreate'
import {CommunityViewRoutes} from './CommunityViewRoutes'

const communityBreadCrumbs: Array<PageLink> = [
  {
    title: 'Communities',
    path: '/communities',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const CommunityRoutes: FC = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <>
            <PageTitle breadcrumbs={communityBreadCrumbs}>{'Overview'}</PageTitle>
            <CommunityIndex />
          </>
        }
      />
      <Route
        path='/create'
        element={
          <>
            <PageTitle breadcrumbs={communityBreadCrumbs}>{'Add Community'}</PageTitle>
            <CommunityCreate />
          </>
        }
      />
      <Route
        path='/:communityId/*'
        element={
          <>
            <PageTitle breadcrumbs={communityBreadCrumbs}>{'View Community'}</PageTitle>
            <CommunityViewRoutes />
          </>
        }
      />
    </Routes>
  )
}

export default CommunityRoutes
