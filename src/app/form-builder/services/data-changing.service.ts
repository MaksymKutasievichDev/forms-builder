import {Injectable} from "@angular/core";
import {hexToRgb} from "../../_helpers/helpers";
import {Color} from "@angular-material-components/color-picker";
import {rgbColorInterface} from "../interfaces/color.interface";


@Injectable({
  providedIn: 'root'
})
export class DataChangingService {
  constructor() {}

  changeDataBeforeFieldsUpdate(data:object){
    let color:rgbColorInterface | null
    let dataCopy = JSON.parse(JSON.stringify(data));
    if(dataCopy['width'])
      dataCopy['width'] = dataCopy['width'].replace(/\D/g, '')
    if(dataCopy['height'])
      dataCopy['height'] = dataCopy['height'].replace(/\D/g, '')
    if(dataCopy['fontSize'])
      dataCopy['fontSize'] = dataCopy['fontSize'].replace(/\D/g, '')

    color = hexToRgb(dataCopy['color'])
    if(color)
      dataCopy['color'] = new Color(color.r, color.g, color.b, 1)

    color = hexToRgb(dataCopy['borderColor'])
    if(color)
      dataCopy['borderColor'] = new Color(color.r, color.g, color.b, 1)

    return dataCopy
  }

  changeFieldsDataBeforeSave(data: object){
    let dataCopy = JSON.parse(JSON.stringify(data));
    console.log(dataCopy)
    if(dataCopy.width)
      dataCopy.width = dataCopy.width + 'px'
    if(dataCopy.height)
      dataCopy.height = dataCopy.height + 'px'
    if(dataCopy.fontSize)
      dataCopy.fontSize = dataCopy.fontSize + 'px'
    if(dataCopy.color.hex)
      dataCopy.color = '#' + dataCopy.color.hex
    if(dataCopy.borderColor.hex)
      dataCopy.borderColor = '#' + dataCopy.borderColor.hex
    if(dataCopy.background?.hex)
      dataCopy.background = '#' + dataCopy.background.hex
    return dataCopy
  }
}
