/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'

type Props = {
    dObject: any
}

const ImageCell: FC<Props> = ({dObject}) => (
    <div className='d-flex align-items-center'>
        <div className='d-flex flex-column'>
            <div className="w-100px">
                <img src={dObject} alt="" className="w-100"/>
            </div>
            {/*<a href='#' className='text-gray-800 text-hover-primary mb-1'>*/}
            {/*    {dObject}*/}
            {/*</a>*/}
        </div>
    </div>
)

export {ImageCell}
