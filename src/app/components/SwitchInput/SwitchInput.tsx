import {FC} from 'react'

type Props = {
  isOn: boolean | undefined
  handleToggle: any
  onColor?: string
  name?: string
  id?: string
}

const SwitchInput: FC<Props> = ({
  isOn,
  handleToggle,
  name,
  onColor = 'mc-secondary',
  id = 'react-switch',
}) => {
  return (
    <>
      <input
        name={name}
        checked={isOn}
        onChange={handleToggle}
        className='react-switch-checkbox'
        id={id}
        type='checkbox'
      />
      <label className={`react-switch-label bg-${isOn && onColor}`} htmlFor={`${id}`}>
        <span className={`react-switch-button`} />
      </label>
    </>
  )
}

export {SwitchInput}
