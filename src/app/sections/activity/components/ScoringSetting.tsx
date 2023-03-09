import React, {FC} from 'react'
import {ScoringSettings} from '../../../models/game/scoring/ScoringSettings'

type Props = {
  settings: ScoringSettings
}

const ScoringSetting: FC<Props> = ({settings}) => {
  function ordinal(n: number) {
    let s = ['th', 'st', 'nd', 'rd']
    let v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
  }

  return (
    <>
      {settings?.key?.type === 1 ? (
        <h6>
          {settings?.key?.key} Point worth {settings?.values[0].value}
        </h6>
      ) : (
        <>
          <div
            className={'border border-1 p-2 w-100'}
            style={{
              maxWidth: 360,
              position: 'relative',
              overflow: 'auto',
              maxHeight: 300,
              fontSize: '12px',
            }}
          >
            <h6>{settings?.key?.key} Points</h6>
            <div className=''>
              {settings?.values?.map((value) => (
                <p className='m-0' key={value.id}>
                  {ordinal(value.key) + ' ' + settings?.key?.key + ': ' + value.value}
                </p>
              ))}
            </div>
          </div>
        </>
      )}
      <br />
    </>
  )
}

export {ScoringSetting}
