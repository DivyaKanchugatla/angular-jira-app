import { Component,OnInit } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';

import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
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
  Progress:any[] = [];
  done:any[] = [];

  ticketsArray: any[] = [];
  status:string[]=['To Do','In Progress','Done'];
  
  doneList:any[]=[];
  todoList:any[]=[];
  inProgressList:any[]=[];
 

  constructor(private ticketService: TicketsService) { 
  }
 
  ngOnInit() {
    this.ticketService.projectTicketsArray$.subscribe((tickets) => {
      this.ticketsArray = tickets;

      this.doneList = tickets.filter(m=>m.status==="Done")
      console.log("doneList",this.doneList)
      this.done = this.doneList

      this.todoList = tickets.filter(m=>m.status==="To Do")
      console.log("todoList",this.todoList)
      this.todo=this.todoList

      this.inProgressList = tickets.filter(m=>m.status === "In Progress")
      console.log("inProgressList",this.inProgressList)
      this.Progress=this.inProgressList
      console.log("ngOnInit", this.ticketsArray);
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
