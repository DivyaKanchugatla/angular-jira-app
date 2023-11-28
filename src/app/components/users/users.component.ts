import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface LoginUser{
  userId: number;
  emailId: string;
  fullName: string;
  password: string;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userList:LoginUser[]=[]
  fullName = "";
  password = "";
  emailId = "";
  userId = "";

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
    this.http.get<LoginUser[]>("http://localhost:3000/loginCreds").subscribe((res: LoginUser[]) => {
      this.userList = res;
      localStorage.setItem('userList', JSON.stringify(this.userList));
    });
  }

  onSave(){
    const newObj: LoginUser = {
      "userId": this.userList.length + 1,
      "fullName": this.fullName,
      "emailId":this.emailId,
      "password": this.password
    }
    this.userList.push(newObj);
    localStorage.setItem('userList', JSON.stringify(this.userList));
  }

}
