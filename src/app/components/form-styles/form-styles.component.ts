import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-form-styles',
  templateUrl: './form-styles.component.html',
  styleUrls: ['./form-styles.component.scss']
})
export class FormStylesComponent implements OnInit {

  form:any = {};
  panelOpenState:boolean = false;

  @Output() formStyles = new EventEmitter<object>()

  constructor() { }

  ngOnInit(): void {
  }

  outputFormStyles():void{
    this.formStyles.emit(this.form)
  }
}
