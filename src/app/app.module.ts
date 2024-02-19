import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BoardComponent } from './components/board/board.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './components/layout/layout.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditTicketComponent } from './components/edit-ticket/edit-ticket.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { SprintReportsComponent } from './components/sprint-reports/sprint-reports.component';
import { MaterialModule } from './shared/modules/Material.Module';
import { EffectsModule } from '@ngrx/effects';
import { loginEffects } from './shared/store/login/login.Effects';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './shared/store/login/login.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoardComponent,
    LayoutComponent,
    EditTicketComponent,
    SprintReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    StoreModule.forRoot({login:loginReducer}),
    MaterialModule,
    EffectsModule.forRoot([loginEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [HttpClient,loginEffects],
  bootstrap: [AppComponent]
})
export class AppModule { }