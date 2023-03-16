import React, {Dispatch, FC, SetStateAction} from 'react'
import Select from 'react-select'
import {genericMultiSelectOnChangeHandler} from '../../helpers/form'

interface Props {
  isResourceLoaded: boolean
  options: any[]
  defaultValue: any
  form: any
  setForm: Dispatch<SetStateAction<any>>
  name: string
}

const MultiSelect: FC<Props> = ({isResourceLoaded, options, defaultValue, form, setForm, name}) => {
  const multiSelectChangeHandler = (e: any) => {
    genericMultiSelectOnChangeHandler(e, form, setForm, name)
  }

  return (
    <>
      {!isResourceLoaded && (
        <Select
          isMulti
          name={name}
          options={options}
          getOptionLabel={(instance) => instance.name}
          getOptionValue={(instance) => instance.id.toString()}
          placeholder={`Select one or more ${name}`}
          onChange={multiSelectChangeHandler}
        />
      )}

      {isResourceLoaded && (
        <Select
          isMulti
          name={name}
          defaultValue={defaultValue}
          options={options}
          getOptionLabel={(instance) => instance.name}
          getOptionValue={(instance) => instance.id.toString()}
          placeholder={`Select one or more ${name}`}
          onChange={multiSelectChangeHandler}
        />
      )}
    </>
  )
}

export default MultiSelect
