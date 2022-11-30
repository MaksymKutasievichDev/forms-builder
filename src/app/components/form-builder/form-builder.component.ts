import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

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

  formTemplateElements:string[] = [];

  backupformTemplateElements:string[] =[]
  templateWasChanged: boolean = false;

  constructor(private router: Router, private token: TokenStorageService, private authService: AuthService) {
  }

  ngOnInit(): void {
    console.log(this.token.getToken())
    if(!this.token.getToken() || this.token.getToken() == "undefined" ){
      this.router.navigate(['login'])
    }
    //LOAD SAVE IF EXIST
    this.authService.getUserDataByToken(this.token.getToken()).subscribe(
      data => {
        console.log(data[0])
        if('templatemap' in data[0]){
          this.formTemplateElements = data[0].templatemap
        }
      }
    )
  }

  /*TEMPLATE API CALLS*/
  //SAVE TEMPLATE MAP
  saveMap():void{
    console.log(this.token.getToken())
    this.authService.saveTemplateMap(this.backupformTemplateElements, this.token.getToken()).subscribe(
      data => {
        console.log(data)
      }
    )
  }

  /*DRAG&DROP*/
  drop(event: any) {
    console.log('drop')
    console.log(event)
    if (event.previousContainer !== event.container && event.previousContainer.id === 'cdk-drop-list-1') {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.backupformTemplateElements = event.container.data
      this.templateWasChanged = true
      console.log(this.backupformTemplateElements)
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
