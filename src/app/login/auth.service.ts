import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { BotServiceService } from '../bot-service.service';
import { environment as env } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;
  token: any;

  constructor(private router: Router, private botservice: BotServiceService,private toastr: ToastrService) { }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };

    if(env.email == authData.email.toLowerCase() && env.password == authData.password){
      this.authChange.next(true);
      // this.botservice.getAuth(authData).subscribe((res) => {
      //   this.setToken(res)
      // });
      this.setToken("data")
    }else{

      this.toastr.warning("Logon failed: Invalid user name or bad password")

    }
  }

  setToken(data) {
    // localStorage.setItem('token', data.access_token);
    this.router.navigate(['/home']);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  isAuth() {
    return this.user != null;
  }
}
