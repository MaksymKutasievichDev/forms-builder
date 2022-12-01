import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  @Input() activeElementIndex: number;
  @Input() formTemplateElements:string[]
  @Input() fieldsStyles:any = {}

  @Output() clickedElementIndex = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  getFormElementIndex(event:any):void{
    this.clickedElementIndex.emit(event.target.dataset.index)
  }
}
