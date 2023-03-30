import {Route, Routes} from 'react-router-dom'
import UserCreate from '../../../sections/iam/user/pages/Create'
import {PageLink, PageTitle} from '../../../layout/core'
import React from 'react'
import {UserViewRoutes} from './UserViewRoutes'
import {SuspenseView} from '../../../layout/SuspenseView'
import UserIndex from '../../../sections/iam/user/pages/Index'

const usersBreadCrumbs: Array<PageLink> = [
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
]

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <SuspenseView>
            <PageTitle breadcrumbs={usersBreadCrumbs}>{'Overview'}</PageTitle>
            <UserIndex />
          </SuspenseView>
        }
      />
      <Route
        path='/create'
        element={
          <SuspenseView>
            <PageTitle breadcrumbs={usersBreadCrumbs}>{'Add User'}</PageTitle>
            <UserCreate />
          </SuspenseView>
        }
      />
      <Route
        path='/:id/*'
        element={
          <SuspenseView>
            <PageTitle breadcrumbs={usersBreadCrumbs}>{'View User'}</PageTitle>
            <UserViewRoutes />
          </SuspenseView>
        }
      />
    </Routes>
  )
}

export default UserRoutes
