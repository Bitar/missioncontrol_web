import React, {useEffect, useState} from 'react'
import {ActivityForm} from '../models/ActivityForm'
import {initialActivityFormByActivity} from '../models/ActivityForm'
import {KTCard, KTCardBody, KTCardHeader} from '../../../helpers/components'
import {useActivity} from '../core/contexts/ActivityContext'
import {getAllGameModes} from '../../games/core/GameRequests'
import {GameMode} from '../../../models/game/GameMode'
import {ID} from '../../../helpers/crud-helper/models'
import Nav from 'react-bootstrap/Nav'
import {Tab} from 'react-bootstrap'
import {ActivityFormContext} from '../core/contexts/ActivityFormContext'
import {
  EntryFeeDetail,
  GameDetail,
  GeneralDetail,
  LocationDetail,
  ScheduleDetail,
  TeamDetail,
} from '../partials/activity-form-steps'

const ActivitySettings = () => {
  const {activity} = useActivity()
  const [activityForm, setActivityForm] = useState<ActivityForm>(
    initialActivityFormByActivity(activity)
  )

  const [gameModes, setGameModes] = useState<GameMode[]>()

  useEffect(() => {
    setActivityForm(initialActivityFormByActivity(activity))

    if (activity?.game?.id) {
      updateModes(activity.game.id)
    }
  }, [activity])

  const updateModes = (gameId?: ID) => {
    getAllGameModes(gameId).then((response) => {
      setGameModes(response.data)
    })
  }

  const settingsNav = [
    {
      title: 'Details',
      description: 'Basic Details',
      icon: 'fa-duotone fa-file',
    },
    {
      title: 'Game',
      description: 'What game',
      icon: 'fa-duotone fa-gamepad',
    },
    {
      title: 'Schedule',
      description: 'When?',
      icon: 'fa-duotone fa-calendar-range',
    },
    {
      title: 'Team',
      description: 'Who with who',
      icon: 'fa-duotone fa-people-group',
    },
    {
      title: 'Entry',
      description: 'Can anyone join?',
      icon: 'fa-duotone fa-ticket',
    },
    {
      title: 'Location',
      description: 'Where to be played',
      icon: 'fa-duotone fa-location-dot',
    },
  ]

  return (
    <KTCard className='mb-5'>
      <KTCardHeader text={'Settings'} className='bg-mc-secondary' text_color='white' />
      <KTCardBody>
        <Tab.Container defaultActiveKey='settingsNav-0'>
          <div className='row'>
            <div className='col-lg-4 col-xl-3'>
              <Nav variant='pills' className='flex-column settings-nav'>
                {settingsNav.map((settings, index) => (
                  <Nav.Item key={`settings-nav-${index}`} className='mb-5'>
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
              <ActivityFormContext.Provider
                value={{
                  activityForm,
                  setActivityForm,
                  gameModes,
                  setGameModes,
                }}
              >
                <Tab.Content>
                  <Tab.Pane eventKey='settingsNav-0'>
                    <GeneralDetail />
                  </Tab.Pane>
                  <Tab.Pane eventKey='settingsNav-1'>
                    <GameDetail />
                  </Tab.Pane>
                  <Tab.Pane eventKey='settingsNav-2'>
                    <ScheduleDetail />
                  </Tab.Pane>
                  <Tab.Pane eventKey='settingsNav-3'>
                    <TeamDetail />
                  </Tab.Pane>
                  <Tab.Pane eventKey='settingsNav-4'>
                    <EntryFeeDetail />
                  </Tab.Pane>
                  <Tab.Pane eventKey='settingsNav-5'>
                    <LocationDetail />
                  </Tab.Pane>
                </Tab.Content>
              </ActivityFormContext.Provider>
            </div>
          </div>
        </Tab.Container>
      </KTCardBody>
    </KTCard>
  )
}

export {ActivitySettings}
