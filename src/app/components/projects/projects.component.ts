import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projectList: any[] = [];
  shortName:string = "";
  projectName:string = "";
 
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
    this.http.get("http://localhost:3000/projectList").subscribe((res: any) => {
      this.projectList = res;
      localStorage.setItem('projectList', JSON.stringify(this.projectList));
    });
  }

  onSave(){
    const newObj = {
      "projectId": this.projectList.length + 1,
      "shortName": this.shortName,
      "projectName":this.projectName,
      "createdDate": new Date()
    }
    this.projectList.push(newObj);
    localStorage.setItem('projectList', JSON.stringify(this.projectList));
  }
}
