import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {IFormElementStyles} from "../../../interfaces/form-data.interface";

enum ElementsTags {
  Input = "Input",
  Textarea = "Textarea",
  Select = "Select",
  Checkbox = "Checkbox",
  Button = "Button"
}

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit {

  @Input() activeElementIndex: number;
  @Input() formTemplateElements: string[]
  @Input() fieldsStyles: IFormElementStyles[] = []

  @Output() clickedElementIndex = new EventEmitter<number>()

  ElementTags: typeof ElementsTags = ElementsTags

  constructor() { }

  ngOnInit(): void {
  }

  getFormElementIndex(event: Event):void{
    // @ts-ignore
    this.clickedElementIndex.emit(parseInt((event.target as HTMLElement).dataset['index']))
  }
}
