export interface IAllFormData {
  templateMap: string[]
  formStyles: {
    label?: string
    color?: string
    background?: string
    borderStyle?: string
    borderColor?: string
  }
  elementStyles?: string | undefined
  token?: string | null
}

export interface IAllFormDataLowercase {
  templatemap: string[]
  formstyles: {
    label?: string
    color?: string
    background?: string
    borderStyle?: string
    borderColor?: string
  }
  elementstyles?: string | undefined
  token?: string | null
}

export interface IFormStyles {
  label?: string
  color?: string
  background?: string
  borderStyle?: string
  borderColor?: string
}

export interface IFormElementStyles {
  title?: string
  label?: string
  placeholder?: string
  width?: string
  height?: string
  fontSize?: string
  fontWeight?: string
  color?: string
  borderColor?: string
  borderStyle?: string
  options?: string[]
}
