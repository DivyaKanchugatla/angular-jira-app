import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BoardComponent } from './components/board/board.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './components/layout/layout.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { UsersComponent } from './components/users/users.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoardComponent,
    LayoutComponent,
    ProjectsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,  
    MatCardModule,
    StoreModule.forRoot({}, {}),
    NgbModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
