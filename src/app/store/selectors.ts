import {AppStateInterface} from "../interfaces/app-state.interface";
import {createSelector} from "@ngrx/store";

export const selectForm = (state: AppStateInterface) => state.formState
export const formStylesSelector = createSelector(selectForm,(state) => state.form.formStyles)
export const formDataForDownload = createSelector(selectForm, (state) => state.form)
export const changeIsLoading = createSelector(selectForm, (state => state.isLoading))
