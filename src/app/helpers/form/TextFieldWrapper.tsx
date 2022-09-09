import React, {FC} from 'react'
import TextField from '@mui/material/TextField'
import {useField} from 'formik'

type Props = {
  name: string,
  label: string
  multiline?: boolean
  rows?: number
  numeric?: boolean
}

const TextFieldWrapper: FC<Props> = (props) => {
  const {name, multiline = false, label, numeric, rows = 3, ...otherProps} = props
  const [field, meta] = useField(name)

  const configTextField: Record<string, any> = {
    ...field,
    ...otherProps,
    fullWidth: true,
    size: "small",
    label: label
  }

  if(multiline) {
    configTextField.multiline = true
    configTextField.minRows = rows

  }

  if(meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error
  }

  return <TextField variant={"outlined"} {...configTextField}/>
}

export {TextFieldWrapper}