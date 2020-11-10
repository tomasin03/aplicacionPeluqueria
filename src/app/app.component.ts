import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from './account/account.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  private userData = new BehaviorSubject(null);
  user = null;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public accountService: AccountService,
    public auth: AuthInterceptorService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    if (this.estaLogueado()) {
    let token = localStorage.getItem('token');
      let decoded = helper.decodeToken(token);
      this.userData.next(decoded);     
      this.user = decoded.NomUsuario;
      console.log(decoded.NomUsuario);
    }
    console.log(this.estaLogueado())      
  }

  ngOnInit() {    
    if (this.estaLogueado()) {
      let token = localStorage.getItem('token');
        let decoded = helper.decodeToken(token);
        this.userData.next(decoded);     
        this.user = decoded.NomUsuario;
        console.log(decoded.NomUsuario);
      }   
  }

  iniSesion() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/']);
  }

  estaLogueado() {
    return this.accountService.estaLogueado();
  }

}