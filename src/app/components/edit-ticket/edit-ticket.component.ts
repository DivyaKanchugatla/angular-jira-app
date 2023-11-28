import { Component,OnInit } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface Ticket {
  assignedTo: string;
  createdBy: string;
  createdDate: string;
  projectName: string;
  ticketType: string;
  ticketId: number; 
  summary: string;
  status: string; 
}
export interface Project {
  projectId: number;
  projectName: string;
  shortName: string;
  createdDate: string;
}

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {
  ticketsArray:Ticket[]=[];
  id!:number;
  selectedTicket!:Ticket;
  status:string[]=['To Do','In Progress','Done'];
  projectList:Project[]=[];
 
constructor(private ticketsService:TicketsService, private route: ActivatedRoute,private router:Router,private http:HttpClient){}

ngOnInit() {
  this.ticketsService.projectTicketsArray$.subscribe((tickets) => {
    this.ticketsArray = tickets;
  });
  
this.route.queryParamMap.subscribe(params => {
  this.id = Number(params.get('id')) || 0;
    const filteredTickets = this.ticketsArray.filter(m => m.ticketId == this.id);
    if (filteredTickets.length > 0) {
      this.selectedTicket = filteredTickets[0];
    } else {
      console.error("Ticket not found with id: ", this.id);
    }
  });

const storedProjectList = localStorage.getItem('projectList');
  if (storedProjectList) {
    this.projectList = JSON.parse(storedProjectList);
  } else {
    this.getAllProjects();
  }
}

getAllProjects() {
  this.http.get<Project[]>("http://localhost:3000/projectList")
    .subscribe((res: Project[]) => {
      this.projectList = res;
    });
}

saveTicket() {
    const newTicketArray = this.ticketsArray.map((ticket)=>{
      return ticket.ticketId === this.selectedTicket.ticketId ? this.selectedTicket : ticket
    })
      localStorage.setItem('allTicketsArray', JSON.stringify(newTicketArray));
      this.router.navigate(['/board']);
}
}
