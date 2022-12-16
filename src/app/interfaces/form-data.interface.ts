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
  token: string | null
}

export interface IFormStyles {
  label?: string
  color?: string
  background?: string
  borderStyle?: string
  borderColor?: string
}
