import React, {useEffect, useState} from 'react'
import useDebounce from './hooks/useDebounce'
import {useNavigate} from 'react-router-dom'
import {KTCard, KTCardBody, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Igdb} from '../../models/game/Igdb'
import {getIgdb} from './core/GameRequests'
import {createGame} from './core/GameRequests'
import Swal from 'sweetalert2'
import TextField from '@mui/material/TextField'

const GameCreate = () => {
  const [games, setGames] = useState<Igdb[] | undefined>([])
  const [search, setSearch] = useState<string | ''>('')
  const debouncedSearch = useDebounce(search, 300)
  const navigate = useNavigate()

  useEffect(() => {
    if (debouncedSearch !== undefined && debouncedSearch !== '') {
      getIgdb(search).then((response) => {
        setGames(response.data)
      })
    }
  }, [debouncedSearch, search])

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
    <>
      <KTCard>
        <div className='card-header'>
          <div className='card-title'>
            <span className='card-icon'>
              <i className='las la-plus fs-2' />
            </span>
            <h3 className='card-label'>Add Game</h3>
          </div>
        </div>

        <KTCardBody className='py-4'>
          <div className='d-flex flex-column pt-5'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Game</label>
              <div className='col-lg-8 fv-row'>
                <TextField
                  label='Title'
                  variant='outlined'
                  name='title'
                  className='w-100'
                  size='small'
                  onChange={(e: any) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className='row g-6 g-xl-9'>
            {games?.map((game) => (
              <div className='col-md-6 col-lg-3' key={game.id}>
                <div className='card card-stretch card-bordered mb-5'>
                  <div
                    className='card-header rounded bgi-no-repeat bgi-size-cover bgi-position-y-top bgi-position-x-center align-items-start h-350px'
                    style={{
                      backgroundImage: `url(${
                        game.image ? game.image : toAbsoluteUrl('/media/svg/avatars/AstroLearn.svg')
                      })`,
                    }}
                    data-theme='light'
                  ></div>

                  <div className='card-body'>
                    <div className='game-container' onClick={() => sendRequest(game.id)}>
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
        </KTCardBody>
      </KTCard>
    </>
  )
}

export {GameCreate}
