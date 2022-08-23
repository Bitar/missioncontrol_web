import {FC} from 'react'

type Props = {
  dObject: any
}

const ImageCell: FC<React.PropsWithChildren<Props>> = ({dObject}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <div className='w-125px'>
        <img src={dObject} alt='' className='w-100 h-100vh rounded' />
      </div>
    </div>
  </div>
)

export {ImageCell}
