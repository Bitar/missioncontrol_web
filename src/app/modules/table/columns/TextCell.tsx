import React, {FC} from 'react'

type Props = {
  dObject: any
}

const TextCell: FC<React.PropsWithChildren<Props>> = ({dObject}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <span className='text-gray-800 pe-none mb-1'>{dObject}</span>
    </div>
  </div>
)

export {TextCell}
