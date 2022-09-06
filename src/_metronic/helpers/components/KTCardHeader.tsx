import React, {FC} from 'react'
import clsx from "clsx";

type Props = {
  className?: string
  text: string
  id?: string
  bg?: string
  text_color?: string
}

const KTCardHeader: FC<Props> = (props, context) => {
  const {className, text, id, bg, text_color} = props

  return (
    <div id={id} className={clsx(`card-header bg-${bg || 'white'}`, className && className)}>
      <div className='card-title'>
        <h3 className={`card-label text-${text_color || 'black'}`}>{text}</h3>
      </div>
    </div>
  )
}

export {KTCardHeader}
