import {NewMatch} from '../../../models/activity/matches/Match'
import React, {FC} from 'react'

type Props = {
  match?: NewMatch
  actions: any[]
}

export const MatchActions: FC<Props> = ({match, actions}) => {
  return (
    <div>
      {actions[0]?.type === 1 && <span className={'badge badge-danger'}>Forfeit</span>}
      {actions[0]?.type === 2 && (
        <span className={'badge badge-info'}>
          {actions[0]?.is_approved === 0 && 'Reschedule Requested'}
          {actions[0]?.is_approved === 1 && 'Reschedule Approved'}
          {actions[0]?.is_approved === 2 && 'Reschedule Denied'}
        </span>
      )}
      {actions[0]?.type === 3 && actions[0]?.is_approved === 0 && (
        <span className={'badge badge-warning'}>No Show</span>
      )}
    </div>
  )
}
