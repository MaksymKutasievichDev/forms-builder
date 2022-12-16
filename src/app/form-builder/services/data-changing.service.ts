import {Injectable} from "@angular/core";
import {hexToRgb} from "../../_helpers/helpers";
import {Color} from "@angular-material-components/color-picker";


@Injectable({
  providedIn: 'root'
})
export class DataChangingService {
  constructor() {}

  changeDataBeforeFieldsUpdate(data:any){
    let color:any
    if(data['width'])
      data['width'] = data['width'].replace(/\D/g, '')
    if(data['height'])
      data['height'] = data['height'].replace(/\D/g, '')
    if(data['fontSize'])
      data['fontSize'] = data['fontSize'].replace(/\D/g, '')

    color = hexToRgb(data['color'])
    if(color)
      data['color'] = new Color(color.r, color.g, color.b, 1)

    color = hexToRgb(data['borderColor'])
    if(color)
      data['borderColor'] = new Color(color.r, color.g, color.b, 1)

    return data
  }

  changeFieldsDataBeforeSave(data: any){
    if(data.width)
      data.width = data.width + 'px'
    if(data.height)
      data.height = data.height + 'px'
    if(data.fontSize)
      data.fontSize = data.fontSize + 'px'
    if(data.color.hex)
      data.color = '#' + data.color.hex
    if(data.borderColor.hex)
      data.borderColor = '#' + data.borderColor.hex

    return data
  }
}
