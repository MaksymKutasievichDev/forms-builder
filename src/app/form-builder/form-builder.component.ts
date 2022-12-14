import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {moveItemInArray} from "@angular/cdk/drag-drop";
import {select, Store} from "@ngrx/store";
import {DomSanitizer} from "@angular/platform-browser";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {SnackBar} from "../shared/directives/snack-bar";
import {IFormStyles} from "../interfaces/fields-styles.interface";
import {formDataForDownload} from "../store/selectors";
import {AppStateInterface} from "../interfaces/app-state.interface";
import {FormDataMutation} from "./services/form-data-mutations.service";

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

  fileUploadForm: FormGroup
  clickedElementIndex:number

  dataSaved$ : Subject<boolean> = new Subject<boolean>();
  isDestroyed$: Subject<boolean> = new Subject<boolean>();

  formTemplateMapSelector: string[] = [];
  formStylesSelectorObs: IFormStyles
  formElementsStylesSelector: object[] = []
  formDataForDownload: any

  downloadJsonHref: any

  constructor(
    snackBar: MatSnackBar,
    private store: Store<AppStateInterface>,
    private sanitizer: DomSanitizer,
    private dataMutation: FormDataMutation
  ) {
    super(snackBar)

    this.fileUploadForm = new FormGroup({
      fileUpload: new FormControl()
    })

    this.store.dispatch({type: '[FormData] Get Form Data'})
    this.store.pipe(select(formDataForDownload)).pipe(takeUntil(this.isDestroyed$)).subscribe(data => {
      this.formStylesSelectorObs = data.formStyles
      this.formTemplateMapSelector = data.templateMap
      this.formElementsStylesSelector = data.elementStyles ? JSON.parse(data.elementStyles) : []
      this.formDataForDownload = data;
      let theJSON = JSON.stringify(data);
      let uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
      this.downloadJsonHref = uri;
    })
  }

  ngOnInit(): void {
  }
  /*GET INDEX OF CLICKED ELEMENT*/
  getClickedElementIndex(event:any){
    this.clickedElementIndex = event
  }
  /*Save form template*/
  saveMap():void{
    this.dataMutation.saveFormToDb(this.formDataForDownload)
      .pipe(takeUntil(this.dataSaved$)).subscribe(
      data => {
        data.success == true ? this.successShow('Form saved') : this.errorShow('Something is wrong :(')
      }
    )
  }

  /*DRAG&DROP*/
  drop(event: any) {
    if (event.previousContainer !== event.container && event.previousContainer.id === 'cdk-drop-list-1') {
      /*Add new element to elements and styles*/
      this.dataMutation.addElementToForm(this.formTemplateMapSelector, event.currentIndex, event.previousContainer.data[event.previousIndex])
      this.dataMutation.addStylesForNewElement(this.formElementsStylesSelector, event.item.data, event.currentIndex)
      this.formElementsList.splice(event.previousIndex, 1)
    } else {
      /*On item move in same container*/
      if(event.container.id=='cdk-drop-list-0'){
        this.dataMutation.moveElementInsideForm(this.formTemplateMapSelector, this.formElementsStylesSelector, event.previousIndex, event.currentIndex, event.container.data[event.previousIndex])
        this.clickedElementIndex = event.currentIndex
      } else {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
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
  block(){return false;}

  ngOnDestroy() {
    /*Unsubscribing from saving subscription :)*/
    this.dataSaved$.next(true);
    this.isDestroyed$.next(true)
    this.isDestroyed$.unsubscribe()
    this.dataSaved$.unsubscribe();
  }
}
