import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatExpansionModule } from "@angular/material/expansion";
import { CdkAccordionModule } from "@angular/cdk/accordion";
import { MatSelectModule } from "@angular/material/select";
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule } from "@angular-material-components/color-picker";
import { FormBuilderComponent } from "./form-builder.component";
import { BlocksComponent } from "./components/blocks/blocks.component";
import { TemplateComponent } from "./components/template/template.component";
import { FormStylesComponent } from "./components/form-styles/form-styles.component";
import { FieldStylesComponent } from "./components/field-styles/field-styles.component";
import { FileUploadComponent } from "./components/file-upload/file-upload.component";
import { FormBuilderRoutingModule } from "./form-builder-routing.module";
import {SharedModule} from "../shared/shared.module";

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
    DragDropModule,
    MatExpansionModule,
    MatSelectModule,
    NgxMatColorPickerModule,
    FormBuilderRoutingModule,
    SharedModule
  ],
  providers: [
    {provide: MAT_COLOR_FORMATS, useValue: {display: {colorInput: 'hex'}}}
  ],
  bootstrap: [FormBuilderComponent]
})
export class FormBuilderModule { }
