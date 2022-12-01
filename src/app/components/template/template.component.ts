import {Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateComponent implements OnInit {

  @Input() formTemplateElements:string[]

  @Output() clickedElementIndex = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  getFormElementIndex(event:any):void{
    this.clickedElementIndex.emit(event.target.dataset.index)
  }
}
