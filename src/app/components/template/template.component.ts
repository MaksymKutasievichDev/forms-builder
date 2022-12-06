import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges, SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit {

  @Input() activeElementIndex: number;
  @Input() formTemplateElements:string[]
  @Input() fieldsStyles:any = {}


  @Output() clickedElementIndex = new EventEmitter<number>()

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    //setInterval(()=>{
    //  /*this.changeDetectionRef.detectChanges()*/
    //  console.log('check tick')
    //  console.log(this.fieldsStyles)
    //}, 3000)
  }

  getFormElementIndex(event:any):void{
    this.clickedElementIndex.emit(event.target.dataset.index)
  }
  componentCreated(){
    //console.log('template component created')
  }
}
