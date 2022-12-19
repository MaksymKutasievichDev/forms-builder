import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray} from "@angular/cdk/drag-drop";
import {select, Store} from "@ngrx/store";
import {DomSanitizer} from "@angular/platform-browser";
import {first, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {SnackBar} from "../shared/directives/snack-bar";
import {IAllFormData, IFormStyles} from "../interfaces/form-data.interface";
import {formDataForDownload} from "../store/selectors";
import {AppStateInterface} from "../interfaces/app-state.interface";
import {FormDataMutationService} from "./services/form-data-mutations.service";
import {AuthService} from "../authentication/services/auth.service";

enum DragAndDropContainersIds {
  ChooseBlockContainerID='cdk-drop-list-1',
  FormTemplateContainerId='cdk-drop-list-0'
}

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent extends SnackBar implements OnInit, OnDestroy {

  formElementsList:string[] = [
    'Input',
    'Textarea',
    'Button',
    'Checkbox',
    'Select'
  ];

  fileUploadForm: FormGroup
  clickedElementIndex:number

  isDestroyed$: Subject<boolean> = new Subject<boolean>();

  formTemplateElements: string[] = [];
  formStyles: IFormStyles
  formElementsStyles: object[] = []
  formAllData: IAllFormData

  downloadJsonHref: object

  constructor(
    private store: Store<AppStateInterface>,
    private domSanitizer: DomSanitizer,
    private formDataMutationService: FormDataMutationService,
    private authService: AuthService,
    snackBar: MatSnackBar
  ) {
    super(snackBar)

    this.fileUploadForm = new FormGroup({
      fileUpload: new FormControl()
    })

    this.store.dispatch({type: '[FormData] Get Form Data'})
    this.store.pipe(select(formDataForDownload)).pipe(takeUntil(this.isDestroyed$)).subscribe(data => {
      this.formStyles = data.formStyles
      this.formTemplateElements = data.templateMap
      this.formElementsStyles = data.elementStyles ? JSON.parse(data.elementStyles) : []
      this.formAllData = data;
      let theJSON = JSON.stringify(data);
      let uri = this.domSanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
      this.downloadJsonHref = uri;
    })
  }

  ngOnInit(): void {
  }

  getClickedElementIndex(event:number){
    this.clickedElementIndex = event
  }

  saveMap():void{
    this.authService.saveFormToDb(this.formAllData)
      .pipe(first()).subscribe(
      data => {
        data.success == true ? this.successShow('Form saved') : this.errorShow('Something is wrong :(')
      }
    )
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container && event.previousContainer.id === DragAndDropContainersIds.ChooseBlockContainerID) {
      this.formDataMutationService.addElementToForm(this.formTemplateElements, event.currentIndex, event.previousContainer.data[event.previousIndex])
      this.formDataMutationService.addStylesForNewElement(this.formElementsStyles, event.item.data, event.currentIndex)
      this.formElementsList.splice(event.previousIndex, 1)
    } else {
      if(event.container.id==DragAndDropContainersIds.FormTemplateContainerId){
        this.formDataMutationService.moveElementInsideForm(this.formTemplateElements, event.previousIndex, event.currentIndex, event.container.data[event.previousIndex])
        this.formDataMutationService.moveElementsStyles(this.formElementsStyles, event.previousIndex, event.currentIndex)
        this.clickedElementIndex = event.currentIndex
      } else {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      }
    }
  }
  containerExitedOnDrag(event: CdkDragExit) {
    const currentIdx = event.container.data.findIndex(
      (f: string) => f === event.item.data
    );
    this.formElementsList.splice(currentIdx + 1, 0, event.item.data)
  }
  containerEnteredOnDrag(event: CdkDragEnter) {
    const currentIdx = event.container.data.findIndex(
      (f: string) => f === event.item.data
    );
    this.formElementsList.splice(currentIdx + 1, 1)
  }

  blockDropping(){return false;}

  ngOnDestroy() {
    this.isDestroyed$.next(true)
    this.isDestroyed$.unsubscribe()
  }
}
