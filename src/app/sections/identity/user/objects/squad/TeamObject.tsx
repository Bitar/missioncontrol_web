import React, {FC} from 'react'
import {Team} from '../../../../../models/squad/Team'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'

type Props = {
  team: Team
}

const TeamObject: FC<Props> = ({team}) => {
  return (
    <>
      <div className='card'>
        <div className='card-body d-flex flex-center flex-column p-9'>
          <div className='bg-light w-65px mb-5'>
            {team.image && <img src={team.image} className='img-fluid' alt={team.name} />}
          </div>
          <span className='fs-4 text-gray-800 text-hover-primary fw-bolder mb-6'>{team.name}</span>

          <div className='d-flex flex-center flex-wrap mb-5'>
            <div className='symbol-group symbol-hover'>
              {team.users?.map((user) => (
                <div
                  className='symbol symbol-35px symbol-circle'
                  data-bs-toggle='tooltip'
                  title={user.name}
                  key={user.id}
                >
                  {user.meta?.image ? (
                    <img alt='Pic' src={toAbsoluteUrl(user.meta?.image)} />
                  ) : (
                    <img alt='Pic' src={toAbsoluteUrl('/media/avatars/blank.png')} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export {TeamObject}
