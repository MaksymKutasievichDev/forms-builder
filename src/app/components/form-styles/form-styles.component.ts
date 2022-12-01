import {Component, EventEmitter, OnChanges, OnInit, Input, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-form-styles',
  templateUrl: './form-styles.component.html',
  styleUrls: ['./form-styles.component.scss']
})
export class FormStylesComponent implements OnInit {

  form:any = {};
  panelOpenState:boolean = false;

  @Input() startFormStyles:any

  @Output() formStyles = new EventEmitter<object>()

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges){
    if (typeof changes['startFormStyles'] != 'undefined') {
      this.form = this.startFormStyles
    }
  }

  outputFormStyles():void{
    this.formStyles.emit(this.form)
  }
}
