/* eslint-disable jsx-a11y/anchor-is-valid */
import { link } from 'fs'
import {FC} from 'react'
import {toAbsoluteUrl, KTSVG} from '../../../helpers'

type Props = {
  avatar?: string
  link?:string 
  
}
const Card6: FC<Props> = ({
  avatar = '',
  link = ''
}) => {
  return (
    <div className='card'>
      <div className='card-body d-flex flex-center flex-column p-9'>
        <div className='mb-6'>
          <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
          <img className= 'w-100' alt='Pic' src={toAbsoluteUrl(avatar)} />
          </div>
        </div>
          
        <a href={link} className='btn btn-sm btn-light'>
          <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
          Link
        </a>
      </div>
    </div>
  )
}

export {Card6}
