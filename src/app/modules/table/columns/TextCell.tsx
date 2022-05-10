/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'

type Props = {
    dObject: any
}

const TextCell: FC<Props> = ({dObject}) => (
    <div className='d-flex align-items-center'>
        <div className='d-flex flex-column'>
            <a href='#' className='text-gray-800 text-hover-primary mb-1'>
                {dObject.name}
            </a>
            <span>{dObject.email}</span>
        </div>
    </div>
)

export {TextCell}