import {createAction, props} from "@ngrx/store";
import {IAllFormDataLowercase, IFormStyles} from "../interfaces/form-data.interface";

export const getFormData = createAction('[FormData] Get Form Data')
export const setFormData = createAction('[FormData] Set Form Data after API call', props<{formData: IAllFormDataLowercase}>())
export const getAllFormDataForSave = createAction('[FormData] Get Form Data for save')
export const updateFormMapData = createAction('[FormData] Update Form Map Data', props<{mapData: string[]}>())
export const updateFormStyles = createAction('[FormData] Update Form styles', props<{formStyles: IFormStyles}>())
export const updateToken = createAction('[FormData] Update token', props<{token: string | null}>())
export const updateElementsStyles = createAction('[FormData] Update Form Elements Styles', props<{elementsStyles:string}>())
export const deleteDataFromState = createAction('[FormData] Delete data on exit')
export const changeLoadingState = createAction('[FormData] Change is loading state', props<{isLoading: boolean}>())
