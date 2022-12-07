import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppStateInterface} from "../../services/appState.interface";
import {Store} from "@ngrx/store";
import {updateElementsStyles, updateFormMapData, updateFormStyles} from "../../store/actions";
import {Observable} from "rxjs";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  fileName: string | null = ''
  btnDisable: boolean = true
  JsonData: any

  constructor(
    private http: HttpClient,
    private store: Store<AppStateInterface>
  ) {

  }

  ngOnInit(): void {

  }

  fileReaderObs(event:any){
    const file = event.target.files[0];
    this.fileName = event.target.files[0].name
    this.btnDisable = false
    let reader = new FileReader();
    reader.readAsText(file);
    return new Observable((subscriber: any)=>{
      reader.onload = function(event) {
        console.log(event)
        //@ts-ignore
        console.log(event.target.result)
        //@ts-ignore
        let data = JSON.parse(event.target.result);

        subscriber.next(data)
        subscriber.complete();
      }
    })
  }

  onFileSelected(event:any){
    this.fileReaderObs(event).subscribe(result=>{
      this.JsonData = result
    })
  }

  setDataFromJson(){
    console.log(this.JsonData)
    console.log(this.store)
    this.store.dispatch(updateElementsStyles({elementsStyles: this.JsonData.elementStyles}))
    this.store.dispatch(updateFormMapData({mapData: this.JsonData.templateMap}))
    this.store.dispatch(updateFormStyles({formStyles: this.JsonData.formStyles}))
  }
}
