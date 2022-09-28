import React, {FC, useEffect, useRef, useState} from 'react'
import {PageLink, PageTitle} from '../../../layout/core'
import {getCommunityById} from '../core/CommunityRequests'
import {Community} from '../models/Community'
import {Navigate, Outlet, Route, Routes, useParams} from 'react-router-dom'
import {CommunityUsers} from './CommunityUsers'
import {CommunityInfo} from '../CommunityInfo'
import {CommunityEdit} from './CommunityEdit'
import {ID} from '../../../../_metronic/helpers'
import {CommunityContext} from '../CommunityContext'
import {User} from '../../identity/user/models/User'

type Props = {
  communityId?: ID
  links?: {text: string; link: string}[]
}

const CommunityView: FC<Props> = ({communityId}) => {
  const [community, setCommunity] = useState<Community | undefined>()
  const [members, setMembers] = useState<User[] | undefined>([])
  const params = useParams()
  const indexLink = useRef('')
  const link = useRef('')
  const links = [
    {
      text: 'Overview',
      link: link.current + '/overview',
    },
    {
      text: 'Members',
      link: link.current + '/members',
    },
  ]

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
      path: '/communities/' + params.communityId + '/overview',
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
    if (params.communityId) {
      getCommunityById(params.communityId).then((response) => {
        setCommunity(response)
      })

      link.current = '/communities/' + params.communityId
      indexLink.current = '/communities/' + params.communityId + '/overview'
    } else {
      getCommunityById(communityId).then((response) => {
        setCommunity(response)
      })

      link.current = '/dashboard'
      indexLink.current = '/dashboard/overview'
    }
  }, [communityId, params.communityId])

  return (
    <CommunityContext.Provider
      value={{
        community,
        setCommunity,
        members,
        setMembers,
      }}
    >
      <Routes>
        <Route
          element={
            community && (
              <>
                <CommunityInfo links={links} />
                <Outlet />
              </>
            )
          }
        >
          <Route
            path='overview'
            element={
              !!params.communityId && (
                <>
                  <PageTitle breadcrumbs={communityViewBreadCrumbs}>Overview</PageTitle>
                  {/*<Overview />*/}
                </>
              )
            }
          />
          {/*<Route*/}
          {/*  path='activities'*/}
          {/*  element={*/}
          {/*    <>*/}
          {/*      <PageTitle breadcrumbs={communityViewBreadCrumbs}>Activities</PageTitle>*/}
          {/*      <CommunityActivities community={community} />*/}
          {/*    </>*/}
          {/*  }*/}
          {/*/>*/}
          <Route
            path='members'
            element={
              <>
                <PageTitle breadcrumbs={communityViewBreadCrumbs}>Members</PageTitle>
                <CommunityUsers />
              </>
            }
          />
          <Route
            path='settings'
            element={
              <>
                <PageTitle breadcrumbs={communityViewBreadCrumbs}>Settings</PageTitle>
                <CommunityEdit />
              </>
            }
          />
          <Route index element={<Navigate to={indexLink.current} />} />
        </Route>
      </Routes>
    </CommunityContext.Provider>
  )
}

export {CommunityView}
