import {IAllFormData} from "./form-data.interface";

export interface formStateInterface {
  isLoading: boolean,
  form: IAllFormData,
  error: string | null
}
