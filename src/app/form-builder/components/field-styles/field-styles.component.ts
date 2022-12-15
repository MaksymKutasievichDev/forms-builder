import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {Color} from "@angular-material-components/color-picker";
import {select, Store} from "@ngrx/store";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {SnackBar} from "../../../shared/directives/snack-bar";
import {formDataForDownload} from "../../../store/selectors";
import {AppStateInterface} from "../../../interfaces/app-state.interface";
import {FormControl} from "@angular/forms";
import {updateElementsStyles} from "../../../store/actions";
import {hexToRgb} from "../../../_helpers/helpers";
import {FormDataMutation} from "../../services/form-data-mutations.service";

@Component({
  selector: 'app-field-styles',
  templateUrl: './field-styles.component.html',
  styleUrls: ['./field-styles.component.scss'],
})
export class FieldStylesComponent extends SnackBar implements OnInit {
  public colorPick: ThemePalette = 'primary';

  panelOpenState:boolean = false;

  title = new FormControl('')
  label = new FormControl('')
  placeholder = new FormControl('')
  width = new FormControl('')
  height = new FormControl('')
  fontSize = new FormControl('')
  fontWeight = new FormControl('')
  color = new FormControl()
  borderColor = new FormControl()
  borderStyle = new FormControl('')

  elementTag:string | null;
  @Input() elementIndex:number = 0;

  addOptionText: string

  isActive:boolean = false

  formElementsStyles$: Observable<any>
  formElementsStyles: [{
    [key: string]: string
  }]

  formTemplateMap$: Observable<any>
  formTemplateMapSelector: string[] | undefined = [];

  innerWidth: any

  constructor(snackBar: MatSnackBar, private store: Store<AppStateInterface>, private dataMutation: FormDataMutation) {
    super(snackBar)
    this.store.pipe(select(formDataForDownload)).subscribe(data => {
      this.formElementsStyles = data.elementStyles ? JSON.parse(data.elementStyles) : ''
      this.formTemplateMapSelector = data.templateMap
    })
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth
  }

  closeModal(){
    this.panelOpenState = false
  }

  ngOnChanges(changes: SimpleChanges){
    if (typeof changes['elementIndex'] != 'undefined') {
      this.elementTag = this.formTemplateMapSelector ? this.formTemplateMapSelector[this.elementIndex] : '';
      if(this.elementIndex && this.formElementsStyles[this.elementIndex] != null){
        this.isActive = true
        this.panelOpenState = true
        this.label.setValue(this.formElementsStyles[this.elementIndex]['label'] ? this.formElementsStyles[this.elementIndex]['label'] : '')
        this.title.setValue(this.formElementsStyles[this.elementIndex]['title'] ? this.formElementsStyles[this.elementIndex]['title'] : '')
        this.placeholder.setValue(this.formElementsStyles[this.elementIndex]['placeholder'] ? this.formElementsStyles[this.elementIndex]['placeholder'] : '')
        this.width.setValue(this.formElementsStyles[this.elementIndex]['width'] ? this.formElementsStyles[this.elementIndex]['width'].replace(/\D/g, '') : '')
        this.height.setValue(this.formElementsStyles[this.elementIndex]['height'] ? this.formElementsStyles[this.elementIndex]['height'].replace(/\D/g, '') : '')
        this.fontSize.setValue(this.formElementsStyles[this.elementIndex]['fontSize'] ? this.formElementsStyles[this.elementIndex]['fontSize'].replace(/\D/g, '') : '')
        this.fontWeight.setValue(this.formElementsStyles[this.elementIndex]['fontWeight'] ? this.formElementsStyles[this.elementIndex]['fontWeight'] : '')
        let currentColor:any = hexToRgb(this.formElementsStyles[this.elementIndex]['color'])
        this.color.setValue(currentColor ? new Color(currentColor.r, currentColor.g, currentColor.b, 1) : '')
        let currentBorderColor:any = hexToRgb(this.formElementsStyles[this.elementIndex]['borderColor'])
        this.borderColor.setValue(currentBorderColor ? new Color(currentBorderColor.r, currentBorderColor.g, currentBorderColor.b, 1) : '')
        this.borderStyle.setValue(this.formElementsStyles[this.elementIndex]['borderStyle'] ? this.formElementsStyles[this.elementIndex]['borderStyle'] : '')
      }
    }
  }

  saveFieldStyles(){
    let formElementStylesCopy = JSON.parse(JSON.stringify(this.formElementsStyles));
    this.title.value ? formElementStylesCopy[this.elementIndex].title = this.title.value : ''
    this.label.value ? formElementStylesCopy[this.elementIndex].label = this.label.value : ''
    this.placeholder.value ? formElementStylesCopy[this.elementIndex].placeholder = this.placeholder.value : ''
    this.width.value ? formElementStylesCopy[this.elementIndex].width = this.width.value + 'px' : ''
    this.height.value ? formElementStylesCopy[this.elementIndex].height = this.height.value + 'px' : ''
    this.fontSize.value ? formElementStylesCopy[this.elementIndex].fontSize = this.fontSize.value + 'px' : ''
    this.fontWeight.value ? formElementStylesCopy[this.elementIndex].fontWeight = this.fontWeight.value : ''
    this.color.value.hex ? formElementStylesCopy[this.elementIndex].color = '#' + this.color.value.hex : ''
    this.borderColor.value.hex ? formElementStylesCopy[this.elementIndex].borderColor = '#' + this.borderColor.value.hex : ''
    this.borderStyle.value ? formElementStylesCopy[this.elementIndex].borderStyle = this.borderStyle.value : ''
    this.innerWidth <= 768 ? this.panelOpenState = false : ''
    this.store.dispatch(updateElementsStyles({elementsStyles: JSON.stringify(formElementStylesCopy)}))
    this.successShow('Styles added successfully')
  }

  sendDeleteCall(){
    this.dataMutation.deleteElement(this.formTemplateMapSelector, this.formElementsStyles, this.elementIndex)
    this.successShow('Element deleted successfully')
  }

  addOption(){
    this.dataMutation.addOption(this.formElementsStyles, this.elementIndex, this.addOptionText)
    this.addOptionText = ''
    this.successShow('Option added')
  }
  removeOption(index:number){
    this.dataMutation.removeOption(this.formElementsStyles, index, this.elementIndex)
    this.successShow('Option removed')
  }
}
