import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';
import { Project } from '../models/project.model';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../models/loginUser.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  jsonServerUrl = 'http://localhost:3000/loginCreds';
  allTicketsArray: Ticket[] = [];
  searchInput = "";
  projectTicketsArraySource = new BehaviorSubject<Ticket[]>([]);
  projectTicketsArray$: Observable<Ticket[]> = this.projectTicketsArraySource.asObservable();
  loginObj: LoginUser = {
    "userId": 0,
    "emailId": "",
    "fullName": "",
    "password": ""
  }
  constructor(private http: HttpClient, private router: Router) {
    const storedData = localStorage.getItem('allTicketsArray');
    this.allTicketsArray = storedData ? JSON.parse(storedData) : [];
    this.projectTicketsArraySource.next([...this.allTicketsArray]);
  }

  handleTickets(ticket: Ticket) {
    this.allTicketsArray.push(ticket);
    this.updateLocalStorage(this.allTicketsArray);
    this.projectBasedTickets();
  }

  projectBasedTickets(project?: Project) {
    if (project) {
      this.projectTicketsArraySource.next(this.allTicketsArray.filter((each) => each.projectName === project.projectName));
    } else {
      this.projectTicketsArraySource.next([...this.allTicketsArray]);
    }
  }

  updateLocalStorage(tickets: Ticket[]) {
    localStorage.setItem('allTicketsArray', JSON.stringify(tickets));
  }
  filterTickets(search: string) {
    this.searchInput = search;
    if (this.searchInput.trim() === '') {
      this.projectTicketsArraySource.next([...this.allTicketsArray]);
    } else {
      const filteredTickets = this.filterTicketsBySearch();
      this.projectTicketsArraySource.next(filteredTickets);
    }
  }

  filterTicketsBySearch(): Ticket[] {
    return this.allTicketsArray.filter((ticket) =>
      ticket.projectName.toLowerCase().includes(this.searchInput.toLowerCase())
    );
  }

  filterTicketsByAssignee(assignee: string) {
    if (assignee === "") {
      this.projectTicketsArraySource.next([...this.allTicketsArray]);
    }
    else {
      const filteredTickets = this.allTicketsArray.filter((ticket) =>
        ticket.assignedTo === assignee)
      this.projectTicketsArraySource.next(filteredTickets);
    }
  }


  // getLoginCreds(): void {
  //   return this.http.get<LoginUser[]>(`${this.jsonServerUrl}?emailId=${this.loginObj.emailId}&password=${this.loginObj.password}`)
  //     .pipe(
  //       map((res: LoginUser[]) => {
  //         if (res.length > 0) {
  //           const userData = res[0];
  //           console.log("userData", userData)
  //           localStorage.setItem('jiraLoginDetails', JSON.stringify(userData));
  //           this.router.navigateByUrl('/board');
  //         } else {
  //           alert('Invalid credentials');
  //         }
  //         return res
  //       })
  //     );
  // }
  getLoginCreds(): Observable<LoginUser> {
    return this.http.get<LoginUser>(`${this.jsonServerUrl}?emailId=${this.loginObj.emailId}&password=${this.loginObj.password}`);
  }

}