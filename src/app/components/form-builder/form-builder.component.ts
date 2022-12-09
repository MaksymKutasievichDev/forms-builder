import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {AuthService} from "../../services/auth.service";
import {moveItemInArray} from "@angular/cdk/drag-drop";
import {SnackBar} from "../../classes/snackBar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable, Subject, forkJoin} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {IFormStyles} from "../../services/IFieldsStyles";
import {select, Store} from "@ngrx/store";
import {updateElementsStyles, updateFormMapData} from "../../store/actions";
import {formDataForDownload, formElementsSelector, formElementsStyles, formStylesSelector} from "../../store/selectors";
import {AppStateInterface} from "../../services/appState.interface";
import {DomSanitizer} from "@angular/platform-browser";
import {FormControl, FormGroup} from "@angular/forms";

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

  formDataIsLoading:boolean = false;

  fileUploadForm: FormGroup

  templateWasChanged: boolean = false;

  clickedElementIndex:number

  dataRecieved$ : Subject<boolean> = new Subject<boolean>();
  dataSaved$ : Subject<boolean> = new Subject<boolean>();

  formStylesSelect$ : Observable<any>
  formTemplateMap$: Observable<any>
  formElementsStyles$: Observable<any>
  formDataForDownload$: Observable<any>

  formTemplateMapSelector: string[] | undefined = [];
  formStylesSelectorObs: IFormStyles
  formElementsStylesSelector: object[] = []
  formDataForDownload: any

  downloadJsonHref: any

  constructor(
    private token: TokenStorageService,
    private authService: AuthService,
    snackBar: MatSnackBar,
    private store: Store<AppStateInterface>,
    private sanitizer: DomSanitizer
  ) {
    super(snackBar)

    this.fileUploadForm = new FormGroup({
      fileUpload: new FormControl()
    })

    this.formStylesSelect$ = this.store.pipe(select(formStylesSelector))
    this.formTemplateMap$ = this.store.pipe(select(formElementsSelector))
    this.formElementsStyles$ = this.store.pipe(select(formElementsStyles))
    this.formDataForDownload$ = this.store.pipe(select(formDataForDownload))
  }

  test(){
    console.log(this.fileUploadForm.value)
  }

  ngOnInit(): void {
    this.store.dispatch({type: '[FormData] Get Form Data'})
    this.formDataIsLoading = true;
    this.formTemplateMap$.subscribe(data => this.formTemplateMapSelector = data)
    this.formElementsStyles$.subscribe(data => this.formElementsStylesSelector = data ? JSON.parse(data) : [])
    this.formStylesSelect$.subscribe(data => this.formStylesSelectorObs = data)

    this.formDataForDownload$.subscribe(data => {
      let theJSON = JSON.stringify(data);
      let uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
      this.downloadJsonHref = uri;
    })
  }


  /*GET INDEX OF CLICKED ELEMENT*/
  getClickedElementIndex(event:any){
    this.clickedElementIndex = event
  }

  /*Save form template*/
  saveMap():void{
    this.authService.saveTemplateMap(
      this.formTemplateMapSelector,
      this.formStylesSelectorObs,
      JSON.stringify(this.formElementsStylesSelector),
      this.token.getToken()
    ).pipe(takeUntil(this.dataSaved$)).subscribe(
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
      let newFormMap = JSON.parse(JSON.stringify(this.formTemplateMapSelector));
      newFormMap.splice(event.currentIndex, 0, event.previousContainer.data[event.previousIndex])
      this.store.dispatch(updateFormMapData({mapData: newFormMap}))
      this.formElementsList.splice(event.previousIndex, 1)
      this.templateWasChanged = true

      /*Change fields styles*/
      let newFormElementsStyles = JSON.parse(JSON.stringify(this.formElementsStylesSelector));
      if(event.item.data=="Select"){
        console.log('select')
        newFormElementsStyles.splice(event.currentIndex, 0, {options:['option1', 'option2']})
      } else {
        newFormElementsStyles.splice(event.currentIndex, 0, {})
      }
      this.store.dispatch(updateElementsStyles({elementsStyles: JSON.stringify(newFormElementsStyles)}))
    } else {
      /*On item move in same container*/
      /*Change styles array indexes when new element added to template*/
      if(event.container.id=='cdk-drop-list-0'){
        /*Mapping*/
        let newFormMap = JSON.parse(JSON.stringify(this.formTemplateMapSelector));
        newFormMap.splice(event.previousIndex, 1)
        newFormMap.splice(event.currentIndex, 0, event.container.data[event.previousIndex])
        this.store.dispatch(updateFormMapData({mapData: newFormMap}))
        /*Styles*/
        let newFormElementsStyles = JSON.parse(JSON.stringify(this.formElementsStylesSelector));
        let dataForMove = newFormElementsStyles[event.previousIndex]
        newFormElementsStyles.splice(event.previousIndex, 1)
        newFormElementsStyles.splice(event.currentIndex, 0, dataForMove)
        this.store.dispatch(updateElementsStyles({elementsStyles: JSON.stringify(newFormElementsStyles)}))
        this.clickedElementIndex = event.currentIndex
      } else {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
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
