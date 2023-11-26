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
  todo: any[] = [];
  progress: any[] = [];
  done: any[] = [];

  projectList: any[] = [];
  ticketsArray: any[] = [];
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
    const storedProjectList = localStorage.getItem('projectList');
    if (storedProjectList) {
      this.projectList = JSON.parse(storedProjectList);
    } else {
      this.getAllProjects();
    }
    this.getAllUsers();
  }

  filterTickets() {
    // console.log(this.searchInput);
    this.filterBySearchInput(this.searchInput);
  }

  filterBySearchInput(value: any) {
    if (value) {
      const filteredArray = this.ticketsArray.filter((item) =>
        item.projectName.toLowerCase().includes(value.toLowerCase())
      );

      this.done = filteredArray.filter((m) => m.status === 'Done');
      this.todo = filteredArray.filter((m) => m.status === 'To Do');
      this.progress = filteredArray.filter((m) => m.status === 'In Progress');

      this.ticketsArray = filteredArray;
    } else {
      this.ticketsService.projectTicketsArray$.subscribe((tickets) => {
        this.ticketsArray = tickets;
      });
      this.done = this.ticketsArray.filter((m) => m.status === 'Done');
      this.todo = this.ticketsArray.filter((m) => m.status === 'To Do');
      this.progress = this.ticketsArray.filter(
        (m) => m.status === 'In Progress'
      );
    }
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