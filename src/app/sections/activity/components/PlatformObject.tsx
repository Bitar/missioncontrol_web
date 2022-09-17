import {Platform} from '../../../models/game/Platform'
import {FC} from 'react'

type Props = {
  platform: Platform
}

const PlatformObject: FC<Props> = ({platform}) => {
  const getPlatformIcon = (platformId: string) => {
    switch (platformId) {
      case 'PC':
        return 'fa-computer'
      case 'PS4':
      case 'PS5':
        return 'fa-playstation'
      case 'XONE':
      case 'Series X':
        return 'fa-xbox'
      default:
        return ''
    }
  }

  return (
    <div className='d-flex align-items-center'>
      <i
        className={`fa-brands ${getPlatformIcon(platform?.abbreviation)} me-2 text-mc-secondary`}
      ></i>
      <div className='fw-bold fs-6'>{platform?.name}</div>
    </div>
  )
}

export {PlatformObject}
