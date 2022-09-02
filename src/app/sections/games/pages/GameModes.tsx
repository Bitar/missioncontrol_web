import {Game} from '../../../models/game/Game'
import React, {Dispatch, FC, SetStateAction, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {getAllGameModes} from '../core/GameRequests'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {updateData} from '../../../helpers/form/FormHelper'

type Props = {
  game: Game | undefined
  setGame: Dispatch<SetStateAction<Game | undefined>>
}

const GameModes: FC<Props> = ({game, setGame}) => {
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
  }, [params.id])

  // console.log(modes)

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
                <span className='text-gray-800 text-hover-primary d-flex flex-column'>
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

export { GameModes };