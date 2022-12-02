import {Component, EventEmitter, OnChanges, OnInit, Input, Output, SimpleChanges} from '@angular/core';
import {SnackBar} from "../../classes/snackBar";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-form-styles',
  templateUrl: './form-styles.component.html',
  styleUrls: ['./form-styles.component.scss']
})
export class FormStylesComponent extends SnackBar implements OnInit {

  form:any = {};
  panelOpenState:boolean = false;

  /*Loaded from server styles*/
  @Input() startFormStyles:any

  @Output() formStyles = new EventEmitter<object>()

  constructor(snackBar: MatSnackBar) {
    super(snackBar)
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges){
    if (typeof changes['startFormStyles'] != 'undefined') {
      this.form = this.startFormStyles
    }
  }

  outputFormStyles():void{
    this.formStyles.emit(this.form)
    this.successShow("Form style added successfully")
  }
}
