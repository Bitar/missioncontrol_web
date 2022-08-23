import {Navigate, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../../_metronic/layout/core'
import React from 'react'
import {PermissionIndex} from '../PermissionIndex'
import {PermissionCreate} from '../PermissionCreate'
import {PermissionEdit} from '../PermissionEdit'

const permissionsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Permissions',
    path: '/permissions/overview',
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

const PermissionPage: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Routes>
      <Route
        path='/overview'
        element={
          <>
            <PageTitle breadcrumbs={permissionsBreadCrumbs}>{'Overview'}</PageTitle>
            <PermissionIndex />
          </>
        }
      />
      <Route
        path='/create'
        element={
          <>
            <PageTitle breadcrumbs={permissionsBreadCrumbs}>{'Add Permission'}</PageTitle>
            <PermissionCreate />
          </>
        }
      />
      <Route
        path='/:id/edit'
        element={
          <>
            <PageTitle breadcrumbs={permissionsBreadCrumbs}>{'Update Permission'}</PageTitle>
            <PermissionEdit />
          </>
        }
      />
      <Route index element={<Navigate to='/permissions/overview' replace={true} />} />
    </Routes>
  )
}

export {PermissionPage}
