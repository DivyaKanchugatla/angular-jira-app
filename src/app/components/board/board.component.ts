import { Component,OnInit } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';

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
 
  constructor(private ticketService: TicketsService) { 
  }
 
  ngOnInit() {
    this.ticketService.projectTicketsArray$.subscribe((tickets) => {
      this.ticketsArray = tickets;
      this.done = tickets.filter(m=>m.status==="Done")
      this.todo = tickets.filter(m=>m.status==="To Do")
      this.progress = tickets.filter(m=>m.status === "In Progress")
      console.log("ticketsArray", this.ticketsArray);
    });
  }
//  filterTickets(status:string){
//   return this.ticketsArray.filter(m=>m.status==status);
//  }

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
      }
    }
}
