import {IAllFormData} from "./IFieldsStyles";

export interface formStateInterface {
  isLoading: boolean,
  form: IAllFormData,
  error: string | null
}
