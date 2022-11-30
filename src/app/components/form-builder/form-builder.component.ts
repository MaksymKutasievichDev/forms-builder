import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";
import {moveItemInArray, copyArrayItem, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {

  formElementsList:string[] = [
    'Input',
    'Textarea',
    'Button',
    'Checkbox',
    'Select'
  ];

  formTemplateElements:string[] = [
  ];

  constructor(private router: Router, private token: TokenStorageService) {
  }

  ngOnInit(): void {
    console.log(this.token.getToken())
    if(!this.token.getToken() || this.token.getToken() == "undefined" ){
      this.router.navigate(['login'])
    }
  }

  drop(event: any) {
    console.log('drop')
    console.log(event)
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  exited(event: any) {
    console.log('exited')
    console.log(event)
    const currentIdx = event.container.data.findIndex(
      (f: any) => f === event.item.data
    );
    this.formElementsList.splice(currentIdx + 1, 0, event.item.data)
  }
  entered(event: any) {
    const currentIdx = event.container.data.findIndex(
      (f: any) => f === event.item.data
    );
    this.formElementsList.splice(currentIdx + 1, 1)
  }
}
