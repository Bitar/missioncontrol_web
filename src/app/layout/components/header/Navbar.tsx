import clsx from 'clsx'
import {HeaderUserMenu} from '../../../../_metronic/partials'
import {useAuth} from '../../../modules/auth'
import {CommunityPicker} from '../../partials/community-picker/CommunityPicker'

const itemClass = 'ms-1 ms-lg-3'
const userAvatarClass = 'symbol-35px symbol-md-40px'

const Navbar = () => {
  const {currentUser} = useAuth()

  return (
    <div className='app-navbar flex-shrink-0'>
      <div className={clsx('app-navbar-item', itemClass)}>
        <CommunityPicker />
      </div>

      {/*<div className={clsx('app-navbar-item', itemClass)}>*/}
      {/*  <ThemeModeSwitcher toggleBtnClass={clsx('btn-active-light-primary btn-custom')} />*/}
      {/*</div>*/}

      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <img src={currentUser?.meta?.image} alt={currentUser?.name} />
        </div>
        <HeaderUserMenu />
      </div>
    </div>
  )
}

export { Navbar };
