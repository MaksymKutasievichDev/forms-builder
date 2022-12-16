import {ChangeDetectionStrategy, Component, OnInit, OnDestroy} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {select, Store} from "@ngrx/store";
import {FormControl} from "@angular/forms";
import {ThemePalette} from "@angular/material/core";
import {Color} from "@angular-material-components/color-picker";
import {Observable, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {SnackBar} from "../../../shared/directives/snack-bar";
import {IFormStyles} from "../../../interfaces/form-data.interface";
import {AppStateInterface} from "../../../interfaces/app-state.interface";
import {formStylesSelector} from "../../../store/selectors";
import {updateFormStyles} from "../../../store/actions";
import {hexToRgb} from "../../../_helpers/helpers";

@Component({
  selector: 'app-form-styles',
  templateUrl: './form-styles.component.html',
  styleUrls: ['./form-styles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormStylesComponent extends SnackBar implements OnInit, OnDestroy {

  public colorPick: ThemePalette = 'primary';
  isDestroyed$: Subject<boolean> = new Subject<boolean>();

  panelOpenState:boolean = false;
  label = new FormControl('')
  color = new FormControl()
  background = new FormControl()
  borderStyle = new FormControl('')
  borderColor = new FormControl()

  formStylesSelect$: Observable<any>
  formStylesSelect: IFormStyles

  constructor(snackBar: MatSnackBar, private store: Store<AppStateInterface>) {
    super(snackBar)
    this.store.pipe(select(formStylesSelector))
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(data => {
      this.formStylesSelect = data
      this.label.setValue(data.label ? data.label : '')
      let currentColor:any = hexToRgb(data.color)
      this.color.setValue(currentColor ? new Color(currentColor.r, currentColor.g, currentColor.b, 1) : "")
      let currentBackground = hexToRgb(data.background)
      this.background.setValue(currentColor ? new Color(currentBackground.r, currentBackground.g, currentBackground.b, 1) : "")
      this.borderStyle.setValue(data.borderStyle ? data.borderStyle : '')
      let currentBorderColor = hexToRgb(data.borderColor)
      this.borderColor.setValue(data.borderColor ? new Color(currentBorderColor.r, currentBorderColor.g, currentBorderColor.b, 1) : '')
    })
  }
  ngOnInit(): void {
  }
  submitFormStyles():void{
    this.store.dispatch(updateFormStyles({formStyles: {
        label: this.label.value ? this.label.value : '',
        color: this.color.value ? '#' + this.color.value.hex : '',
        background: this.background.value ? '#' + this.background.value.hex : '',
        borderStyle: this.borderStyle.value ? this.borderStyle.value : '',
        borderColor: this.borderColor.value ? '#' + this.borderColor.value.hex: ''
    }}))
  }
  ngOnDestroy() {
    this.isDestroyed$.next(true)
    this.isDestroyed$.unsubscribe()
  }

}
