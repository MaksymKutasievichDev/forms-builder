import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppStateInterface} from "../../interfaces/app-state.interface";
import {updateElementsStyles, updateFormMapData} from "../../store/actions";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../../services/token-storage.service";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class FormDataMutation {

  constructor(
    private store: Store<AppStateInterface>,
    private http: HttpClient,
    private token: TokenStorageService
  ) {
  }

  addElementToForm(formTemplateMap:any, currentIndex: number, newItem:any):void {
    let newFormMap = JSON.parse(JSON.stringify(formTemplateMap));
    newFormMap.splice(currentIndex, 0, newItem)
    this.store.dispatch(updateFormMapData({mapData: newFormMap}))
  }

  addStylesForNewElement(formElementsStyles:any, elName: string, currentIndex:number):void{
    let newFormElementsStyles = JSON.parse(JSON.stringify(formElementsStyles));
    if(elName=="Select"){
      newFormElementsStyles.splice(currentIndex, 0, {options:['option1', 'option2']})
    } else {
      newFormElementsStyles.splice(currentIndex, 0, {})
    }
    this.store.dispatch(updateElementsStyles({elementsStyles: JSON.stringify(newFormElementsStyles)}))
  }

  moveElementInsideForm(
    formTemplateMap:any,
    prevIndex: number,
    currentIndex: number,
    elName: string
  ){
    let newFormMap = JSON.parse(JSON.stringify(formTemplateMap));
    newFormMap.splice(prevIndex, 1)
    newFormMap.splice(currentIndex, 0, elName)
    this.store.dispatch(updateFormMapData({mapData: newFormMap}))
  }

  moveElementsStyles(
    formElementsStyles: any,
    prevIndex: number,
    currentIndex:number
  ){
    let newFormElementsStyles = JSON.parse(JSON.stringify(formElementsStyles));
    let dataForMove = newFormElementsStyles[prevIndex]
    newFormElementsStyles.splice(prevIndex, 1)
    newFormElementsStyles.splice(currentIndex, 0, dataForMove)
    this.store.dispatch(updateElementsStyles({elementsStyles: JSON.stringify(newFormElementsStyles)}))
  }

  deleteElement(formTemplateMap:any, formElementsStyles:any, elIndex:number){
    /*DELETE FROM ELEMENTS*/
    let formTemplateMapSelectorCopy = JSON.parse(JSON.stringify(formTemplateMap));
    formTemplateMapSelectorCopy.splice(elIndex,1)
    this.store.dispatch(updateFormMapData({mapData: formTemplateMapSelectorCopy}))
    /*DELETE FROM STYLES*/
    let formElementStylesCopy = JSON.parse(JSON.stringify(formElementsStyles));
    formElementStylesCopy.splice(elIndex, 1)
    this.store.dispatch(updateElementsStyles({elementsStyles: JSON.stringify(formElementStylesCopy)}))
  }

  addOption(formElementsStyles:any, elIndex:number, optionText: string) {
    let formElementStylesCopy = JSON.parse(JSON.stringify(formElementsStyles));
    formElementStylesCopy[elIndex].options.push(optionText)
    this.store.dispatch(updateElementsStyles({elementsStyles: JSON.stringify(formElementStylesCopy)}))
  }

  removeOption(formElementsStyles:any, optionIndex:number, elIndex:number){
    let formElementStylesCopy = JSON.parse(JSON.stringify(formElementsStyles));
    formElementStylesCopy[elIndex].options.splice(optionIndex,1)
    this.store.dispatch(updateElementsStyles({elementsStyles: JSON.stringify(formElementStylesCopy)}))
  }

  saveFormToDb(formData:any):Observable<any>{
    return this.http.post('http://localhost:4000/save_template',{
      templatemap: formData.templateMap,
      formstyles: formData.formStyles,
      elementstyles: formData.elementStyles
    }, {
      headers: new HttpHeaders({
        'authorization': `Bearer ${this.token.getToken()}`
      })
    })
  }
}
