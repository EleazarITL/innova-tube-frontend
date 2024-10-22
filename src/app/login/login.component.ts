import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../shared/login.service';
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
	ocultar = true;
	formularioLogin: FormGroup;
	formularioActualizarPassword: FormGroup;
	formularioRegistro: FormGroup;
	usuarios = new Array();
	vistaActual = 'login';
	siteKey: string = '6LcA_mcqAAAAAM1HePepogqD6GeyNusThOpDEVp3';
	captchaVerificado: boolean = false;

	constructor(
		private service: LoginService,
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
		this.formularioActualizarPassword;
		this.formularioRegistro;
	}

	crearFormulario() {
		this.formularioLogin = this.formbuilder.group({
			usuario: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(8)]]
		});

		this.formularioActualizarPassword = this.formbuilder.group({
			correo: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(8)]],
			passwordConfirm: ['', [Validators.required, Validators.minLength(8)]],
		}, { validators: this.passwordsCoinciden });

		this.formularioRegistro = this.formbuilder.group({
			nombreCompleto: ['', Validators.required],
			usuario: [{ value: '', disabled: true }], // Usuario autogenerado y deshabilitado
			correo: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(8)]]
		});
	}

	// Método para verificar si las contraseñas coinciden
	passwordsCoinciden(form: FormGroup) {
		const password = form.get('password').value;
		const confirmPassword = form.get('passwordConfirm').value;
		console.log(password === confirmPassword ? true : false);
		return password === confirmPassword ? true : false;
	}
	

	onKeydown(evento) {
		if (evento) {
			this.ocultar = false;
			this.loginSubir();
		}
	}

	loginSubir() {
		if (!this.formularioLogin.valid) {
			this.openSnackBar('Debe llenar correctamente los campos para poder ingresar al sistema', 'Entendido');
		} else {
			this.service.Authenticate(this.formularioLogin.value.usuario, this.formularioLogin.value.password);
		}
	}

	reestablecer() {
		if (this.formularioActualizarPassword.valid) {
			this.service.actualizarPassword(this.formularioActualizarPassword.value.correo, this.formularioActualizarPassword.value.password);
		} else {
			this.openSnackBar('Debe llenar correctamente los campos para poder reestablecer la contraseña', 'Entendido');
		}
	}

	
	ejecutarCaptcha(token: any) {
		let body = {
			token: token
		}
		this.service.verificarCaptcha(body).subscribe((respuesta) => {
			if (respuesta.success === true) { 
				this.captchaVerificado = true;
			} else {
				this.openSnackBar('Falta resolver el reCAPTCHA', 'Entendido');
				this.captchaVerificado = false;
			}
		});
	}

	registrar() {
		if (this.formularioRegistro.valid && this.captchaVerificado) {
			let body = {
				email: this.formularioRegistro.value.correo,
				password: this.formularioRegistro.value.password,
				usuario: this.formularioRegistro.get('usuario').value,
				nombre_completo: this.formularioRegistro.value.nombreCompleto
			}
			this.service.registrar(body).subscribe((respuesta) => {
				if (respuesta.success === true) { 
					this.openSnackBar(respuesta.message, 'Entendido');
				} else {
					this.openSnackBar(respuesta.message, 'Entendido');
				}
			});
		} else {
			if (!this.captchaVerificado) {
				this.openSnackBar('Falta resolver el reCAPTCHA ', 'Entendido');	
			} else {
				this.openSnackBar('Debe llenar correctamente los campos para poder registrarse', 'Entendido');
			}
		}
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 3000,
		});
	}

	cambiarVista(vista: string) {
		this.vistaActual = vista;
	}

	// Método para autogenerar el nombre de usuario basado en el nombre completo
	generarUsuario(nombreCompleto: string): string {
		const nombreArr = nombreCompleto.split(' ');
		const nombre = nombreArr[0];
		const apellidos = nombreArr.slice(1).map(a => a[0]).join(''); // Iniciales de los apellidos
		const usuario = `${nombre}${apellidos}2024`; // Formato: NombreInicialesAño
		return usuario;
	}

	// Se ejecuta cuando el nombre completo cambia en el formulario de registro
	onNombreCompletoChange() {
		const nombreCompleto = this.formularioRegistro.get('nombreCompleto').value;
		const usuarioGenerado = this.generarUsuario(nombreCompleto);
		this.formularioRegistro.get('usuario').setValue(usuarioGenerado);
	}
}
