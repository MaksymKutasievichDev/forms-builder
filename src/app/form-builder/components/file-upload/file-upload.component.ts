import {Component, forwardRef} from '@angular/core';
import {Store} from "@ngrx/store";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Observable} from "rxjs";
import {AppStateInterface} from "../../../interfaces/app-state.interface";
import {setFormData} from "../../../store/actions";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => FileUploadComponent)
  }]
})
export class FileUploadComponent implements ControlValueAccessor{

  fileName: string = ''
  btnDisable: boolean = true
  JsonData: any

  onChange = (fileName:string) => {};
  onTouched = () => {}
  disabled:boolean = false

  constructor(
    public store: Store<AppStateInterface>
  ) {}

  onClick(fileUpload: HTMLInputElement){
    this.onTouched()
    fileUpload.click()
  }

  fileReaderObs(event:any){
    const file = event.target.files[0];
    this.fileName = event.target.files[0].name
    this.btnDisable = false
    let reader = new FileReader();
    reader.readAsText(file);
    return new Observable((subscriber: any)=>{
      reader.onload = function(event) {
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
      this.onChange(this.fileName)
    })
  }

  setDataFromJson(){
    this.store.dispatch(setFormData({
      formData: {
        templatemap: this.JsonData.templateMap,
        formstyles: this.JsonData.formStyles,
        elementstyles: this.JsonData.elementStyles
      }
    }))
  }

  writeValue(value: any) {
    this.fileName = value
  }
  registerOnChange(onChange: any):void {
    this.onChange = onChange
  }
  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched
  }
  setDisabledState(disabled: boolean) {
    this.disabled = disabled
  }
}
