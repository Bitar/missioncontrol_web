import React, {FC} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {CommunityIndex} from './CommunityIndex'
import {CommunityCreate} from '../CommunityCreate'
import {CommunityView} from './CommunityView'

const communityBreadCrumbs: Array<PageLink> = [
  {
    title: 'Communities',
    path: '/communities/overview',
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

const CommunityPage: FC = () => {
  return (
    <Routes>
      <Route
        path='/overview'
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
            <CommunityView />
          </>
        }
      />
      <Route index element={<Navigate to='/communities/overview' replace={true} />} />
    </Routes>
  )
}

export {CommunityPage}
