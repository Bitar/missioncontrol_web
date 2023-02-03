import {Navigate, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../layout/core'
import React from 'react'
import {RoleIndex} from '../RoleIndex'
import {RoleCreate} from '../RoleCreate'
import {RoleEdit} from '../RoleEdit'

const rolesBreadCrumbs: Array<PageLink> = [
  {
    title: 'Roles',
    path: '/roles/overview',
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

const RolePage: React.FC = () => {
  return (
    <Routes>
      <Route
        path='/overview'
        element={
          <>
            <PageTitle breadcrumbs={rolesBreadCrumbs}>{'Overview'}</PageTitle>
            <RoleIndex />
          </>
        }
      />
      <Route
        path='/create'
        element={
          <>
            <PageTitle breadcrumbs={rolesBreadCrumbs}>{'Add Role'}</PageTitle>
            <RoleCreate />
          </>
        }
      />
      <Route
        path='/:id/edit'
        element={
          <>
            <PageTitle breadcrumbs={rolesBreadCrumbs}>{'Update Role'}</PageTitle>
            <RoleEdit />
          </>
        }
      />
      <Route index element={<Navigate to='/roles/overview' replace={true} />} />
    </Routes>
  )
}

export default RolePage
