import React, {FC} from 'react'
import {FormikErrors, FormikTouched, FormikValues, useField, useFormikContext} from 'formik'
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from '@mui/material'

type Props = {
  name: string
  label: string
  options: any
  touched: FormikTouched<FormikValues>
  errors: FormikErrors<FormikValues>
  values: FormikValues
  setFieldValue: any
}

const SelectWrapper: FC<Props> = ({
  name,
  label,
  options,
  values,
  touched,
  errors,
  setFieldValue,
}) => {
  // console.log(field)
  // console.log(meta)

  const configSelect: Record<string, any> = {
    select: true,
    variant: 'outlined',
    size: 'small',
  }

  // console.log(meta.touched && Boolean(meta.error))
  // console.log(meta.error)

  return (
    <FormControl size={'small'} fullWidth={true} error={touched.name && Boolean(touched.name)}>
      <InputLabel id={`select-${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`select-${name}-label`}
        id={`select-${name}`}
        value={values.name}
        name={name}
        label={label}
        onChange={(e: any) => {
          setFieldValue(name, e.target.value)
        }}
        MenuProps={{PaperProps: {sx: {maxHeight: 300}}}}
      >
        {options &&
          options?.length > 0 &&
          options?.map((option: any) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
      </Select>
      {touched.name && Boolean(errors.name) && <FormHelperText>YO</FormHelperText>}
    </FormControl>

    // <Box sx={{minWidth: 120}}>
    //   <FormControl fullWidth size='small' error={meta.touched && Boolean(meta.error)}>
    //     <InputLabel id='communities-select-label'>Community</InputLabel>
    //     <Select
    //       labelId='communities-select-label'
    //       id='communities-select'
    //       value={field.value}
    //       name='community_id'
    //       label='Community'
    //       MenuProps={{PaperProps: {sx: {maxHeight: 300}}}}
    //       onChange={handleChange}
    //     >
    //       {options &&
    //         options?.length > 0 &&
    //         options?.map((option: any) => (
    //           <MenuItem key={option.id} value={option.id}>
    //             {option.name}
    //           </MenuItem>
    //         ))}
    //     </Select>
    //     {meta.touched && Boolean(meta.error) && (
    //       <FormHelperText>{meta.touched && meta.error}</FormHelperText>
    //     )}
    //   </FormControl>
    // </Box>
  )
}

export {SelectWrapper}
