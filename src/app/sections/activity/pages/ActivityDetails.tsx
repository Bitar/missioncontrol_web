import {useActivity} from '../core/contexts/ActivityContext'
import {PlatformObject} from '../components/PlatformObject'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import CountUp from 'react-countup'
import moment from 'moment'
import momentTz from 'moment-timezone'
import {getWeekdayByInteger} from '../../../helpers/ActivityHelper'

const ActivityDetails = () => {
  const {activity} = useActivity()
  dayjs.extend(utc)

  return (
    <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
      <div className='card-header cursor-pointer bg-mc-primary'>
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0 text-white'>Activity Details</h3>
        </div>
      </div>

      <div className='card-body p-9'>
        <div className='row mb-5'>
          <label className='col-lg-4 fw-bold text-muted'>Activity Type</label>

          <div className='col-lg-8'>
            <span className='fw-bolder fs-6 text-dark'>
              {activity?.type?.name} {activity?.playoff?.is_enabled && ' & Playoffs'}
            </span>
          </div>
        </div>
        <div className='row mb-5'>
          <label className='col-lg-4 fw-bolder text-dark fs-5'>Game Details</label>
        </div>
        <div className='row mb-5'>
          <label className='col-lg-4 fw-bold text-muted'>Game</label>

          <div className='col-lg-8'>
            <span className='fw-bolder fs-6 text-dark'>{activity?.game?.title}</span>
          </div>
        </div>

        <div className='row mb-5'>
          <label className='col-lg-4 fw-bold text-muted'>GameMode</label>

          <div className='col-lg-8'>
            <span className='fw-bolder fs-6 text-dark'>{activity?.game_mode?.name}</span>
          </div>
        </div>

        <div className='row mb-5'>
          <label className='col-lg-4 fw-bold text-muted'>Rounds</label>

          <div className='col-lg-8 fv-row'>
            <span className='fw-bold fs-6'>{activity?.settings?.rounds}</span>
          </div>
        </div>

        {activity?.settings?.total_game_time && (
          <div className='row mb-5'>
            <label className='col-lg-4 fw-bold text-muted'>Match Duration</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 me-2'>
                <CountUp useEasing={false} end={activity?.settings?.total_game_time} /> min
              </span>
            </div>
          </div>
        )}

        <div className='row mb-5'>
          <label className='col-lg-4 fw-bold text-muted'>Platforms</label>

          <div className='col-lg-8'>
            {activity?.platforms?.map((platform, index) => (
              <PlatformObject key={`platform-object-${index}`} platform={platform} />
            ))}
          </div>
        </div>

        <div className='row mb-5'>
          <label className='col-lg-4 fw-bolder text-dark fs-5'>Schedule</label>
        </div>

        <div className='row mb-5'>
          <label className='col-lg-4 fw-bold text-muted'>Frequency</label>

          <div className='col-lg-8 d-flex align-items-center'>
            <span className='fw-bolder fs-6 me-2'>
              {activity?.settings?.frequency === 2 ? 'Weekly' : 'Daily'}
            </span>
          </div>
        </div>

        {activity?.settings?.time && (
          <div className='row mb-5'>
            <label className='col-lg-4 fw-bold text-muted'>Time</label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>
                {moment(activity?.settings?.time * 1000).format('hh:mm a ')}
                <span className='text-muted' style={{fontSize: '12px'}}>
                  ({moment.tz(momentTz.tz.guess()).zoneAbbr()})
                </span>
              </span>
            </div>
          </div>
        )}

        {activity?.playoff?.is_enabled && (
          <>
            <div className='row mb-5'>
              <label className='col-lg-4 fw-bolder text-dark fs-5'>Playoffs</label>
            </div>

            <div className='row mb-5'>
              <label className='col-lg-4 fw-bold text-muted'>Teams</label>

              <div className='col-lg-8 d-flex align-items-center'>
                <span className='fw-bolder fs-6 me-2'>{activity?.playoff?.teams}</span>
              </div>
            </div>
          </>
        )}

        {(activity?.settings?.day || activity?.settings?.day === 0) && (
          <div className='row mb-5'>
            <label className='col-lg-4 fw-bold text-muted'>Day</label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>
                {getWeekdayByInteger(activity?.settings?.day)}
              </span>
            </div>
          </div>
        )}

        <div className='row mb-5'>
          <label className='col-lg-4 fw-bolder text-dark fs-5'>Team Details</label>
        </div>

        <div className='row mb-5'>
          <label className='col-lg-4 fw-bold text-muted'>Players per team.</label>

          <div className='col-lg-8'>
            <span className='fw-bolder fs-6 text-dark'>{activity?.team_setting?.players}</span>
          </div>
        </div>

        <div className='row mb-5'>
          <label className='col-lg-4 fw-bold text-muted'>Min Teams</label>

          <div className='col-lg-8'>
            <span className='fw-bolder fs-6 text-dark'>{activity?.team_setting?.min}</span>
          </div>
        </div>

        <div className='row mb-5'>
          <label className='col-lg-4 fw-bold text-muted'>Max Teams</label>

          <div className='col-lg-8'>
            <span className='fw-bold fs-6'>{activity?.team_setting?.max ?? '-'}</span>
          </div>
        </div>

        <div className='row mb-2'>
          <label className='col-lg-4 fw-bolder text-dark fs-5'></label>
        </div>

        <div className='row mb-5'>
          <label className='col-lg-4 fw-bold text-muted'>Entry Fee</label>

          <div className='col-lg-8'>
            <span className='fw-bold fs-6'>
              {activity?.entry_fee?.type === 1
                ? 'Free'
                : '$ ' + (activity?.entry_fee?.amount || 0) / 100}
            </span>
          </div>
        </div>
        <div className='row mb-5'>
          <label className='col-lg-4 fw-bold text-muted'>Location</label>

          <div className='col-lg-8'>
            <span className='fw-bold fs-6'>
              {activity?.location?.type === 1
                ? 'Online'
                : 'In-Person @ ' + (activity?.location?.locate ?? '')}
            </span>
          </div>
        </div>
        <div className='row mb-10'>
          <label className='col-lg-4 fw-bold text-muted'>Prizes</label>

          <div className='col-lg-8'>
            <span className='fw-bold fs-6'>-</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export {ActivityDetails}
