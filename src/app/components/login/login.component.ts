import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginUser } from 'src/app/models/loginUser.model';
import { loadlogin } from 'src/app/shared/store/login/login.actions';
import { getLoginCreds} from 'src/app/shared/store/login/login.selector';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj: LoginUser = {
    "userId": 0,
    "emailId": "",
    "fullName": "",
    "password": ""
  }
  loginSubscription!: Subscription;
  
  constructor(private store: Store,private router:Router) { }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
  
  onLogin() {
    this.store.dispatch(loadlogin({loginObj:this.loginObj}));
    this.store.select(getLoginCreds).subscribe((data) => {
      localStorage.setItem('jiraLoginDetails', JSON.stringify(data));
      this.router.navigateByUrl('/board');
    });  
  }
}
