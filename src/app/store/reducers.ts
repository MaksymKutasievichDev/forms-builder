import {formStateInterface} from "../interfaces/form-state.interface";
import {createReducer, on} from "@ngrx/store";
import * as FormDataActions from './actions'

export const initialState: formStateInterface = {
  isLoading: false,
  form:{
    templateMap: [],
    formStyles: {},
    elementStyles:'',
    token:''
  },
  error: null
}

export const reducers = createReducer(
  initialState,
  on(FormDataActions.getFormData, (state) => ({...state, isLoading: false})),
  on(FormDataActions.setFormData, (state, {formData}) => ({
    ...state,
    form: {
      ...state.form,
      templateMap: formData.templatemap ? formData.templatemap : [],
      formStyles: formData.formstyles ? formData.formstyles : {},
      elementStyles: formData.elementstyles ? formData.elementstyles : ''
    }
  })),
  on(FormDataActions.updateFormStyles, (state, {formStyles}) => ({
    ...state,
    form:{
      ...state.form,
      formStyles: formStyles
    }
  })),
  on(FormDataActions.updateFormMapData, (state, {mapData}) => ({
    ...state,
    form: {
      ...state.form,
      templateMap: mapData ? mapData : []
    }
  })),
  on(FormDataActions.updateElementsStyles, (state, {elementsStyles}) => ({
    ...state,
    form: {
      ...state.form,
      elementStyles: elementsStyles
    }
  })),
  on(FormDataActions.deleteDataFromState, (state) => ({
    isLoading: false,
    form:{
      templateMap: [],
      formStyles: {},
      elementStyles:'',
      token:''
    },
    error: null
  })),
  on(FormDataActions.getAllFormDataForSave, (state) => ({
    ...state
  })),
  on(FormDataActions.changeLoadingState, (state, {isLoading}) => ({
    ...state,
    isLoading: isLoading
  }))
)
