import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { MatIconModule } from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ReactiveFormsModule} from "@angular/forms";
import { LoaderComponent } from './components/loader/loader.component';
import { FormDataEffects } from "./store/form-data.effects";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RemoveQuotationMarksPipe } from './pipes/remove-quotation-marks.pipe';
import { authInterceptorProviders } from "./_helpers/auth.interceptor";
import { reducers } from "./store/reducers";

@NgModule({
  declarations: [
    AppComponent,
    RemoveQuotationMarksPipe,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    StoreModule.forRoot({formState: reducers}),
    EffectsModule.forRoot([FormDataEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
  ],
  providers: [
    authInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
