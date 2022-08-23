import React, {FC} from 'react'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {Navigate, Route, Routes} from 'react-router-dom'
import {GameIndex} from '../GameIndex'
import {GameCreate} from '../GameCreate'
import {GameEdit} from '../GameEdit'

const gameBreadCrumbs: Array<PageLink> = [
  {
    title: 'Games',
    path: '/games/overview',
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

const GamePage: FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Routes>
      <Route
        path='/overview'
        element={
          <>
            <PageTitle breadcrumbs={gameBreadCrumbs}>{'Overview'}</PageTitle>
            <GameIndex />
          </>
        }
      />
      <Route
        path='/create'
        element={
          <>
            <PageTitle breadcrumbs={gameBreadCrumbs}>{'Add Game'}</PageTitle>
            <GameCreate />
          </>
        }
      />
      <Route
        path='/:id/edit'
        element={
          <>
            <PageTitle breadcrumbs={gameBreadCrumbs}>{'Update Game'}</PageTitle>
            <GameEdit />
          </>
        }
      />
      <Route index element={<Navigate to='/games/overview' replace={true} />} />
    </Routes>
  )
}

export {GamePage}
