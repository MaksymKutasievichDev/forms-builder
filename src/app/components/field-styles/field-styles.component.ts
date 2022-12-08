import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {SnackBar} from "../../classes/snackBar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {formElementsSelector, formElementsStyles} from "../../store/selectors";
import {AppStateInterface} from "../../services/appState.interface";
import {FormControl} from "@angular/forms";
import {updateElementsStyles, updateFormMapData} from "../../store/actions";
import {ThemePalette} from "@angular/material/core";
import {Color} from "@angular-material-components/color-picker";
import {hexToRgb} from "../../_helpers/helpers";

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

  constructor(snackBar: MatSnackBar, private store: Store<AppStateInterface>) {
    super(snackBar)
    this.formElementsStyles$ = this.store.pipe(select(formElementsStyles))
    this.formTemplateMap$ = this.store.pipe(select(formElementsSelector))
  }

  ngOnInit(): void {
    this.formElementsStyles$.subscribe(
      data => {
        this.formElementsStyles = data ? JSON.parse(data) : ''
      }
    )
    this.formTemplateMap$.subscribe(data => this.formTemplateMapSelector = data)
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

    this.innerWidth <= 620 ? this.panelOpenState = false : ''
    this.store.dispatch(updateElementsStyles({elementsStyles: JSON.stringify(formElementStylesCopy)}))
    this.successShow('Styles added successfully')
  }

  sendDeleteCall(){
    /*DELETE FROM ELEMENTS*/
    let formTemplateMapSelectorCopy = JSON.parse(JSON.stringify(this.formTemplateMapSelector));
    formTemplateMapSelectorCopy.splice(this.elementIndex,1)
    this.store.dispatch(updateFormMapData({mapData: formTemplateMapSelectorCopy}))
    /*DELETE FROM STYLES*/
    let formElementStylesCopy = JSON.parse(JSON.stringify(this.formElementsStyles));
    formElementStylesCopy.splice(this.elementIndex, 1)
    this.store.dispatch(updateElementsStyles({elementsStyles: JSON.stringify(formElementStylesCopy)}))
    /*SUCCESS MESSAGE*/
    this.successShow('Element deleted successfully')
  }

  addOption(){
    let formElementStylesCopy = JSON.parse(JSON.stringify(this.formElementsStyles));
    formElementStylesCopy[this.elementIndex].options.push(this.addOptionText)
    this.store.dispatch(updateElementsStyles({elementsStyles: JSON.stringify(formElementStylesCopy)}))
    this.addOptionText = ''
    this.successShow('Option added')
  }
  removeOption(index:number){
    let formElementStylesCopy = JSON.parse(JSON.stringify(this.formElementsStyles));
    formElementStylesCopy[this.elementIndex].options.splice(index,1)
    this.store.dispatch(updateElementsStyles({elementsStyles: JSON.stringify(formElementStylesCopy)}))
    this.successShow('Option removed')
  }
}
