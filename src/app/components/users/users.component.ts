import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  userList:any[]=[]
  fullName:string="";
  password:any="";
  emailId:any="";
  userId:any="";

constructor(private http: HttpClient) {}

  ngOnInit() {
    const storedProjectList = localStorage.getItem('userList');
    if (storedProjectList) {
      this.userList = JSON.parse(storedProjectList);
    } else {
      this.getAllUsers();
    }
  }

  getAllUsers() {
    this.http.get("http://localhost:3000/userList").subscribe((res: any) => {
      this.userList = res;
      localStorage.setItem('userList', JSON.stringify(this.userList));
    });
  }

  onSave(){
    const newObj = {
      "userId": this.userList.length + 1,
      "fullName": this.fullName,
      "emailId":this.emailId,
      "password": this.password
    }
    this.userList.push(newObj);
    localStorage.setItem('userList', JSON.stringify(this.userList));
    console.log('Updated user List:', this.userList)  
  }

}
