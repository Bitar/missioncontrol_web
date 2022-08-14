import React from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import {checkIsActive, KTSVG} from '../../../helpers'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconProp} from '@fortawesome/fontawesome-svg-core'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: IconProp
  hasBullet?: boolean
  menuIcon?: string
}

const AsideMenuItem: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet = false,
  menuIcon = 'svg',
}) => {
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to)

  return (
    <div className='menu-item'>
      <Link className={clsx('menu-link without-sub', {active: isActive})} to={to}>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2 svg-icon-white' />
          </span>
        )}
        {fontIcon && menuIcon === 'font' && (
          <span className='menu-icon'>
            {/*<FontAwesomeIcon icon="fa-solid fa-people-group" />*/}
            <FontAwesomeIcon icon={fontIcon} className='fs-2' />
            {/*<i className={clsx('bi fs-3', fontIcon)}></i>*/}
          </span>
        )}

        <span className='menu-title'>{title}</span>
      </Link>
      {children}
    </div>
  )
}

export {AsideMenuItem}
