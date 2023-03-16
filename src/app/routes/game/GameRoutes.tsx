import React, {FC} from 'react'
import {PageLink, PageTitle} from '../../layout/core'
import {Route, Routes} from 'react-router-dom'
import GameIndex from '../../sections/games/pages/GameIndex'
import {GameCreate} from '../../sections/games/pages/GameCreate'
import {GameView} from '../../sections/games/pages/GameView'
import {SuspenseView} from '../../components/misc/SuspenseView'

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

const GameRoutes: FC = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <SuspenseView>
            <PageTitle breadcrumbs={gameBreadCrumbs}>{'Overview'}</PageTitle>
            <GameIndex />
          </SuspenseView>
        }
      />
      <Route
        path='/create'
        element={
          <SuspenseView>
            <PageTitle breadcrumbs={gameBreadCrumbs}>{'Add Game'}</PageTitle>
            <GameCreate />
          </SuspenseView>
        }
      />
      <Route
        path='/:id/*'
        element={
          <SuspenseView>
            <PageTitle breadcrumbs={gameBreadCrumbs}>{'View Game'}</PageTitle>
            <GameView />
          </SuspenseView>
        }
      />
    </Routes>
  )
}

export default GameRoutes
