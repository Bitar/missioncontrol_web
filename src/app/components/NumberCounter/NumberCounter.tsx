import React, {FC, useState} from 'react'

type Props = {
  min?: number
  handleChange?: any
}

const NumberCounter: FC<Props> = ({min = 1, handleChange}) => {
  const [number, setNumber] = useState<number>(min)
  const [visible, setVisible] = useState(true)

  const decrease = () => {
    if (number <= min) {
      setNumber(min)
    } else {
      setNumber(number - 1)
    }
  }

  const increase = () => {
    setNumber(number + 1)
  }

  return (
    <>
      <button
        type={'button'}
        className='btn btn-icon btn-sm btn-mc-secondary rounded-0'
        onClick={decrease}
      >
        <i className='fa fa-minus'></i>
      </button>
      {visible && (
        <input
          type='number'
          name='clicks'
          max={999}
          style={{
            paddingTop: '3.5px',
            paddingLeft: '1px',
            paddingRight: 0,
            paddingBottom: '4.5px',
            position: 'relative',
            top: '2px',
          }}
          className='text-dark fs-4 w-50px number-counter-hide form-control mb-3 mb-lg-0 d-inline rounded-0 text-center'
          value={number}
          onChange={(e) => {
            let value = parseInt(e.target.value)

            if (value > 999) {
              setNumber(999)
            } else if (value <= min) {
              setNumber(min)
            } else {
              setNumber(parseInt(e.target.value))
            }
          }}
        />
      )}
      <button
        type={'button'}
        className='btn btn-icon btn-sm btn-mc-secondary rounded-0'
        onClick={increase}
      >
        <i className='fa fa-plus'></i>
      </button>
    </>
  )
}

export {NumberCounter}
