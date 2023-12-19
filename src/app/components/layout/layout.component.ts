import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TicketsService } from 'src/app/services/tickets.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ticket } from 'src/app/models/ticket.model';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  searchInput = '';
  ticketsArray: Ticket[] = [];
  projectList: Project[] = [];
  status: string[] = ['To Do', 'In Progress', 'Done'];
  userList: User[] = [];

  ticketObj: Ticket = {
    projectName: '',
    ticketType: '',
    createdDate: "new Date()",
    summary: '',
    status: '',
    assignedTo: "",
    createdBy: "",
    ticketId: 0
  };

  constructor(
    config: NgbModalConfig,
    private http: HttpClient,
    private ticketsService: TicketsService,
    private modalService: NgbModal,
    private translateService: TranslateService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    const loginData = localStorage.getItem('jiraLoginDetails');
    if (loginData != null) {
      const parseData = JSON.parse(loginData);
      this.ticketObj.createdBy = parseData.fullName;
    }
  }

  open(content: string) {
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
    // Localization code
    this.lang = localStorage.getItem('lang') || 'en';
  }

  filterTickets() {
    this.ticketsService.filterTickets(this.searchInput);
  }

  getAllProjects() {
    this.http.get<Project[]>("http://localhost:3000/projectList")
      .subscribe((res: Project[]) => {
        this.projectList = res;
      });
  }

  getAllUsers() {
    this.http.get<User[]>('http://localhost:3000/users').subscribe((res: User[]) => {
      this.userList = res;
    });
  }

  setProject(obj: Project) {
    this.ticketsService.projectBasedTickets(obj);
  }

  onTicketCreate() {
    const newTicketObj = {
      ...this.ticketObj,
      ticketId: Math.floor(Math.random() * 1000000) + 1,
    };
    this.ticketsService.handleTickets(newTicketObj);
  }

  // Localization
  lang = '';
  changeLang(event: Event): void {
    console.log("lang type", event);
    const selectedLang = (event.target as HTMLSelectElement).value;
    localStorage.setItem('lang', selectedLang);
    // page Refresh
    this.translateService.use(selectedLang);
  }

}