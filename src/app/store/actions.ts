import {createAction, props} from "@ngrx/store";
import {IFormStyles} from "../services/IFieldsStyles";

export const getFormData = createAction('[FormData] Get Form Data')
export const setFormData = createAction('[FormData] Set Form Data after API call', props<{formData: any}>())
export const getAllFormDataForSave = createAction('[FormData] Get Form Data for save')
export const updateFormMapData = createAction('[FormData] Update Form Map Data', props<{mapData: string[]}>())
export const updateFormStyles = createAction('[FormData] Update Form styles', props<{formStyles: IFormStyles}>())
export const updateToken = createAction('[FormData] Update token', props<{token: string | null}>())
export const updateElementsStyles = createAction('[FormData] Update Form Elements Styles', props<{elementsStyles:string}>())
export const deleteDataFromState = createAction('[FormData] Delete data on exit')
