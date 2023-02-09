import React, {useEffect, useState} from 'react'
import {getUserById} from '../core/UserRequests'
import {Outlet, Route, Routes, useParams} from 'react-router-dom'
import {User} from '../../../../models/iam/User'
import {UserInfo} from '../UserInfo'
import {PageLink, PageTitle} from '../../../../layout/core'
import {UserSettings} from './UserSettings'
import {UserActivities} from './UserActivities'
import {UserTeams} from './UserTeams'
import {SuspenseView} from '../../../../layout/SuspenseView'
import {UserContext} from '../core/UserContext'

const UserView: React.FC = () => {
  const [user, setUser] = useState<User | undefined>()
  const params = useParams()

  const userViewBreadCrumbs: Array<PageLink> = [
    {
      title: 'Users',
      path: '/iam/users',
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
      path: '/iam/users/' + params.id,
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
    const query = 'include=roles,admin'
    getUserById(params.id, query).then((response) => {
      setUser(response)
    })
  }, [params.id])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <Routes>
        <Route
          element={
            <>
              <UserInfo />
              <Outlet />
            </>
          }
        >
          <Route
            index
            element={
              <>
                <SuspenseView>
                  <PageTitle breadcrumbs={userViewBreadCrumbs}>Overview</PageTitle>
                </SuspenseView>
              </>
            }
          />
          <Route
            path='/activities'
            element={
              <>
                <SuspenseView>
                  <PageTitle breadcrumbs={userViewBreadCrumbs}>Activities</PageTitle>
                  <UserActivities />
                </SuspenseView>
              </>
            }
          />
          <Route
            path='/teams'
            element={
              <>
                <SuspenseView>
                  <PageTitle breadcrumbs={userViewBreadCrumbs}>Teams</PageTitle>
                  <UserTeams />
                </SuspenseView>
              </>
            }
          />
          <Route
            path='/settings'
            element={
              <>
                <SuspenseView>
                  <PageTitle breadcrumbs={userViewBreadCrumbs}>Settings</PageTitle>
                  {user && <UserSettings />}
                </SuspenseView>
              </>
            }
          />
        </Route>
      </Routes>
    </UserContext.Provider>
  )
}

export {UserView}
