import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import { RemoveQuotationMarksPipe } from './pipes/remove-quotation-marks.pipe';
import {authInterceptorProviders} from "./_helpers/auth.interceptor";

/*Components*/
import { LoginComponent } from './components/login/login.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { RegisterComponent } from './components/register/register.component';
import { FormStylesComponent } from './components/form-styles/form-styles.component';
import { FieldStylesComponent } from './components/field-styles/field-styles.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { TemplateComponent } from './components/template/template.component';

/*Angular Materials Components*/
import { InputMaterialComponent } from './components/angularMaterials/input/input.component';
import { TextareaMaterialComponent } from './components/angularMaterials/textarea/textarea.component';
import { ButtonMaterialComponent } from './components/angularMaterials/button/button.component';
import { SelectMaterialComponent } from './components/angularMaterials/select/select.component';

/*NgRX store*/
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import {reducers} from "./store/reducers";
import {FormDataEffects} from "./services/formData.effects";
import {ReactiveFormsModule} from "@angular/forms";

/*Angular Materials Modules*/
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {CdkAccordionModule} from "@angular/cdk/accordion";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import {PasswordStrengthDirective} from "./directives/password-strength.directive";
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { LoaderComponent } from './components/loader/loader.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormBuilderComponent,
    RegisterComponent,
    BlocksComponent,
    TemplateComponent,
    InputMaterialComponent,
    TextareaMaterialComponent,
    ButtonMaterialComponent,
    SelectMaterialComponent,
    FormStylesComponent,
    FieldStylesComponent,
    RemoveQuotationMarksPipe,
    PasswordStrengthDirective,
    FileUploadComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    MatSelectModule,
    MatExpansionModule,
    CdkAccordionModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    StoreModule.forRoot({formState: reducers}),
    EffectsModule.forRoot([FormDataEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    NgxMatColorPickerModule,
    HttpClientTestingModule
  ],
  providers: [
    authInterceptorProviders,
    { provide: MAT_COLOR_FORMATS, useValue: {display: { colorInput: 'hex'}} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
