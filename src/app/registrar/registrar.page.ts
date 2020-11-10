import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from '../models/usuario';
import { AccountService } from '../account/account.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye: ElementRef;
  
  passwordTypeInput  =  'Password';
  
  userL = this.fb.group({
    NomUsuario: ['', [Validators.required, Validators.minLength(4)]],
    Password: ['', [Validators.required, Validators.minLength(8)]],
    Email: ['', Validators.email],
    Nombre: ['', [Validators.required]],
    Apellido: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public toastController: ToastController,
    public account: AccountService
  ) { }

  ngOnInit() {}

  volver() {
    this.router.navigate(['/home']);
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
  async comprobarContraseña() {
    const toast = await this.toastController.create({
      message: 'Las contraseñas no coinciden.',
      duration: 2000
    });
    toast.present();
  }
  async comprobarUsuario() {
    const toast = await this.toastController.create({
      message: 'El usuario ya existe.',
      duration: 2000
    });
    toast.present();
  }
  async rellenarDatos() {
    const toast = await this.toastController.create({
      message: 'Debe rellenar todos los datos',
      duration: 2000
    });
    toast.present();
  }

  register(user, pass, correo, name, surname, passConf) {
  
    if (pass != passConf) {
      this.comprobarContraseña()
    }
    else if (user =='' || pass =='' ||correo =='' ||name =='' ||surname =='' ||passConf =='') {
      this.rellenarDatos();
    }
    else {
      let userInfo: Usuario = Object.assign({}, this.userL.value);
      this.account.create(userInfo).subscribe(token => this.recibirToken(token),
        error => this.manejarError(error)); 
    }       
  }

  recibirToken(token) {
    localStorage.setItem('token', token.token);
    localStorage.setItem('tokenExpiration', token.expiration);
    this.router.navigate([""]);
    console.log(token.userDetails);
  }

  manejarError(error) {
    if (error && error.error) {
      this.comprobarUsuario();
    }
  }

}
