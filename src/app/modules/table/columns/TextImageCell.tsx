import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import clsx from 'clsx'

type Props = {
  link?: string
  dText?: string
  dImage?: string
  dExtraText?: string
  size?: string
  flip?: boolean
}

const TextImageCell: FC<React.PropsWithChildren<Props>> = ({
  dImage,
  dText,
  dExtraText,
  link,
  size = '50',
  flip = false,
}) => {
  return (
    <div
      className={clsx('d-flex align-items-center', {
        'flex-row-reverse': flip,
      })}
    >
      <div
        className={`symbol symbol-circle symbol-${size}px overflow-hidden m${!flip ? 'e' : 's'}-3`}
      >
        {dImage &&
          (link ? (
            <Link to={`${link}`}>
              <div className='symbol-label'>
                <img src={toAbsoluteUrl(dImage)} alt='Emma Smith' className='w-100' />
              </div>
            </Link>
          ) : (
            <div className='symbol-label'>
              <img src={toAbsoluteUrl(dImage)} alt='Emma Smith' className='w-100' />
            </div>
          ))}
      </div>

      <div
        className={clsx('d-flex flex-column', {
          'text-end': flip,
        })}
      >
        {link ? (
          <Link to={`${link}`} className='text-gray-800 text-hover-mc-secondary mb-1'>
            {dText}
          </Link>
        ) : (
          <span className='text-gray-800 mb-1'>{dText}</span>
        )}

        {dExtraText && <span style={{fontSize: '11px'}}>{dExtraText}</span>}
      </div>
    </div>
  )
}

export {TextImageCell}
