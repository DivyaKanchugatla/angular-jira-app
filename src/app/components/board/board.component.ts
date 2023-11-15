// board.ts
import { Component,OnInit } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';
import { NgZone } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
export class Column {
  constructor(public name: string, public tasks: any[]) {}
}
export class Board {
  constructor(public name: string, public columns: Column[]) {}
}
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
  todos=new Array;
  inprogresses=new Array;
  dones=new Array;
currentItem:any;
  constructor(private ticketService: TicketsService,private zone: NgZone, private cdr: ChangeDetectorRef) { 
  }
  // board: Board = new Board('Test Board', [
  //   new Column('Ideas', [
  //     "Some random idea",
  //     "This is another random idea",
  //     "build an awesome application"
  //   ]),
  //   new Column('Research', [
  //     "Lorem ipsum",
  //     "foo",
  //     "This was in the 'Research' column"
  //   ]),
  //   new Column('Todo', [
  //     'Get to work',
  //     'Pick up groceries',
  //     'Go home',
  //     'Fall asleep'
  //   ]),
  //   new Column('Done', [
  //     'Get up',
  //     'Brush teeth',
  //     'Take a shower',
  //     'Check e-mail',
  //     'Walk dog'
  //   ])
  // ]);

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
//  onDragStart(event:any,item:any){
//   console.log('onDragStart')
//   this.currentItem = item;
//   event.dataTransfer?.setData('text/plain', '');
//   console.log("currrentItem",this.currentItem)
//  }
//  onDrop(event:any,status:string){
//   console.log('onDrop')
//   event.preventDefault();
//   const record = this.ticketsArray.find(m=>m.ticketId==this.currentItem.ticketId);
//   console.log("record",record)
//   if(record!=undefined){
//     record.status = status;
//   }
//   this.currentItem=null;
//  }
//  onDragOver(event:any){
//   console.log('onDragOver')
//   event.preventDefault();
//  }
// drop(event: CdkDragDrop<string[]>) {
//   console.log('Drop event:', event);
//   console.log('Previous Container Data:', event.previousContainer.data);
//   console.log('Current Container Data:', event.container.data);
//   this.zone.run(() => {
//     this.cdr.detectChanges(); 
//   console.log('Drop event:', event);
//   if (event.previousContainer === event.container) {
//     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
//   } else {
//     transferArrayItem(
//       event.previousContainer.data,
//       event.container.data,
//       event.previousIndex,
//       event.currentIndex,
//     );
    
//     }})
//     console.log('Done processing drop event.');}






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
