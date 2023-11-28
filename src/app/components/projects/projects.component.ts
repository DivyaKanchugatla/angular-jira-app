import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';

export interface Project {
  projectId: number;
  projectName: string;
  shortName: string;
  createdDate: string;
}
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectList: Project[] = [];
  shortName = "";
  projectName = "";
 
  constructor(private http: HttpClient) {}

  ngOnInit() {
    const storedProjectList = localStorage.getItem('projectList');
    if (storedProjectList) {
      this.projectList = JSON.parse(storedProjectList);
    } else {
      this.getAllProjects();
    }
  }

  getAllProjects(){
    this.http.get<Project[]>("http://localhost:3000/projectList").subscribe((res: Project[]) => {
      this.projectList = res;
      localStorage.setItem('projectList', JSON.stringify(this.projectList));
    });
  }

  onSave(){
    const newObj:Project = {
      "projectId": this.projectList.length + 1,
      "shortName": this.shortName,
      "projectName":this.projectName,
      "createdDate": "new Date()"
    }
    this.projectList.push(newObj);
    localStorage.setItem('projectList', JSON.stringify(this.projectList));
  }
}
