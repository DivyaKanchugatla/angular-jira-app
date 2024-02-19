import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { BoardComponent } from './components/board/board.component';
import { EditTicketComponent } from './components/edit-ticket/edit-ticket.component';
import { SprintReportsComponent } from './components/sprint-reports/sprint-reports.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: "full"
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [

      {
        path: 'board',
        component: BoardComponent
      },
      {
        path: 'ticket',
        component: EditTicketComponent
      },
    ]
  },
  {
    path: 'sprintReports',
    component: SprintReportsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
