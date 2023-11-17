import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj: any = {
    "userId": 0,
    "emailId": "",
    "fullName": "",
    "password": ""
  }

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const jsonServerUrl = 'http://localhost:3000/loginCreds'; 

    this.http.get(`${jsonServerUrl}?emailId=${this.loginObj.emailId}&password=${this.loginObj.password}`)
      .subscribe((res: any) => {
        if (res.length > 0) {
          const userData = res[0];
          localStorage.setItem('jiraLoginDetails', JSON.stringify(userData));
          this.router.navigateByUrl('/board');
        } else {
          alert('Invalid credentials');
        }
      });
  }
}
