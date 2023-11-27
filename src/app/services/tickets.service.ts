import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private allTicketsArray: any[] = [];
  searchInput:string="";
  private projectTicketsArraySource = new BehaviorSubject<any[]>([]);
  projectTicketsArray$: Observable<any[]> = this.projectTicketsArraySource.asObservable();
 
  constructor() {
    const storedData = localStorage.getItem('allTicketsArray');
    this.allTicketsArray = storedData ? JSON.parse(storedData) : [];
    this.projectTicketsArraySource.next([...this.allTicketsArray]);
  }

  handleTickets(ticket: any) {
    this.allTicketsArray.push(ticket);
    this.updateLocalStorage(this.allTicketsArray);
    this.projectBasedTickets(); 
  }

  projectBasedTickets(project?: any) {
    if (project) {
      this.projectTicketsArraySource.next(this.allTicketsArray.filter((each) => each.projectName === project.projectName));
    } else {
      this.projectTicketsArraySource.next([...this.allTicketsArray]);
    }
  }
  
  updateLocalStorage(tickets:any) {
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
  
   filterTicketsBySearch(): any[] {
    return this.allTicketsArray.filter((ticket) =>
      ticket.projectName.toLowerCase().includes(this.searchInput.toLowerCase())
    );
  }
  
}