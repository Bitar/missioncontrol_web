import {Navigate, Route, Routes} from 'react-router-dom'
import {UserIndex} from './UserIndex'
import {UserCreate} from '../UserCreate'
import {PageLink, PageTitle} from '../../../../../_metronic/layout/core'
import React from 'react'
import {UserView} from './UserView'

const usersBreadCrumbs: Array<PageLink> = [
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
]

const UserPage: React.FC = () => {
  return (
    <Routes>
      <Route
        path='/overview'
        element={
          <>
            <PageTitle breadcrumbs={usersBreadCrumbs}>{'Overview'}</PageTitle>
            <UserIndex />
          </>
        }
      />
      <Route
        path='/create'
        element={
          <>
            <PageTitle breadcrumbs={usersBreadCrumbs}>{'Add User'}</PageTitle>
            <UserCreate />
          </>
        }
      />
      {/*<Route path='/:id/edit' element={*/}
      {/*    <>*/}
      {/*        <PageTitle breadcrumbs={usersBreadCrumbs}>{"Update User"}</PageTitle>*/}
      {/*        <UserEdit/>*/}
      {/*    </>*/}
      {/*}/>*/}
      <Route
        path='/:id/*'
        element={
          <>
            <PageTitle breadcrumbs={usersBreadCrumbs}>{'View User'}</PageTitle>
            <UserView />
          </>
        }
      />
      <Route index element={<Navigate to='/users/overview' replace={true} />} />
    </Routes>
  )
}

export {UserPage}
