import { Component,OnInit } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';
import { Router } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  todo :any[]=[]
  progress:any[] = [];
  done:any[] = [];


  ticketsArray: any[] = [];
  status:string[]=['To Do','In Progress','Done'];
 
  constructor(private ticketService: TicketsService,  public router: Router,) { 
  }
  open(content:any){
    this.ticketService.open(content);
  }
 
  ngOnInit() {
    this.ticketService.projectTicketsArray$.subscribe((tickets) => {
      this.ticketsArray = tickets;
      this.done = this.ticketsArray.filter((m) => m.status === 'Done');
      this.todo = this.ticketsArray.filter((m) => m.status === 'To Do');
      this.progress = this.ticketsArray.filter((m) => m.status === 'In Progress');
    });
  }

getTasksByStatus(status: string): any[] {
  switch (status) {
    case 'To Do':
      return this.todo;
    case 'In Progress':
      return this.progress;
    case 'Done':
      return this.done;
    default:
      return [];
  }
}

  deleteTicket(ticket: any) {
    if (this.todo.includes(ticket)) {
      this.todo = this.todo.filter((item) => item !== ticket);
    } else if (this.progress.includes(ticket)) {
      this.progress = this.progress.filter((item) => item !== ticket);
    } else if (this.done.includes(ticket)) {
      this.done = this.done.filter((item) => item !== ticket);
    }
    this.ticketsArray = this.ticketsArray.filter((item) => item !== ticket);
    this.ticketService.updateLocalStorage(this.ticketsArray)
  }

    drop(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        this.ticketService.updateLocalStorage(this.ticketsArray)
      }
    }
    editTicket(item:any){
      this.router.navigate(['/ticket'], { queryParams: { id: item.ticketId } });
    }
}
