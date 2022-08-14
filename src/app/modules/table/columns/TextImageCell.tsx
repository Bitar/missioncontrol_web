import {FC} from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'

type Props = {
  link?: string
  dText: string
  dImage: string
  dExtraText?: string
}

const TextImageCell: FC<Props> = ({dImage, dText, dExtraText, link}) => {
  return (
    <div className='d-flex align-items-center'>
      <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
        <Link to={`${link}`}>
          <div className='symbol-label'>
            <img src={toAbsoluteUrl(dImage)} alt='Emma Smith' className='w-100' />
          </div>
        </Link>
      </div>
      <div className='d-flex flex-column'>
        <Link to={`${link}`} className='text-gray-800 text-hover-primary mb-1'>
          {dText}
        </Link>
        {dExtraText && <span>{dExtraText}</span>}
      </div>
    </div>
  )
}

export {TextImageCell}
