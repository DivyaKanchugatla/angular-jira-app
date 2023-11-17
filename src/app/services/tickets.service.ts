import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private allTicketsArray: any[] = [];
  private projectTicketsArraySource = new BehaviorSubject<any[]>([]);
  projectTicketsArray$: Observable<any[]> = this.projectTicketsArraySource.asObservable();
 
  selectedItem:any;

  constructor(private modalService: NgbModal) {
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
  open(content:any){
    this.modalService.open(content);
   
  }

  updateLocalStorage(tickets:any) {
    localStorage.setItem('allTicketsArray', JSON.stringify(tickets));
  }
 private selectedItemSource = new BehaviorSubject<any>(null);
  selectedItem$: Observable<any> = this.selectedItemSource.asObservable();

  // ... (existing code)

  editTicket(ticket: any) {
    this.selectedItem = { ...ticket };
    this.selectedItemSource.next(this.selectedItem);
  }
}