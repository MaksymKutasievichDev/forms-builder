import {MatSnackBar} from "@angular/material/snack-bar";
import {Directive} from "@angular/core";

@Directive({
  selector: '[snack-bar]'
})
export abstract class SnackBar{
  protected constructor(private snackBar: MatSnackBar) {
  }

  successShow(msg:string){
    this.snackBar.open(msg, 'close',{
      panelClass: 'success',
      duration: 4000
    })
  }
  errorShow(msg:string){
    this.snackBar.open(msg, 'close',{
      panelClass: 'error',
      duration: 4000
    })
  }
  infoShow(msg:string){
    this.snackBar.open(msg,'close',{
      panelClass: 'info',
      duration: 4000
    })
  }
}
