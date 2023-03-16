import React, {useEffect, useState} from 'react'
import {Game} from '../../../models/game/Game'
import {Outlet, Route, Routes, useParams} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../layout/core'
import {getGameById} from '../core/GameRequests'
import {GameSettings} from './GameSettings'
import {GameInfo} from '../partials/GameInfo'
import {GameModes} from './GameModes'
import {GameContext} from '../core/GameContext'
import {Restricted} from '../../../modules/auth/core/AuthPermission'

const GameView: React.FC = () => {
  const [game, setGame] = useState<Game | undefined>()
  const params = useParams()

  const gameViewBreadCrumbs: Array<PageLink> = [
    {
      title: 'Games',
      path: '/games',
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
      title: game?.title || '',
      path: '/games/' + params.id,
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
    getGameById(params.id).then((response) => {
      setGame(response)
    })
  }, [params.id])

  const updateGame = () => {
    getGameById(params.id).then((response) => {
      setGame(response)
    })
  }

  return (
    <GameContext.Provider
      value={{
        game,
        setGame,
        updateGame,
      }}
    >
      <Routes>
        <Route
          element={
            <>
              <GameInfo />
              <Outlet />
            </>
          }
        >
          <Route
            index
            element={
              <>
                <PageTitle breadcrumbs={gameViewBreadCrumbs}>Overview</PageTitle>
                {/*<Overview />*/}
              </>
            }
          />
          <Route
            path='modes'
            element={
              <>
                <PageTitle breadcrumbs={gameViewBreadCrumbs}>Game Modes</PageTitle>
                <GameModes />
              </>
            }
          />
          <Route
            path='settings'
            element={
              <Restricted to='manage-games'>
                <PageTitle breadcrumbs={gameViewBreadCrumbs}>Settings</PageTitle>
                <GameSettings />
              </Restricted>
            }
          />
        </Route>
      </Routes>
    </GameContext.Provider>
  )
}

export {GameView}
