import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  projectList:any[]=[];
  userList:any[]=[];
  status:string[]=['To Do','In Progress','Done'];

  ticketObj: any = {
    "projectName":"",
    "createdDate": new Date(),
    "summary":"",
    "status":"",
    "assignedTo":0,
    "createdBy":0,
  }
  constructor(config: NgbModalConfig, private modalService: NgbModal,private http:HttpClient,private ticketsService:TicketsService) {
		config.backdrop = 'static';
		config.keyboard = false;
    const loginData = localStorage.getItem('jiraLoginDetails');
    if(loginData != null) {
      const parseData = JSON.parse(loginData);
      console.log(parseData)
      this.ticketObj.createdBy = parseData.fullName;
      console.log(this.ticketObj.createdBy)
    }
	}

	open(content:any) {
		this.modalService.open(content);
	}

  ngOnInit(){
    const storedProjectList = localStorage.getItem('projectList');
    if (storedProjectList) {
      this.projectList = JSON.parse(storedProjectList);
    } else {
      this.getAllProjects();
    }
      this.getAllUsers();
  }

  getAllProjects(){
    this.http.get("http://localhost:3000/projectList")
      .subscribe((res: any) => {
        console.log("res",res)
        this.projectList=res
        }
      );
  }
  getAllUsers(){
    this.http.get("http://localhost:3000/users")
    .subscribe((res: any) => {
      console.log("res",res)
      this.userList=res
      }
    );
  }

   setProject(obj: any) {
    this.ticketsService.projectBasedTickets(obj);
   }
 
   onTicketCreate() {
    const newTicketObj = { ...this.ticketObj };
    newTicketObj.ticketId++;
    this.ticketsService.handleTickets(newTicketObj);
}
}
