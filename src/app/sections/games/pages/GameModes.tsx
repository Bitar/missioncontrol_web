import React, {FC, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {getAllGameModes} from '../core/GameRequests'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {updateData} from '../../../helpers/form/FormHelper'
import { useGame } from '../core/GameContext'

const GameModes: FC = () => {
  const {game, setGame} = useGame();
  const params = useParams()

  useEffect(() => {
    if (game?.game_modes?.length === 0) {
      getAllGameModes(params.id).then((response) => {
        updateData(
          {
            game_modes: response.data,
          },
          setGame,
          game
        )
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  return (
    <>
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>
          Game Modes
          <span className='fs-6 text-gray-400 fw-bold ms-1'>{game?.game_modes?.length} modes</span>
        </h3>
      </div>
      <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>
        {game?.game_modes?.map((gameMode) => (
          <div key={gameMode?.id} className='col-12 col-xl'>
            <KTCard className='h-100'>
              <KTCardBody className='d-flex justify-content-center flex-column p-8'>
                <Link to={'/games/' + 3 + '/modes/'}></Link>
                <span className='text-gray-800 d-flex flex-column'>
                  <div className='fs-5 fw-bolder mb-2'>{gameMode?.name}</div>
                </span>
                <div className='fs-7 fw-bold text-gray-400 mt-auto mb-2'>
                  {gameMode?.description}
                </div>
                <div className='fs-7 fw-bold text-gray-400 mt-auto'>
                  Players:{' '}
                  {gameMode?.min_players === gameMode?.max_players
                    ? gameMode?.min_players
                    : gameMode?.min_players + '-' + gameMode?.max_players}
                </div>
              </KTCardBody>
            </KTCard>
          </div>
        ))}
      </div>
    </>
  )
}

export {GameModes}
