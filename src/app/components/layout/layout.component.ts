import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TicketsService } from 'src/app/services/tickets.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  searchInput = '';
  ticketsArray: any[] = [];
  projectList: any[] = [];
  status: string[] = ['To Do', 'In Progress', 'Done'];
  userList: any[] = [];

  ticketObj: any = {
    projectName: '',
    ticketType: '',
    createdDate: new Date(),
    summary: '',
    status: '',
    assignedTo: 0,
    createdBy: 0,
  };
  constructor(
    config: NgbModalConfig,
    private http: HttpClient,
    private ticketsService: TicketsService,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    const loginData = localStorage.getItem('jiraLoginDetails');
    if (loginData != null) {
      const parseData = JSON.parse(loginData);
      this.ticketObj.createdBy = parseData.fullName;
    }
  }

  open(content: any) {
    this.modalService.open(content);
  }

  ngOnInit() {
    this.ticketsService.projectTicketsArray$.subscribe((tickets) => {
      this.ticketsArray = tickets;
      
    });
    const storedProjectList = localStorage.getItem('projectList');
    if (storedProjectList) {
      this.projectList = JSON.parse(storedProjectList);
    } else {
      this.getAllProjects();
    }
    this.getAllUsers();
  }

  filterTickets() {
    console.log(this.searchInput);
    this.ticketsService.filterTickets(this.searchInput);
  }
  

  
  getAllProjects() {
    this.http.get('http://localhost:3000/projectList').subscribe((res: any) => {
      this.projectList = res;
    });
  }

  getAllUsers() {
    this.http.get('http://localhost:3000/users').subscribe((res: any) => {
      this.userList = res;
    });
  }

  setProject(obj: any) {
    this.ticketsService.projectBasedTickets(obj);
  }

  onTicketCreate() {
    const newTicketObj = {
      ...this.ticketObj,
      ticketId: Math.floor(Math.random() * 1000000) + 1,
    };
    this.ticketsService.handleTickets(newTicketObj);
  }
}