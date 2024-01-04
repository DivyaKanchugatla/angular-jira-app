import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  allTicketsArray: Ticket[] = [];
  searchInput = "";
  projectTicketsArraySource = new BehaviorSubject<Ticket[]>([]);
  projectTicketsArray$: Observable<Ticket[]> = this.projectTicketsArraySource.asObservable();

  constructor() {
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

}