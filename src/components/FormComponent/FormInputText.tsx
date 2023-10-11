import {
  Path,
  Controller,
  Control,
  FieldValues
} from 'react-hook-form'
import { FilledInputProps, InputProps, OutlinedInputProps, SxProps, TextField } from '@mui/material'
import { Theme } from '@mui/system';

interface FormInputProps<TFormValues>{
  name: Path<TFormValues>,
  control: Control<FieldValues>
}

interface Props<TFormValues> extends FormInputProps<TFormValues>{
  placeholder: string,
  error: boolean,
  helperText: string | undefined,
  sx?: SxProps<Theme>,
  InputProps?: Partial<FilledInputProps> | Partial<OutlinedInputProps> | Partial<InputProps> | undefined
  type?: React.HTMLInputTypeAttribute | undefined
  id?: string,
  update: boolean,
}

export default function FormInputText<FieldsType>(props: Props<FieldsType>): React.ReactElement {
  const { name, control, ...rest } = props
  return (
    <Controller
      name = {name}
      control = {control}
      render= {({ field }) =>
        <TextField {...field}
          type = {rest.type}
          placeholder = {rest.placeholder}
          error = {rest.error}
          helperText = {rest.helperText}
          sx={rest.sx}
          InputProps={rest.InputProps}
          label = {rest.placeholder}
          id = {rest.id}
          disabled = {rest.update}
        />}
    />
  )
}
