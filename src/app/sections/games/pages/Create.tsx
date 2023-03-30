import React, {useEffect, useState} from 'react'
import useDebounce from '../hooks/useDebounce'
import {useNavigate} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Igdb} from '../../../models/game/Igdb'
import {createGame, getIgdb} from '../core/GameRequests'
import Swal from 'sweetalert2'
import {KTCard, KTCardBody, KTCardHeader} from '../../../helpers/components'

const GameCreate = () => {
  const [games, setGames] = useState<Igdb[] | undefined>([])
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search, 400)
  const navigate = useNavigate()

  useEffect(() => {
    if (debouncedSearch !== undefined && debouncedSearch !== '') {
      getIgdb(search).then((response) => {
        setGames(response.data)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  const sendRequest = (igdb_id: any) => {
    Swal.fire({
      title: 'Are you sure you want to add this Game?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#009ef7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Add it!',
    }).then((result) => {
      if (result.isConfirmed) {
        createGame(igdb_id).then((response) => navigate('/games/' + response?.id))
      } else if (result.isDenied) {
        Swal.fire('Game not added', '', 'error')
      }
    })
  }

  return (
    <KTCard>
      <KTCardHeader
        text='Create New Game'
        icon='fa-regular fa-plus'
        icon_style='fs-3 text-success'
      />

      <KTCardBody className='py-4'>
        <div className='d-flex flex-column pt-5'>
          <div className='row'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'>Game</label>
            <div className='col-lg-8 fv-row'>
              <input
                type='text'
                name='title'
                className='form-control mb-3 mb-lg-0'
                placeholder={'Title'}
                onChange={(e: any) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className='row mt-6 g-6 g-xl-9'>
            {games?.map((game) => (
              <div className='col-md-6 col-lg-4 col-xl-3' key={game.id}>
                <div className='card card-stretch card-bordered mb-5'>
                  <div
                    className='card-header rounded bgi-no-repeat bgi-size-cover bgi-position-y-top bgi-position-x-center align-items-start h-350px'
                    style={{
                      backgroundImage: `url(${
                        game.image ? game.image : toAbsoluteUrl('/media/svg/AstroLearn.svg')
                      })`,
                    }}
                    data-theme='light'
                  />

                  <div className='card-body cursor-pointer' onClick={() => sendRequest(game.id)}>
                    <div className='game-container'>
                      <div className='game-title'>
                        <div className='text-center fs-5 fw-bold text-black mt-auto '>
                          {game.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </KTCardBody>
    </KTCard>
  )
}

export default GameCreate
