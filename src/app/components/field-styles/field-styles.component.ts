import {Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges} from '@angular/core';
import {SnackBar} from "../../classes/snackBar";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-field-styles',
  templateUrl: './field-styles.component.html',
  styleUrls: ['./field-styles.component.scss'],
})
export class FieldStylesComponent extends SnackBar implements OnInit {

  form:any = {};
  panelOpenState:boolean = false;

  @Input() elementTag:string ='';
  @Input() elementIndex:number;
  @Input() fieldsStyles:any;

  options: string[]
  addOptionText: string

  @Output() fieldStyles = new EventEmitter<object>()
  @Output() deleteCall = new EventEmitter<boolean>()

  isActive:boolean = false

  constructor(snackBar: MatSnackBar) {
    super(snackBar)
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){
    /*Update styles for field when clicked element is changed*/
    if (typeof changes['elementTag'] != 'undefined') {
      if(this.elementTag ) this.isActive = true
      if(this.elementTag == 'Select'){
        this.options = this.fieldsStyles[this.elementIndex].options
      }
    }
    if (typeof changes['elementIndex'] != 'undefined') {
      if(this.fieldsStyles[this.elementIndex]!=undefined && typeof this.fieldsStyles[this.elementIndex] != undefined){
        this.form = this.fieldsStyles[this.elementIndex]
      } else {
        this.form = {}
      }
    }
  }

  outputFieldStyles(){
    if(this.elementTag == 'Select'){
      /*Add option to form object before sending to the form (only if select)*/
      this.form.options = this.options
    }
    this.fieldStyles.emit(this.form)
    this.successShow('Styles added successfully')
  }

  sendDeleteCall(){
    this.deleteCall.emit(true)
    this.successShow('Element deleted successfully')
  }

  addOption(){
    this.fieldsStyles[this.elementIndex].options.push(this.addOptionText)
    this.addOptionText=''
    this.options = this.fieldsStyles[this.elementIndex].options
    this.successShow('Option added')
  }
  removeOption(index:number){
    this.fieldsStyles[this.elementIndex].options.splice(index, 1)
    this.options = this.fieldsStyles[this.elementIndex].options
    this.successShow('Option removed')
  }
}
