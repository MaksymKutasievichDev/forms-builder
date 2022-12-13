import {IAllFormData} from "./fields-styles.interface";

export interface formStateInterface {
  isLoading: boolean,
  form: IAllFormData,
  error: string | null
}
