import {Platform} from '../../../models/game/Platform'
import {FC} from 'react'

type Props = {
  platform: Platform
}

const PlatformObject: FC<Props> = ({platform}) => {
  const getPlatformIcon = (platformId: string) => {
    switch (platformId) {
      case 'PC':
        return 'fa-solid fa-computer'
      case 'PS4':
      case 'PS5':
        return 'fa-brands fa-playstation'
      case 'XONE':
      case 'Series X':
        return 'fa-brands fa-xbox'
      default:
        return ''
    }
  }

  return (
    <div className='d-flex align-items-center'>
      {getPlatformIcon(platform?.abbreviation) !== '' && (
        <i className={`${getPlatformIcon(platform?.abbreviation)} me-2 text-mc-secondary`}></i>
      )}
      <div className='fw-bold fs-6'>{platform?.name}</div>
    </div>
  )
}

export {PlatformObject}
