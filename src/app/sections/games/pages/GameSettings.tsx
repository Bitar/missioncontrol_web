import React, {FC, useEffect, useState} from 'react'
import {useGame} from '../core/GameContext'
import {GameFormType, initGameFormType} from '../../../models/game/GameFormType'
import {KTCard, KTCardBody, KTCardHeader} from '../../../helpers/components'
import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab'
import {GeneralDetail} from '../partials/game-settings/GeneralDetail'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import {QueryResponseProvider} from '../../../modules/table/QueryResponseProvider'
import {QUERIES} from '../../../helpers/crud-helper/consts'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'
import {SuspenseView} from '../../../layout/SuspenseView'
import {getGamePlatforms} from '../core/GamePlatformRequests'
import {PlatformDetail} from '../partials/game-settings/PlatformDetail'

const GameSettings: FC = () => {
  const {game} = useGame()
  const [gameForm, setGameForm] = useState<GameFormType>(initGameFormType(game))

  useEffect(() => {
    setGameForm(initGameFormType(game))
  }, [game])

  const settingsNav = [
    {
      title: 'Details',
      description: 'Basic Details',
      icon: 'fas fa-file',
    },
    {
      title: 'Platforms',
      description: 'Manage game platforms',
      icon: 'fas fa-gamepad',
    },
  ]

  return (
    <>
      <KTCard>
        <KTCardHeader text={'Settings'} className='bg-mc-secondary' text_color='white' />
        <KTCardBody>
          <Tab.Container defaultActiveKey='settingsNav-0'>
            <div className='row'>
              <div className='col-lg-4 col-xl-3'>
                <Nav variant='pills' className='flex-column settings-nav'>
                  {settingsNav.map((settings, index) => (
                    <Nav.Item className='mb-5' key={`nav-item-settings-game-${index}`}>
                      <Nav.Link className='settings-nav-item' eventKey={`settingsNav-${index}`}>
                        <div className='settings-nav-icon w-45px h-45px bg-transparent'>
                          <i className={`${settings.icon} fs-2x text-mc-secondary`}></i>
                        </div>
                        <div className='settings-nav-label'>
                          <span className='settings-nav-title'>{settings.title}</span>
                          <span className='settings-nav-desc'>{settings.description}</span>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </div>
              <div className='col-lg-8 col-xl-9'>
                <Tab.Content>
                  <Tab.Pane eventKey='settingsNav-0'>
                    <GeneralDetail gameForm={gameForm} setGameForm={setGameForm} />
                  </Tab.Pane>
                  <Tab.Pane eventKey='settingsNav-1'>
                    <SuspenseView>
                      {game && (
                        <QueryRequestProvider>
                          <QueryResponseProvider
                            id={QUERIES.GAMES_PLATFORMS_LIST}
                            requestFunction={getGamePlatforms}
                            requestId={game?.id}>
                            <ListViewProvider>
                              <PlatformDetail />
                            </ListViewProvider>
                          </QueryResponseProvider>
                        </QueryRequestProvider>
                      )}
                    </SuspenseView>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </div>
          </Tab.Container>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export {GameSettings}
