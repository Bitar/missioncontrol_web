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
                                iconTop= "0"
                              }) => {
  return (
    <>
      {team ? (
        <>
          {textPosition === 'up' && <div className='fs-6 fw-bold'>{team.name}</div>}
          <div className={clsx(`symbol symbol-${size} symbol-circle`, className && className)}>
            {isWinner && (
              <span className={`position-absolute w-100 text-center`} style={{top: iconTop}}>
                <i className='fas fa-trophy text-warning fs-1'></i>
              </span>
            )}
            <img
              alt={team.name + ' team image'}
              src={team.image}
              className='border border-1 border-mc-secondary'
            />
          </div>
          {textPosition === 'down' && <div className='fs-6 fw-bold'>{team.name}</div>}
        </>
      ) : (
        <div
          className={clsx(
            `symbol symbol-${size} symbol-circle overflow-hidden`,
            className && className
          )}
        >
          <div className={`bg-mc-secondary w-${size} h-${size}`}>
            <div className='pt-6 fs-6 fw-bold text-center text-white'>BYE</div>
          </div>
        </div>
      )}
    </>
  )
}

export { TeamImage };