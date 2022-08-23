import clsx from 'clsx'
import React, {FC} from 'react'
import {WithChildren} from '../react18MigrationHelpers'

type Props = {
  className?: string
  scroll?: boolean
  height?: number
}

const KTCardBody: FC<React.PropsWithChildren<Props & WithChildren>> = (props) => {
  const {className, scroll, height, children} = props
  return (
    <div
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
