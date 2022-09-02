import React, {FC} from 'react'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {Navigate, Route, Routes} from 'react-router-dom'
import {GameIndex} from '../GameIndex'
import {GameCreate} from '../GameCreate'
import {GameView} from './GameView'

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

const GamePage: FC = () => {
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
        path='/:id/*'
        element={
          <>
            <PageTitle breadcrumbs={gameBreadCrumbs}>{'View Game'}</PageTitle>
            <GameView />
          </>
        }
      />
      <Route index element={<Navigate to='/games/overview' replace={true} />} />
    </Routes>
  )
}

export { GamePage };

