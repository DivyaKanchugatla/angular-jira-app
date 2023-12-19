import { Component, OnInit } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket.model';
import { Project } from 'src/app/models/project.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  ticketToDelete!: Ticket;
  setModal: string = ''
  assignees: string[] = []

  constructor(private ticketService: TicketsService, public router: Router, private modalService: NgbModal,) {
  }

  ngOnInit() {
    this.ticketService.projectTicketsArray$.subscribe((tickets) => {
      this.ticketsArray = tickets;
      this.ticketsArray.map(((each) => {
        return this.assignees.push(each.assignedTo)
      }))
      this.assignees = [...new Set(this.assignees)];
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

  filterByAssignee(assignee: string) {
    this.ticketService.filterTicketsByAssignee(assignee)
  }

  open(content: string) {
    this.modalService.open(content);
  }

  setEditItem(ticket: Ticket) {
    this.setModal = "editModal"
    this.ticketToDelete = ticket;
  }

  setdeleteItem(ticket: Ticket) {
    this.setModal = "deleteModal"
    this.ticketToDelete = ticket;
  }

  confirmAction() {
    if (this.setModal === "editModal") {
      this.editTicket();
    } else {
      this.deleteTicket();
    }
  }

  deleteTicket() {
    if (this.todo.includes(this.ticketToDelete)) {
      this.todo = this.todo.filter((item) => item !== this.ticketToDelete);
    } else if (this.progress.includes(this.ticketToDelete)) {
      this.progress = this.progress.filter((item) => item !== this.ticketToDelete);
    } else if (this.done.includes(this.ticketToDelete)) {
      this.done = this.done.filter((item) => item !== this.ticketToDelete);
    }
    this.ticketsArray = this.ticketsArray.filter((item) => item !== this.ticketToDelete);
    this.ticketService.updateLocalStorage(this.ticketsArray);
    window.location.reload();
  }

  editTicket() {
    this.router.navigate(['/ticket'], { queryParams: { id: this.ticketToDelete.ticketId } });
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

}
