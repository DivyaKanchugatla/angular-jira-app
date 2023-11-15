import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private allTicketsArray: any[] = [];
  private projectTicketsArraySource = new BehaviorSubject<any[]>([]);
  projectTicketsArray$: Observable<any[]> = this.projectTicketsArraySource.asObservable();

  constructor() {
    const storedData = localStorage.getItem('allTicketsArray');
    this.allTicketsArray = storedData ? JSON.parse(storedData) : [];
    this.projectTicketsArraySource.next([...this.allTicketsArray]);
  }

  handleTickets(ticket: any) {
    this.allTicketsArray.push(ticket);
    this.updateLocalStorage();
    this.projectBasedTickets(); 
  }

  projectBasedTickets(project?: any) {
    if (project) {
      this.projectTicketsArraySource.next(this.allTicketsArray.filter((each) => each.projectName === project.projectName));
    } else {
      this.projectTicketsArraySource.next([...this.allTicketsArray]);
    }
  }

  private updateLocalStorage() {
    localStorage.setItem('allTicketsArray', JSON.stringify(this.allTicketsArray));
  }
}