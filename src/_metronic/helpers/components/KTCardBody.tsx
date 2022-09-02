import clsx from 'clsx'
import React, {FC} from 'react'
import {WithChildren} from '../react18MigrationHelpers'

type Props = {
  className?: string
  scroll?: boolean
  height?: number
  id?: string
}

const KTCardBody: FC<React.PropsWithChildren<Props & WithChildren>> = (props) => {
  const {className, scroll, height, id, children} = props
  return (
    <div
      id={id}
      className={clsx(
        'card-body',
        className && className,
        {
          'card-scroll': scroll,
        },
        height && `h-${height}px`
      )}
    >
      {children}
    </div>
  )
}

export {KTCardBody}
