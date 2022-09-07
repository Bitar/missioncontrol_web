import React, {useEffect, useState} from 'react'
import {Game} from '../../../models/game/Game'
import {Navigate, Outlet, Route, Routes, useParams} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {getGameById} from '../core/GameRequests'
import {GameEdit} from './GameEdit'
import {GameInfo} from '../GameInfo'
import {GameModes} from './GameModes'

const GameView: React.FC = () => {
  const [game, setGame] = useState<Game | undefined>()
  const params = useParams()

  const gameViewBreadCrumbs: Array<PageLink> = [
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
    {
      title: game?.title || '',
      path: '/games/' + params.id + '/overvie',
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
    // getGames
    getGameById(params.id).then((response) => {
      setGame(response)
    })
  }, [params.id])

  return (
    <>
      <Routes>
        <Route
          element={
            <>
              <GameInfo game={game} />
              <Outlet />
            </>
          }
        >
          <Route
            path='overview'
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
                <GameModes game={game} setGame={setGame} />
              </>
            }
          />
          <Route
            path='settings'
            element={
              <>
                <PageTitle breadcrumbs={gameViewBreadCrumbs}>Settings</PageTitle>
                <GameEdit game={game} setGame={setGame} />
              </>
            }
          />
          <Route index element={<Navigate to={'/games/' + params.id + '/overview'} />} />
        </Route>
      </Routes>
    </>
  )
}

export {GameView}
