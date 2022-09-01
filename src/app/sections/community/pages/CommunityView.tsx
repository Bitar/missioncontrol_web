import React, {useEffect, useState} from 'react'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {getCommunityById} from '../core/CommunityRequests'
import {Community} from '../models/Community'
import {Navigate, Outlet, Route, Routes, useParams} from 'react-router-dom'
import {CommunityUsers} from './CommunityUsers'
import {CommunityInfo} from '../CommunityInfo'
import {CommunityEdit} from './CommunityEdit'
import {CommunityActivities} from './CommunityActivities'

const CommunityView: React.FC = () => {
  const [community, setCommunity] = useState<Community | undefined>()
  const params = useParams()

  const communityViewBreadCrumbs: Array<PageLink> = [
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
    {
      title: community?.name || '',
      path: '/communities/' + params.id + '/overview',
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

  useEffect(() => {
    getCommunityById(params.id).then((response) => {
      setCommunity(response)
    })
  }, [params.id])

  return (
    <Routes>
      <Route
        element={
          <>
            <CommunityInfo community={community} />
            <Outlet />
          </>
        }
      >
        <Route
          path='overview'
          element={
            <>
              <PageTitle breadcrumbs={communityViewBreadCrumbs}>Overview</PageTitle>
              {/*<Overview />*/}
            </>
          }
        />
        <Route
          path='activities'
          element={
            <>
              <PageTitle breadcrumbs={communityViewBreadCrumbs}>Activities</PageTitle>
              <CommunityActivities community={community} />
            </>
          }
        />
        <Route
          path='members'
          element={
            <>
              <PageTitle breadcrumbs={communityViewBreadCrumbs}>Members</PageTitle>
              {/* TODO: Work on the members tab to be a separate component*/}
              <CommunityUsers community={community} />
            </>
          }
        />
        <Route
          path='settings'
          element={
            <>
              <PageTitle breadcrumbs={communityViewBreadCrumbs}>Settings</PageTitle>
              <CommunityEdit community={community} setCommunity={setCommunity} />
            </>
          }
        />
        <Route index element={<Navigate to={'/communities/' + params.id + '/overview'} />} />
      </Route>
    </Routes>
  )
}

export {CommunityView}
