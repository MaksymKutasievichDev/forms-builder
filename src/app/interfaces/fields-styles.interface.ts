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

export interface IFormDataResponse {
  username: string,
  password: string,
  templatemap?: string[],
  formstyles?:{
    [key:string]: string
  }
  elementstyles?: string
}

export interface IFormStyles {
  label?: string
  color?: string
  background?: string
  borderStyle?: string
  borderColor?: string
}
export interface IFormElementsStyles {
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
}
