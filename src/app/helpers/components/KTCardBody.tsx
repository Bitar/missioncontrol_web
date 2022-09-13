import clsx from 'clsx'
import {FC} from 'react'
import {WithChildren} from '../../../_metronic/helpers/react18MigrationHelpers'

type Props = {
  className?: string
  scroll?: boolean
  height?: number
  id?: string
}

const KTCardBody: FC<Props & WithChildren> = (props) => {
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
