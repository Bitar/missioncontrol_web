import {Team} from '../../../models/squad/Team'
import React, {FC} from 'react'
import clsx from 'clsx'

type Props = {
  team?: Team | undefined
  size?: string
  className?: string
  isWinner?: boolean
  textPosition?: 'up' | 'down'
  iconTop?: string
}

const TeamImage: FC<Props> = ({
  team,
  size = '30px',
  className,
  isWinner = false,
  textPosition = 'down',
}) => {
  return (
    <>
      <div className={clsx('team-block mw-150px mx-auto text-center', className && className)}>
        {team ? (
          <>
            {textPosition === 'up' && <div className='team-name fs-6 fw-bold'>{team.name}</div>}
            <div className={clsx(`symbol symbol-${size} symbol-circle`, className && className)}>
              {isWinner && (
                <span className={`position-absolute w-100 text-center`} style={{top: '-18px'}}>
                  <i className='fas fa-trophy text-warning' style={{fontSize: '20px'}}></i>
                </span>
              )}
              <img
                alt={team.name + ' team image'}
                src={team.image}
                className='border border-1 border-mc-secondary'
              />
            </div>
            {textPosition === 'down' && (
              <div
                className='team-name mt-1 fw-bolder mw-100px mx-auto'
                style={{fontSize: '12px'}}
              >
                {team.name}
              </div>
            )}
          </>
        ) : (
          <div className={`symbol symbol-${size} symbol-circle overflow-hidden`}>
            <div className={`bg-mc-secondary w-${size} h-${size} team-bye`}>
              <div className='fs-6 fw-bold text-center text-white'>TBD</div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export {TeamImage}
