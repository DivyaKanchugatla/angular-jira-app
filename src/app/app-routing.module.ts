import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { BoardComponent } from './components/board/board.component';
import { UsersComponent } from './components/users/users.component';
import { ProjectsComponent } from './components/projects/projects.component';
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
    path: 'sprintReports',
    component: SprintReportsComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'board',
        component: BoardComponent
      },
      {
        path: 'ticket',
        component: EditTicketComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
