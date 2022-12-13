import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CdkAccordionModule } from "@angular/cdk/accordion";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule } from "@angular-material-components/color-picker";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormBuilderComponent } from "./components/form-builder/form-builder.component";
import { BlocksComponent } from "./components/blocks/blocks.component";
import { TemplateComponent } from "./components/template/template.component";
import { FormStylesComponent } from "./components/form-styles/form-styles.component";
import { FieldStylesComponent } from "./components/field-styles/field-styles.component";
import { FileUploadComponent } from "./components/file-upload/file-upload.component";
import { FormBuilderRoutingModule } from "./form-builder-routing.module";

@NgModule({
  declarations: [
    FormBuilderComponent,
    BlocksComponent,
    TemplateComponent,
    FormStylesComponent,
    FieldStylesComponent,
    FileUploadComponent,
  ],
  imports: [
    CommonModule,
    CdkAccordionModule,
    MatIconModule,
    DragDropModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxMatColorPickerModule,
    MatSnackBarModule,
    MatInputModule,
    FormBuilderRoutingModule
  ],
  providers: [
    {provide: MAT_COLOR_FORMATS, useValue: {display: {colorInput: 'hex'}}}
  ],
  bootstrap: [FormBuilderComponent]
})
export class FormBuilderModule { }
