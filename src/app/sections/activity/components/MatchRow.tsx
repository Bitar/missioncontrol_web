import {TeamImage} from './TeamImage'
import {
  calculateTeamScore,
  getDateFromTimestamp,
  getTimeFromTimestamp,
} from '../../../helpers/MCHelper'
import {formatMatchStatus} from '../../../helpers/ActivityHelper'
import React, {FC} from 'react'
import {Match} from '../../../models/activity/matches/Match'
import {isWinner} from '../../../helpers/MatchHelper'
import clsx from 'clsx'

type Props = {
  match: Match
  upcoming?: boolean
}

const MatchRow: FC<Props> = ({match, upcoming = false}) => {
  return (
    <>
      <div className='d-flex flex-stack text-center'>
        {match?.teams && match?.teams[0] ? (
          <div
            className={clsx('flex-grow-1 mw-300px', {
              'bg-light-success': !upcoming && isWinner(match, match?.teams[0]?.id),
              'bg-light-danger': !upcoming && !isWinner(match, match?.teams[0]?.id),
              'bg-light-secondary': upcoming,
            })}
          >
            <div className='d-flex flex-stack text-start pt-8 pb-3'>
              <div className='flex-grow-1 flex-stack'>
                <TeamImage
                  team={match?.teams[0]}
                  size='50px'
                  isWinner={isWinner(match, match?.teams[0]?.id)}
                />
              </div>
              <div className='flex-grow-1 mw-50px'>
                <span className='display-6'>{calculateTeamScore(match, match?.teams[0])}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex-grow-1 mw-300px'>
            <div className='d-inline-block'>
              <TeamImage size='60px' />
            </div>
          </div>
        )}
        <div className='flex-shrink-1 mw-150px'>
          <div className='fw-semibold text-gray-600 px-5' style={{fontSize: '12px'}}>
            <p className='m-0'>{getTimeFromTimestamp(match?.start_date)}</p>
            <p className='m-0'>{getDateFromTimestamp(match?.start_date)}</p>
            <p className='m-0 text-center'>
              <span className={'badge badge-' + formatMatchStatus(match?.status)['color']}>
                {formatMatchStatus(match?.status)['status']}
              </span>
            </p>
          </div>
        </div>
        {match?.teams && match?.teams[1] ? (
          <div
            className={clsx('flex-grow-1 mw-300px', {
              'bg-light-success': !upcoming && isWinner(match, match?.teams[1]?.id),
              'bg-light-danger': !upcoming && !isWinner(match, match?.teams[1]?.id),
              'bg-light-secondary': upcoming,
            })}
          >
            <div className='d-flex flex-stack text-end pt-8 pb-3'>
              <div className='flex-grow-1 mw-50px'>
                <span className='display-6'>{calculateTeamScore(match, match?.teams[1])}</span>
              </div>
              <div className='flex-grow-1 flex-stack'>
                <TeamImage
                  className='ms-auto'
                  team={match?.teams[1]}
                  size='50px'
                  isWinner={isWinner(match, match?.teams[1]?.id)}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className='flex-grow-1 mw-300px'>
            <div className='d-inline-block'>
              <TeamImage size='60px' />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export {MatchRow}
