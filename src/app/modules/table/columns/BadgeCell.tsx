/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'

type Props = {
  status: string
  color: string
}

const BadgeCell: FC<React.PropsWithChildren<Props>> = ({status, color}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <span className={'badge badge-' + color}>{status}</span>
    </div>
  </div>
)

export {BadgeCell}
