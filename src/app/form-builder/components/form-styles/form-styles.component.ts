import {ChangeDetectionStrategy, Component, OnInit, OnDestroy} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {select, Store} from "@ngrx/store";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ThemePalette} from "@angular/material/core";
import {Observable, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {SnackBar} from "../../../shared/directives/snack-bar";
import {IFormStyles} from "../../../interfaces/form-data.interface";
import {AppStateInterface} from "../../../interfaces/app-state.interface";
import {formStylesSelector} from "../../../store/selectors";
import {updateFormStyles} from "../../../store/actions";
import {DataChangingService} from "../../services/data-changing.service";

@Component({
  selector: 'app-form-styles',
  templateUrl: './form-styles.component.html',
  styleUrls: ['./form-styles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormStylesComponent extends SnackBar implements OnInit, OnDestroy {
  public colorPick: ThemePalette = 'primary';

  myForm: FormGroup

  isDestroyed$: Subject<boolean> = new Subject<boolean>();

  panelOpenState:boolean = false;

  formStylesSelect$: Observable<any>
  formStylesSelect: IFormStyles

  constructor(
    snackBar: MatSnackBar,
    private store: Store<AppStateInterface>,
    private formBuilder: FormBuilder,
    private dataChangingService: DataChangingService
  ) {
    super(snackBar)
    this.myForm = this.formBuilder.group({
      label: '',
      color: '',
      background: '',
      borderStyle: '',
      borderColor: ''
    })
    this.store.pipe(select(formStylesSelector))
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(data => {
      this.formStylesSelect = data
      let preparedData = this.dataChangingService.changeDataBeforeFieldsUpdate(data)
      this.myForm.patchValue(preparedData)
    })
  }

  ngOnInit(): void {
  }

  submitFormStyles():void{
    let preparedData = this.dataChangingService.changeFieldsDataBeforeSave(this.myForm.value)
    this.store.dispatch(updateFormStyles({formStyles: preparedData}))
  }

  ngOnDestroy() {
    this.isDestroyed$.next(true)
    this.isDestroyed$.unsubscribe()
  }
}
