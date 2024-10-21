import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { TestService } from '../../shared/test.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { StaticUtils } from '../shared/utils/static-utils';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	isRecovery: boolean;
	hide = true;
	esconder = true;
	formularioLogin: FormGroup;
	formularioRecovera: FormGroup;
  formularioRegistro: FormGroup;
	usuarios = new Array();
  currentView = 'login';


	constructor(
		//private service: TestService,
		private formbuilder: FormBuilder,
		private snackBar: MatSnackBar,
		private router: Router
	) {

		this.crearFormulario();
	}
	ngOnInit(): void {
		// Validamos si existe un token navegamos a hacia el dashboard
		if (StaticUtils.getTokenLocalStorage === true) {
			this.router.navigate([`/dashboard`]);
		}

		this.formularioLogin;
		this.formularioRecovera;
    this.formularioRegistro;
		//localStorage.removeItem('token')
	}

	crearFormulario() {
		this.formularioLogin = this.formbuilder.group({
			usuario: ['', Validators.compose([Validators.email, Validators.required])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
		});

		this.formularioRecovera = this.formbuilder.group({
			password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      passwordConfirm: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
		})
    this.formularioRegistro = this.formbuilder.group({
      nombreCompleto: ['', Validators.required],
      usuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
	}

	onKeydown(evento) {
		if (evento) {
			this.hide = false
			this.loginSubir();
		}
	}

	loginSubir() {
		if (!this.formularioLogin.valid) {
			this.openSnackBar('Debe llenar correctamente los campos para poder ingresar al sistema', 'Entendido');
		} else {
			//this.service.Authenticate(this.formularioLogin.value.usuario, this.formularioLogin.value.password)
		}
	}

	reestablecer() {
		//this.service.recuperacion(this.formularioRecovery.value.usuarioRecovery);
		this.openSnackBar('Se le ha enviado un link de recuperación de contraseña a su correo', 'Entendido');
	}

	isRecoveryChange() {
		this.isRecovery = !this.isRecovery;
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 3000,
		});
	}

  setView(view: string) {
    this.currentView = view;
  }

  registrar() {

  }
}
