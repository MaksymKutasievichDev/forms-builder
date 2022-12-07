import {AppStateInterface} from "../services/appState.interface";
import {createSelector} from "@ngrx/store";

export const selectForm = (state: AppStateInterface) => state.formState
export const formElementsSelector = createSelector(selectForm, (state) => state.form.templateMap)
export const formStylesSelector = createSelector(selectForm,(state) => state.form.formStyles)
export const formElementsStyles = createSelector(selectForm,(state) => state.form.elementStyles)
export const isLoadingSelector = createSelector(selectForm, (state) => state.isLoading)
export const formDataForDownload = createSelector(selectForm, (state) => state.form)
