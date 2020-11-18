import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

const helper = new JwtHelperService();

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {

  private userData = new BehaviorSubject(null);
  InfoUser = null;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    let token = localStorage.getItem('token');    
    let decoded = helper.decodeToken(token);
    this.InfoUser = decoded
    this.userData.next(decoded);
    console.log(this.InfoUser);
  }

  volver() {
    this.router.navigate(['/home']);
  }
}
