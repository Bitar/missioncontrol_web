import {FC} from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import {checkIsActive, KTSVG, WithChildren} from '../../../helpers'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
  menuIcon?: string
}

const AsideMenuItem: FC<React.PropsWithChildren<Props & WithChildren>> = ({
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
            <i className={clsx('fa fs-3', fontIcon)}></i>
          </span>
        )}
        <span className='menu-title'>{title}</span>
      </Link>
      {children}
    </div>
  )
}

export {AsideMenuItem}
