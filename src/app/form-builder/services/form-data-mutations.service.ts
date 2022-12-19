import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppStateInterface} from "../../interfaces/app-state.interface";
import {updateElementsStyles, updateFormMapData} from "../../store/actions";


@Injectable({
  providedIn: 'root'
})
export class FormDataMutationService {

  constructor(
    private store: Store<AppStateInterface>
  ) {}

  addElementToForm(formTemplateMap:string[], currentIndex: number, newItem:string):void {
    let newFormMap = JSON.parse(JSON.stringify(formTemplateMap));
    newFormMap.splice(currentIndex, 0, newItem)
    this.store.dispatch(updateFormMapData({mapData: newFormMap}))
  }

  addStylesForNewElement(formElementsStyles:object[], elName: string, currentIndex:number):void{
    let newFormElementsStyles = JSON.parse(JSON.stringify(formElementsStyles));
    if(elName=="Select"){
      newFormElementsStyles.splice(currentIndex, 0, {options:['option1', 'option2']})
    } else {
      newFormElementsStyles.splice(currentIndex, 0, {})
    }
    this.store.dispatch(updateElementsStyles({elementsStyles: JSON.stringify(newFormElementsStyles)}))
  }

  moveElementInsideForm(
    formTemplateMap:string[],
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
    formElementsStyles: object[],
    prevIndex: number,
    currentIndex:number
  ){
    let newFormElementsStyles = JSON.parse(JSON.stringify(formElementsStyles));
    let dataForMove = newFormElementsStyles[prevIndex]
    newFormElementsStyles.splice(prevIndex, 1)
    newFormElementsStyles.splice(currentIndex, 0, dataForMove)
    this.store.dispatch(updateElementsStyles({elementsStyles: JSON.stringify(newFormElementsStyles)}))
  }

  deleteElement(formTemplateMap:string[] | undefined, formElementsStyles:object[], elIndex:number){
    /*DELETE FROM ELEMENTS*/
    let formTemplateMapSelectorCopy = JSON.parse(JSON.stringify(formTemplateMap));
    formTemplateMapSelectorCopy.splice(elIndex,1)
    this.store.dispatch(updateFormMapData({mapData: formTemplateMapSelectorCopy}))
    /*DELETE FROM STYLES*/
    let formElementStylesCopy = JSON.parse(JSON.stringify(formElementsStyles));
    formElementStylesCopy.splice(elIndex, 1)
    this.store.dispatch(updateElementsStyles({elementsStyles: JSON.stringify(formElementStylesCopy)}))
  }

  addOption(formElementsStyles:object[], elIndex:number, optionText: string) {
    let formElementStylesCopy = JSON.parse(JSON.stringify(formElementsStyles));
    formElementStylesCopy[elIndex].options.push(optionText)
    this.store.dispatch(updateElementsStyles({elementsStyles: JSON.stringify(formElementStylesCopy)}))
  }

  removeOption(formElementsStyles: object[], optionIndex:number, elIndex:number){
    let formElementStylesCopy = JSON.parse(JSON.stringify(formElementsStyles));
    formElementStylesCopy[elIndex].options.splice(optionIndex,1)
    this.store.dispatch(updateElementsStyles({elementsStyles: JSON.stringify(formElementStylesCopy)}))
  }
}
