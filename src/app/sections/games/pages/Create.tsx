import React, {useEffect, useState} from 'react'
import useDebounce from '../hooks/useDebounce'
import {useNavigate} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Igdb} from '../../../models/game/Igdb'
import {createGameIgdb, getIgdb} from '../core/GameRequests'
import Swal from 'sweetalert2'
import {KTCard, KTCardBody, KTCardHeader} from '../../../helpers/components'
import {useMcApp} from '../../../modules/general/McApp'
import {generatePageTitle} from '../../../helpers/pageTitleGenerator'
import {Sections} from '../../../helpers/sections'
import {PageTypes} from '../../../helpers/variables'
import {Col, Row} from 'react-bootstrap'
import clsx from 'clsx'
import GameCreateIgdb from './GameCreateIgdb'
import GameCreateTraditional from './GameCreateTraditional'

const GameCreate = () => {
  const [gameCreateType, setGameCreateType] = useState<number>(1)

  const mcApp = useMcApp()

  useEffect(() => {
    mcApp.setPageTitle(generatePageTitle(Sections.GAMES, PageTypes.CREATE))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <KTCard>
      <KTCardHeader
        text='Create New Game'
        icon='fa-regular fa-plus'
        icon_style='fs-3 text-success'
      />

      <KTCardBody className='py-4'>
        <div className='d-flex flex-column pt-5'>
          <Row>
            <Col lg={6}>
              <div
                className={clsx('bg-active-mc-secondary cursor-pointer mb-5', {
                  active: gameCreateType === 1,
                })}
                onClick={(event) => setGameCreateType(1)}>
                <div
                  className={clsx(
                    'align-items-center p-5 text-center bg-secondary bg-active-mc-secondary text-mc-primary text-active-white',
                    {active: gameCreateType === 1}
                  )}>
                  <span className='d-flex flex-column'>
                    <span className='fw-bolder fs-6'>Twitch Game Search</span>

                    <span className='fs-7'>Search igdb database for games.</span>
                  </span>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div
                className={clsx('bg-active-mc-secondary cursor-pointer mb-5', {
                  active: gameCreateType === 2,
                })}
                onClick={(event) => setGameCreateType(2)}>
                <div
                  className={clsx(
                    'align-items-center p-5 text-center bg-secondary bg-active-mc-secondary text-mc-primary text-active-white',
                    {active: gameCreateType === 2}
                  )}>
                  <span className='d-flex flex-column'>
                    <span className='fw-bolder fs-6'>Traditional Games??</span>

                    <span className='fs-7'>Any game that can't be find on igdb maybe?.</span>
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          {gameCreateType === 1 ? <GameCreateIgdb /> : <GameCreateTraditional />}
        </div>
      </KTCardBody>
    </KTCard>
  )
}

export default GameCreate
