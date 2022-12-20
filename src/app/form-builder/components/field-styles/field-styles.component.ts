import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {select, Store} from "@ngrx/store";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SnackBar} from "../../../shared/directives/snack-bar";
import {formDataForDownload} from "../../../store/selectors";
import {AppStateInterface} from "../../../interfaces/app-state.interface";
import {updateElementsStyles} from "../../../store/actions";
import {FormDataMutationService} from "../../services/form-data-mutations.service";
import {DataChangingService} from "../../services/data-changing.service";

@Component({
  selector: 'app-field-styles',
  templateUrl: './field-styles.component.html',
  styleUrls: ['./field-styles.component.scss'],
})
export class FieldStylesComponent extends SnackBar implements OnInit {
  public colorPick: ThemePalette = 'primary';

  panelOpenState:boolean = false;

  myForm: FormGroup

  elementTag:string | null;
  @Input() elementIndex:number = 0;

  newSelectOptionText: string

  isActive:boolean = false

  formElementsStyles: [{ [key: string]: string }]
  formTemplateMapSelector: string[] | undefined = [];

  innerWidth: number
  touchUi: boolean = false

  constructor(
    snackBar: MatSnackBar,
    private store: Store<AppStateInterface>,
    private formDataMutationService: FormDataMutationService,
    private formBuilder: FormBuilder,
    private dataChangingService: DataChangingService
  ) {
    super(snackBar)
    this.store.pipe(select(formDataForDownload)).subscribe(data => {
      this.formElementsStyles = data.elementStyles ? JSON.parse(data.elementStyles) : ''
      this.formTemplateMapSelector = data.templateMap
    })
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      title: '',
      label: '',
      placeholder: '',
      width: '',
      height: '',
      fontSize: '',
      fontWeight: '',
      color: '',
      borderColor: '',
      borderStyle: ''
    })
    this.innerWidth = window.innerWidth
    if(this.innerWidth < 768){
      this.touchUi = true
    }
  }

  closeModal(){
    this.panelOpenState = false
  }

  ngOnChanges(changes: SimpleChanges){
    if (typeof changes['elementIndex'] != 'undefined') {
      this.elementTag = this.formTemplateMapSelector ? this.formTemplateMapSelector[this.elementIndex] : '';
      if(typeof this.elementIndex != 'undefined' && this.formElementsStyles[this.elementIndex] !== null){
        this.isActive = true
        this.panelOpenState = true
        this.myForm.setValue({
          title: '',
          label: '',
          placeholder: '',
          width: '',
          height: '',
          fontSize: '',
          fontWeight: '',
          color: '',
          borderColor: '',
          borderStyle: ''
        })
        let preparedData = this.dataChangingService.changeDataBeforeFieldsUpdate(this.formElementsStyles[this.elementIndex])
        this.myForm.patchValue(preparedData)
      }
    }
  }

  saveFieldStyles(){
    let formElementStylesCopy = JSON.parse(JSON.stringify(this.formElementsStyles));
    let options = formElementStylesCopy[this.elementIndex].options
    formElementStylesCopy[this.elementIndex] = this.dataChangingService.changeFieldsDataBeforeSave(this.myForm.value)
    if(typeof options != undefined) formElementStylesCopy[this.elementIndex].options = options

    this.innerWidth <= 768 ? this.panelOpenState = false : ''
    this.store.dispatch(updateElementsStyles({elementsStyles: JSON.stringify(formElementStylesCopy)}))
    this.successShow('Styles added successfully')
  }

  deleteElement(){
    this.formDataMutationService.deleteElement(this.formTemplateMapSelector, this.formElementsStyles, this.elementIndex)
    this.successShow('Element deleted successfully')
  }

  addOption(){
    this.formDataMutationService.addOption(this.formElementsStyles, this.elementIndex, this.newSelectOptionText)
    this.newSelectOptionText = ''
    this.successShow('Option added')
  }
  removeOption(index:number){
    this.formDataMutationService.removeOption(this.formElementsStyles, index, this.elementIndex)
    this.successShow('Option removed')
  }
}
