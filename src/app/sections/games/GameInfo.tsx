import {FC} from 'react'
import {Game} from '../../models/game/Game'
import {Link, useLocation} from 'react-router-dom'

type Props = {
  game: Game | undefined
}

const GameInfo: FC<Props> = ({game}) => {
  const location = useLocation()

  return (
    <>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='me-7 mb-4'>
              <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                <img src={game?.image} alt={game?.title} />
              </div>
            </div>

            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-2'>
                    <div className='text-gray-800 fs-2 fw-bolder me-1'>{game?.title}</div>
                  </div>

                  <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                    {/*{community?.contact && (*/}
                    {/*  <>*/}
                    {/*    <div className='d-flex align-items-center text-gray-400 me-5 mb-2'>*/}
                    {/*      <KTSVG*/}
                    {/*        path='/media/icons/duotune/com006.svg'*/}
                    {/*        className='svg-icon-4 me-1'*/}
                    {/*      />*/}
                    {/*      {community?.contact?.name}*/}
                    {/*    </div>*/}

                    {/*    <a*/}
                    {/*      href='mailto:`{community.contact?.email}`'*/}
                    {/*      className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'*/}
                    {/*    >*/}
                    {/*      <KTSVG*/}
                    {/*        path='/media/icons/duotune/com011.svg'*/}
                    {/*        className='svg-icon-4 me-1'*/}
                    {/*      />*/}
                    {/*      {community?.contact?.email}*/}
                    {/*    </a>*/}
                    {/*  </>*/}
                    {/*)}*/}

                    {/*{community?.address && (*/}
                    {/*  <div className='d-flex align-items-center text-gray-400 mb-2'>*/}
                    {/*    <KTSVG path='/media/icons/duotune/gen018.svg' className='svg-icon-4 me-1' />*/}
                    {/*    {community?.address?.city}*/}
                    {/*  </div>*/}
                    {/*)}*/}
                  </div>
                </div>
                {/*<div className='card-toolbar'>*/}
                {/*  <Link className='btn btn-sm btn-primary' to='/activity/create'>*/}
                {/*    <KTSVG path='/media/icons/duotune/arr075.svg' className='svg-icon-2' />*/}
                {/*    New Activity*/}
                {/*  </Link>*/}
                {/*</div>*/}
              </div>

              <div className='d-flex flex-wrap flex-stack'>
                <div className='d-flex flex-column flex-grow-1 pe-8'>
                  <div className='d-flex flex-wrap'>
                    <div className='d-flex text-gray-600  mb-1'>{game?.description}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='d-flex overflow-auto h-55px'>
            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/games/' + game?.id + '/overview' && 'active')
                  }
                  to={'/games/' + game?.id + '/overview'}
                >
                  Overview
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/games/' + game?.id + '/modes' && 'active')
                  }
                  to={'/games/' + game?.id + '/modes'}
                >
                  Game Modes
                </Link>
              </li>
              {/*<li className='nav-item'>*/}
              {/*  <Link*/}
              {/*    className={*/}
              {/*      `nav-link text-active-primary me-6 ` +*/}
              {/*      (location.pathname === '/games/' + game?.id + '/scoring' && 'active')*/}
              {/*    }*/}
              {/*    to={'/games/' + game?.id + '/scoring'}*/}
              {/*  >*/}
              {/*    Scoring*/}
              {/*  </Link>*/}
              {/*</li>*/}
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/games/' + game?.id + '/settings' && 'active')
                  }
                  to={'/games/' + game?.id + '/settings'}
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export { GameInfo };