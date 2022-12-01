import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {array_move} from "../../_helpers/helpers";

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
  formTemplateElementsStyles:any = [];

  backupformTemplateElements:any =[]
  templateWasChanged: boolean = false;
  savedSuccess: boolean = false;

  formStyles:any = {}
  fieldsStyles: any = []
  clickedElementIndex:number

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
        if('formstyles' in data[0]){
          this.formStyles = data[0].formstyles
        }
        if('elementstyles' in data[0]){
          this.fieldsStyles = JSON.parse(data[0].elementstyles)
          console.log(this.fieldsStyles)
        }
      }
    )
  }

  /*Get form styles from output*/
  updateFormStyles(formStyles:object){
    this.formStyles = formStyles
  }
  /*Get field styles from output*/
  updateFieldsStyles(fieldStyles:object){
    this.fieldsStyles[this.clickedElementIndex] = fieldStyles
  }
  /*Delete active element when called*/
  DeleteElement(event:boolean):void{
    if(event === true){
      this.formTemplateElements.splice(this.clickedElementIndex,1)
      this.backupformTemplateElements = this.formTemplateElements
      this.fieldsStyles.splice(this.clickedElementIndex,1)
      this.clickedElementIndex = -1
    }
  }

  /*GET INDEX OF CLICKED ELEMENT*/
  getClickedElementIndex(event:any){
    this.clickedElementIndex = event
  }

  /*TEMPLATE API CALLS*/
  //SAVE TEMPLATE MAP
  saveMap():void{
    console.log(this.fieldsStyles)
    console.log(this.formStyles)
    console.log(JSON.stringify(this.fieldsStyles))
    this.authService.saveTemplateMap(this.backupformTemplateElements, this.formStyles, JSON.stringify(this.fieldsStyles), this.token.getToken()).subscribe(
      data => {
        if(data.success == true){
          this.savedSuccess = true
          setTimeout(()=>{
            this.savedSuccess = false
          }, 3100)
        }
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
      this.fieldsStyles.splice(event.currentIndex, 0, null)
      console.log(this.backupformTemplateElements)
      if(event.item.data=="Select"){
        if(event.currentIndex > this.fieldsStyles.length){
          while(event.currentIndex > this.fieldsStyles.length){
            this.fieldsStyles.push(undefined)
          }
        }
        this.fieldsStyles.splice(event.currentIndex, 0, {options:['option1', 'option2']})
      }
      console.log(this.fieldsStyles)
    } else {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      if(event.container.id=='cdk-drop-list-0'){
        array_move(this.fieldsStyles, event.previousIndex, event.currentIndex)
        this.clickedElementIndex = event.currentIndex
      }
    }
  }
  exited(event: any) {
    console.log('exited')
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
