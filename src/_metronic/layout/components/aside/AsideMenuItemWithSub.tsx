import React from 'react'
import clsx from 'clsx'
import {useLocation} from 'react-router'
import {checkIsActive, KTSVG} from '../../../helpers'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

type Props = {
  to: string[]
  title: string
  icon?: string
  fontIcon?: IconProp
  hasBullet?: boolean
  menuIcon?: string
}

const AsideMenuItemWithSub: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet,
  menuIcon = 'svg',
}) => {
  const {pathname} = useLocation()

  let isActive = false

  to.forEach(function (path) {
    if (!isActive) {
      isActive = checkIsActive(pathname, path)
    }
  })

  return (
    <div
      className={clsx('menu-item', {'here show': isActive}, 'menu-accordion')}
      data-kt-menu-trigger='click'
    >
      <span className='menu-link'>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}

        {icon && menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}

        {fontIcon && menuIcon === 'font' && (
          <span className='menu-icon'>
            <FontAwesomeIcon icon={fontIcon} className='fs-2' />
          </span>
        )}

        <span className='menu-title'>{title}</span>
        <span className='menu-arrow'></span>
      </span>
      <div className={clsx('menu-sub menu-sub-accordion', {'menu-active-bg': isActive})}>
        {children}
      </div>
    </div>
  )
}

export {AsideMenuItemWithSub}
