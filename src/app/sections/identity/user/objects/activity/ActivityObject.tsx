import {Activity} from '../../../../../models/activity/Activity'
import {FC} from 'react'
import {KTCard, KTCardBody, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import Moment from 'moment'
import {ProgressBar} from 'react-bootstrap'

type Props = {
  activity: Activity
}

const ActivityObject: FC<Props> = ({activity}) => {
  return (
    <>
      <KTCard>
        <div className='card-header border-0 pt-9'>
          <div className='card-title m-0'>
            <div className='bg-light w-100px'>
              {activity.game?.image ? (
                <img src={activity.game.image} className='img-fluid' alt={activity.game.title} />
              ) : (
                <img
                  src={toAbsoluteUrl('assets/media/svg/brand-logos/plurk.svg')}
                  alt={'Activity Blank'}
                />
              )}
            </div>
          </div>
          <div className='card-toolbar'>
            {activity.status === 1 && (
              <span className='badge badge-light-primary fw-bolder me-auto px-4 py-3'>
                Registration
              </span>
            )}
            {activity.status === 2 && (
              <span className='badge badge-light-success fw-bolder me-auto px-4 py-3'>Active</span>
            )}
            {activity.status === 3 && (
              <span className='badge badge-light-secondary fw-bolder me-auto px-4 py-3'>
                Pending
              </span>
            )}
            {activity.status === 4 && (
              <span className='badge badge-light-danger fw-bolder me-auto px-4 py-3'>Closed</span>
            )}
            {activity.status === 5 && (
              <span className='badge badge-light-warning fw-bolder me-auto px-4 py-3'>
                Generating Matches
              </span>
            )}
          </div>
        </div>
        <KTCardBody className='p-9'>
          <div className='fs-3 fw-bolder text-dark'>{activity.title}</div>
          <p className='text-gray-400 fw-bold fs-5 mt-1 mb-7'>{activity.game?.title}</p>

          <div className='d-flex flex-wrap mb-5'>
            <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3'>
              <div className='fs-6 text-gray-800 fw-bolder'>
                {Moment(activity?.registration_dates?.end_date * 1000).format('ddd, MMM D YYYY')}
              </div>
              <div className='fw-bold text-gray-400'>Register By</div>
            </div>
            <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3'>
              <div className='fs-6 text-gray-800 fw-bolder'>
                {Moment(activity?.matchplay_dates?.start_date * 1000).format('ddd, MMM D YYYY')}
              </div>
              <div className='fw-bold text-gray-400'>Game Day</div>
            </div>
          </div>
          <div className='h-4px w-100 bg-light mb-5'>
            <ProgressBar className='rounded h-4px' now={43} />
          </div>
          {/*<div className="symbol-group symbol-hover">*/}
          {/*    <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title="Emma Smith">*/}
          {/*        <img alt="Pic" src="assets/media/avatars/300-6.jpg"/>*/}
          {/*    </div>*/}
          {/*    <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title="Rudy Stone">*/}
          {/*        <img alt="Pic" src="assets/media/avatars/300-1.jpg"/>*/}
          {/*    </div>*/}
          {/*    <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title="Susan Redwood">*/}
          {/*        <span className="symbol-label bg-primary text-inverse-primary fw-bolder">S</span>*/}
          {/*    </div>*/}
          {/*</div>*/}
        </KTCardBody>
      </KTCard>
    </>
  )
}

export {ActivityObject}
