import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {array_move} from "../../_helpers/helpers";
import {SnackBar} from "../../classes/snackBar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {IAllFormData} from "../../services/IFieldsStyles";
import {select, Store} from "@ngrx/store";
import {updateFormMapData, updateFormStyles, updateToken} from "../../store/actions";
import {formElementsSelector, formElementsStyles, formStylesSelector, isLoadingSelector} from "../../store/selectors";
import {AppStateInterface} from "../../services/appState.interface";

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent extends SnackBar implements OnInit {

  formElementsList:string[] = [
    'Input',
    'Textarea',
    'Button',
    'Checkbox',
    'Select'
  ];

  templateWasChanged: boolean = false;

  fieldsStyles: any = []
  clickedElementIndex:number

  allFormData: IAllFormData = {
    templateMap: [],
    formStyles: {},
    token:''
  }

  dataRecieved$ : Subject<boolean> = new Subject<boolean>();
  dataSaved$ : Subject<boolean> = new Subject<boolean>();

  /*clicks = fromEvent(document, 'click')
  clicksOnDivs = this.clicks.pipe(filter(ev => (<HTMLElement>ev.target).closest('.form_template__element') !== null))*/

  //formData$: Observable<IAllFormData> = this.store.select(state => state.formData)
  formStylesSelect$ : Observable<any>
  formTemplateMap$: Observable<any>
  formElementsStyles$: Observable<any>

  constructor(
    private router: Router,
    private token: TokenStorageService,
    private authService: AuthService,
    snackBar: MatSnackBar,
    private store: Store<AppStateInterface>
  ) {
    super(snackBar)
    this.formStylesSelect$ = this.store.pipe(select(formStylesSelector))
    this.formTemplateMap$ = this.store.pipe(select(formElementsSelector))
    this.formElementsStyles$ = this.store.pipe(select(formElementsStyles))
  }

  ngOnInit(): void {
    this.store.dispatch({type: '[FormData] Get Form Data'})
    console.log("dispatched")
    //LOAD SAVE IF EXIST
    this.authService.getUserDataByToken(this.token.getToken()).pipe(takeUntil(this.dataRecieved$)).subscribe(
      data => {
        if('templatemap' in data[0]) {
          this.allFormData.templateMap = data[0].templatemap
        }
        if('formstyles' in data[0]){
          this.allFormData.formStyles = data[0].formstyles
        }
        if('elementstyles' in data[0]) this.fieldsStyles = JSON.parse(data[0].elementstyles)
        this.dataRecieved$.next(true)
        this.dataRecieved$.unsubscribe()
      }
    )
    this.allFormData.token = this.token.getToken()
    //this.token.getToken() ? this.store.dispatch(updateToken({token: this.token.getToken()})) : ''

    /*this.clicksOnDivs.subscribe(x=>{
      console.log(x)
    })*/
  }

  /*Get form styles from output*/
  updateFormStyles(formStyles:object){
    //this.allFormData.formStyles = formStyles
    //this.store.dispatch(updateFormStyles({formStyles: formStyles}))
  }
  /*Get field styles from output*/
  updateFieldsStyles(fieldStyles:object){
    this.fieldsStyles[this.clickedElementIndex] = fieldStyles
  }
  /*Delete active element when called*/
  DeleteElement(event:boolean):void{
    if(event){
      this.allFormData.templateMap.splice(this.clickedElementIndex, 1)
      this.fieldsStyles.splice(this.clickedElementIndex,1)
      this.clickedElementIndex = -1
      this.templateWasChanged = true
      this.successShow('Element deleted')
    }
  }

  /*GET INDEX OF CLICKED ELEMENT*/
  getClickedElementIndex(event:any){
    this.clickedElementIndex = event
  }

  /*Save form template*/
  saveMap():void{
    this.allFormData.elementStyles = JSON.stringify((this.fieldsStyles))
    this.authService.saveTemplateMap(this.allFormData).pipe(takeUntil(this.dataSaved$)).subscribe(
      data => {
        if(data.success == true){
          this.successShow('Form saved')
          this.templateWasChanged = false
        } else {
          this.errorShow('Something is wrong :(')
        }
      }
    )
  }

  /*DRAG&DROP*/
  drop(event: any) {
    if (event.previousContainer !== event.container && event.previousContainer.id === 'cdk-drop-list-1') {
      /*On item move from elements to template*/
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.templateWasChanged = true
      /*Add additional options on select field created*/
      if(event.item.data=="Select"){
        if(event.currentIndex > this.fieldsStyles.length){
          while(event.currentIndex > this.fieldsStyles.length){
            this.fieldsStyles.push(undefined)
          }
        }
        this.fieldsStyles.splice(event.currentIndex, 0, {options:['option1', 'option2']})
      } else {
        this.fieldsStyles.splice(event.currentIndex, 0, null)
      }
    } else {
      /*On item move in same container*/
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      /*Change styles array indexes when new element added to template*/
      if(event.container.id=='cdk-drop-list-0'){
        this.fieldsStyles = array_move(this.fieldsStyles, event.previousIndex, event.currentIndex)
        this.clickedElementIndex = event.currentIndex
      }
    }
  }
  exited(event: any) {
    /*Create duplicate of element on leave (only for elements container) */
    const currentIdx = event.container.data.findIndex(
      (f: any) => f === event.item.data
    );
    this.formElementsList.splice(currentIdx + 1, 0, event.item.data)
  }
  entered(event: any) {
    /*Delete item with same data on container enetered (only for elements container) */
    const currentIdx = event.container.data.findIndex(
      (f: any) => f === event.item.data
    );
    this.formElementsList.splice(currentIdx + 1, 1)
  }
  /*Block drop functionality for elements div*/
  block(){
    return false;
  }

  ngOnDestroy() {
    /*Unsubscribing from saving subscription :)*/
    this.dataSaved$.next(true);
    this.dataSaved$.unsubscribe();
  }
}
