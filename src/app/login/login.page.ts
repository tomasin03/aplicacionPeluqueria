import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { AccountService } from '../account/account.service';
import { ToastController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye: ElementRef;
  passwordTypeInput  =  'Password';

  usuarios

  userF = this.fb.group({
    NomUsuario: ['', [Validators.required, Validators.minLength(4)]],
    Password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public account: AccountService,
    public toastController: ToastController
  ) { }

  ngOnInit() {    
    this.account.obtenerDatos()
    .subscribe(
      (data) => {this.usuarios = data;},
      (error) => {console.log(error);}
    )
  }

  volver() {
    this.router.navigate(['/home']);
  }
  registro() {
    this.router.navigate(['/registrar']);
  }
  togglePasswordMode() {
    //cambiar tipo input
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'Password' : 'text';
   //obtener el input
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
   //obtener el indice de la posición del texto actual en el input
    const inputSelection = nativeEl.selectionStart;
   //ejecuto el focus al input
    nativeEl.focus();
  //espero un milisegundo y actualizo la posición del indice del texto
    setTimeout(() => {
       nativeEl.setSelectionRange(inputSelection, inputSelection);
    }, 1);
  }

  loguearse(user, pass) {
    if (user == '' || pass == '') {
      this.rellenarDatos()
    } else {
      let userInfo: Usuario = Object.assign({}, this.userF.value);
      this.account.login(userInfo).subscribe(token => this.recibirToken(token),
        error => this.manejarError(error));  
    }
    
  }

  async rellenarDatos() {
    const toast = await this.toastController.create({
      message: 'Debe rellenar todos los datos',
      duration: 2000
    });
    toast.present();
  }

  async datosIncorrectos() {
    const toast = await this.toastController.create({
      message: 'El usuario o la contraseña son incorrectos',
      duration: 2000
    });
    toast.present();
  }

  recibirToken(token) {
    localStorage.setItem('token', token.token);
    localStorage.setItem('tokenExpiration', token.expiration);
    this.router.navigate(["/home"]);
  }

  manejarError(error) {
    if (error && error.error) {
      this.datosIncorrectos();
    }
  }

}
