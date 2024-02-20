import { Component, OnInit } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Ticket } from 'src/app/models/ticket.model';
import { Project } from 'src/app/models/project.model';
import { getticketsArray } from 'src/app/shared/store/layout/layout.selector';
import { Store } from '@ngrx/store';
import { editticket } from 'src/app/shared/store/layout/layout.actions';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {
  ticketsArray: Ticket[] = [];
  id!: number;
  selectedTicket!: Ticket;
  status: string[] = ['To Do', 'In Progress', 'Done'];
  projectList: Project[] = [];
  sprints = [{
    name: 'MAR A',
    Date: "3/11/24"
  }, {
    name: 'MAR B',
    Date: "3/21/24"
  }, {
    name: 'MAR C',
    Date: "3/31/24"
  }];
  constructor(private ticketsService: TicketsService, private route: ActivatedRoute, private router: Router, private http: HttpClient,private store:Store) { }

  ngOnInit() {
    // this.ticketsService.projectTicketsArray$.subscribe((tickets) => {
    //   this.ticketsArray = tickets;
    // });
    // this.store.select(getticketsArray).subscribe((data)=>{
    //   this.ticketsArray = data.ticketsArray
    // })
    const storedData = localStorage.getItem('layoutState');
    const parsedData = storedData ? JSON.parse(storedData) : [];
  console.log("storedData",parsedData)
this.ticketsArray = parsedData;

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
    const newTicketArray = this.ticketsArray.map((ticket) => {
      return ticket.ticketId === this.selectedTicket.ticketId ? this.selectedTicket : ticket
    })
    // localStorage.setItem('allTicketsArray', JSON.stringify(newTicketArray));
    localStorage.setItem("layoutState",JSON.stringify(newTicketArray))
    
    // this.store.dispatch(editticket({ticket:this.selectedTicket}))
    this.router.navigate(['/board']);
  }
}
