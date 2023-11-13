// ticket.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  allTicketsArray: any[] = [];
  private projectTicketsArraySource = new BehaviorSubject<any[]>([]);
  projectTicketsArray$: Observable<any[]> = this.projectTicketsArraySource.asObservable();

  constructor() {}

  handleTickets(ticket: any) {
    this.allTicketsArray.push(ticket);
    this.projectBasedTickets(); 
  }

  projectBasedTickets(project?: any) {
    if (project) {
      this.projectTicketsArraySource.next(this.allTicketsArray.filter((each) => each.projectName === project.projectName));
    } else {
      this.projectTicketsArraySource.next([...this.allTicketsArray]);
    }
  }
}
