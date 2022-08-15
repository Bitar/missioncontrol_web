import React, {useEffect, useState} from 'react'
import {getUserById} from '../core/UserRequests'
import {Navigate, Outlet, Route, Routes, useParams} from 'react-router-dom'
import {User} from '../models/User'
import {UserInfo} from '../UserInfo'
import {PageLink, PageTitle} from '../../../../../_metronic/layout/core'
import {UserEdit} from '../UserEdit'
import {UserActivities} from './UserActivities'
import {UserTeams} from './UserTeams'

const UserView: React.FC = () => {
  const [user, setUser] = useState<User | undefined>()
  const params = useParams()

  const userViewBreadCrumbs: Array<PageLink> = [
    {
      title: 'Users',
      path: '/users/overview',
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
      title: user?.name || '',
      path: '/users/' + params.id + '/overview',
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
    const query = 'include=roles'
    getUserById(params.id, query).then((response) => {
      setUser(response)
    })
  }, [params.id])

  return (
    <Routes>
      <Route
        element={
          <>
            <UserInfo user={user} />
            <Outlet />
          </>
        }
      >
        <Route
          path='/overview'
          element={
            <>
              <PageTitle breadcrumbs={userViewBreadCrumbs}>Overview</PageTitle>
            </>
          }
        />
        <Route
          path='/activities'
          element={
            <>
              <PageTitle breadcrumbs={userViewBreadCrumbs}>Activities</PageTitle>
              <UserActivities />
            </>
          }
        />
        <Route
          path='/teams'
          element={
            <>
              <PageTitle breadcrumbs={userViewBreadCrumbs}>Teams</PageTitle>
              <UserTeams />
            </>
          }
        />
        <Route
          path='/settings'
          element={
            <>
              <PageTitle breadcrumbs={userViewBreadCrumbs}>Settings</PageTitle>
              <UserEdit user={user} setUser={setUser} />
            </>
          }
        />
        <Route index element={<Navigate to={'/users/' + params.id + '/overview'} />} />
      </Route>
    </Routes>
  )
}

export {UserView}
