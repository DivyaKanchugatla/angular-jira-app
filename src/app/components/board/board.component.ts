import { Component, OnInit } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket.model';
import { Project } from 'src/app/models/project.model';
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
  searchInput = "";
  todo: Ticket[] = []
  progress: Ticket[] = [];
  done: Ticket[] = [];
  projectList: Project[] = [];
  ticketsArray: Ticket[] = [];
  status: string[] = ['To Do', 'In Progress', 'Done'];

  constructor(private ticketService: TicketsService, public router: Router) {
  }

  ngOnInit() {
    this.ticketService.projectTicketsArray$.subscribe((tickets) => {
      this.ticketsArray = tickets;
      this.done = this.ticketsArray.filter((m) => m.status === 'Done');
      this.todo = this.ticketsArray.filter((m) => m.status === 'To Do');
      this.progress = this.ticketsArray.filter((m) => m.status === 'In Progress');
    });
  }

  getTasksByStatus(status: string): Ticket[] {
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

  deleteTicket(ticket: Ticket) {
    if (this.todo.includes(ticket)) {
      this.todo = this.todo.filter((item) => item !== ticket);
    } else if (this.progress.includes(ticket)) {
      this.progress = this.progress.filter((item) => item !== ticket);
    } else if (this.done.includes(ticket)) {
      this.done = this.done.filter((item) => item !== ticket);
    }
    this.ticketsArray = this.ticketsArray.filter((item) => item !== ticket);  
    this.ticketService.updateLocalStorage(this.ticketsArray);
    window.location.reload();
  }
  

  drop(event: CdkDragDrop<Ticket[]>) {
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
  editTicket(ticket: Ticket) {
    this.router.navigate(['/ticket'], { queryParams: { id: ticket.ticketId } });
  }
}
