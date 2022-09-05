import {FC} from 'react'
import {Activity} from './models/Activity'
import {Link, useLocation} from 'react-router-dom'

type Props = {
  activity: Activity | undefined
}

const ActivityInfo: FC<Props> = ({activity}) => {
  const location = useLocation()

  return (
    <>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='me-7 mb-4'>
              <div className='w-150px'>
                <img src={activity?.game?.image} alt={activity?.title} className='w-100' />
              </div>
            </div>

            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-2'>
                    <div className='text-gray-800 fs-2 fw-bolder me-1'>{activity?.title}</div>
                  </div>

                  <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>

                  </div>
                </div>
              </div>

              <div className='d-flex flex-wrap flex-stack'>
                <div className='d-flex flex-column flex-grow-1 pe-8'>
                  <div className='d-flex flex-wrap'>
                    <div className='d-flex text-gray-600  mb-1'>{activity?.description}</div>
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
                    (location.pathname === '/activities/' + activity?.id + '/overview' && 'active')
                  }
                  to={'/activities/' + activity?.id + '/overview'}
                >
                  Overview
                </Link>
              </li>
              {/*<li className='nav-item'>*/}
              {/*  <Link*/}
              {/*    className={*/}
              {/*      `nav-link text-active-primary me-6 ` +*/}
              {/*      (location.pathname === '/activities/' + activity?.id + '/matches' && 'active')*/}
              {/*    }*/}
              {/*    to={'/activities/' + activity?.id + '/matches'}*/}
              {/*  >*/}
              {/*    Matches*/}
              {/*  </Link>*/}
              {/*</li>*/}
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/activities/' + activity?.id + '/teams' && 'active')
                  }
                  to={'/activities/' + activity?.id + '/teams'}
                >
                  Teams
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/activities/' + activity?.id + '/chat' && 'active')
                  }
                  to={'/activities/' + activity?.id + '/chat'}
                >
                  Chat
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/activities/' + activity?.id + '/settings' && 'active')
                  }
                  to={'/activities/' + activity?.id + '/settings'}
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

export { ActivityInfo };