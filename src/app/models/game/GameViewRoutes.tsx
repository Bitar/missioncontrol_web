import React, {useEffect, useState} from 'react'
import {Game} from './Game'
import {Outlet, Route, Routes, useParams} from 'react-router-dom'
import {PageLink, PageTitle} from '../../layout/core'
import {getGameById} from '../../sections/games/core/GameRequests'
import {GameInfo} from '../../sections/games/partials/GameInfo'
import {GameModes} from '../../sections/games/pages/GameModes'
import {GameContext} from '../../sections/games/core/GameContext'
import {Restricted} from '../../modules/auth/core/AuthPermission'
import GameSettings from '../../sections/games/pages/Settings'
import { generatePageTitle } from "../../helpers/pageTitleGenerator";
import { Sections } from "../../helpers/sections";
import { PageTypes } from "../../helpers/variables";
import { useMcApp } from "../../modules/general/McApp";

const GameViewRoutes: React.FC = () => {
  const [game, setGame] = useState<Game | undefined>()
  const params = useParams()
  const mcApp = useMcApp()

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

  useEffect(() => {
    if(!game) return;

    mcApp.setPageTitle(generatePageTitle(Sections.GAMES, PageTypes.SHOW, game?.title))
  }, [game])

  return (
    <GameContext.Provider
      value={{
        game,
        setGame,
        updateGame,
      }}>
      <Routes>
        <Route
          element={
            <>
              <GameInfo />
              <Outlet />
            </>
          }>
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

export {GameViewRoutes}
