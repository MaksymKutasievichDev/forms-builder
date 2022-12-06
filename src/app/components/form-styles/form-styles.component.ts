import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import {SnackBar} from "../../classes/snackBar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {IFormStyles} from "../../services/IFieldsStyles";
import {AppStateInterface} from "../../services/appState.interface";
import {select, Store} from "@ngrx/store";
import {formStylesSelector} from "../../store/selectors";
import {updateFormStyles} from "../../store/actions";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-form-styles',
  templateUrl: './form-styles.component.html',
  styleUrls: ['./form-styles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormStylesComponent extends SnackBar implements OnInit {

  panelOpenState:boolean = false;
  label = new FormControl('')
  color = new FormControl('')
  background = new FormControl('')
  borderStyle = new FormControl('')
  borderColor = new FormControl('')

  formStylesSelect$: Observable<any>
  formStylesSelect: IFormStyles

  constructor(snackBar: MatSnackBar, private store: Store<AppStateInterface>) {
    super(snackBar)
    this.formStylesSelect$ = this.store.pipe(select(formStylesSelector))
  }

  ngOnInit(): void {
    this.formStylesSelect$
      .subscribe(
      data => {
        this.formStylesSelect = data
        this.label.setValue(data.label ? data.label : '')
        this.color.setValue(data.color ? data.color : '')
        this.background.setValue(data.background ? data.background : '')
        this.borderStyle.setValue(data.borderStyle ? data.borderStyle : '')
        this.borderColor.setValue(data.borderColor ? data.borderColor : '')
      }
    )
  }
  submitFormStyles():void{
    this.store.dispatch(updateFormStyles({formStyles: {
        label: this.label.value ? this.label.value : '',
        color: this.color.value ? this.color.value : '',
        background: this.background.value ? this.background.value : '',
        borderStyle: this.borderStyle.value ? this.borderStyle.value : '',
        borderColor: this.borderColor.value ? this.borderColor.value : ''
    }}))
  }
}
