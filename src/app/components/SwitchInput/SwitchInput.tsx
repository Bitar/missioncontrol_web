import {FC} from 'react'

type Props = {
  isOn: boolean | undefined
  handleToggle: any
  onColor?: string
  name?: string
}

const SwitchInput: FC<Props> = ({isOn, handleToggle, name, onColor = 'mc-secondary'}) => {
  return (
    <>
      <input
        name={name}
        checked={isOn}
        onChange={handleToggle}
        className='react-switch-checkbox'
        id={`react-switch`}
        type='checkbox'
      />
      <label className={`react-switch-label bg-${isOn && onColor}`} htmlFor={`react-switch`}>
        <span className={`react-switch-button`} />
      </label>
    </>
  )
}

export {SwitchInput}
