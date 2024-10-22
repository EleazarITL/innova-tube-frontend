import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class LoginService {
	constructor(
		private http: HttpClient,
		private snackbar: MatSnackBar) {
	}

	Authenticate(usuario: string, password: string) {
		this.http.post<any>(environment.ip + '/autenticacion/login', { usuario, password },)
			.pipe(catchError(res => {
				let errorMessage = ''

				console.log(res);

				this.snackbar.open(res.error.message, 'Entendido', {
					duration: 5000
				})
				
				return throwError(errorMessage)
			})).subscribe(res => {
				if (res.token) {
					localStorage.setItem('token', res.token);
					localStorage.setItem('usuario', res.nombre_completo);
					localStorage.setItem('usuario_id', res.id);
					window.location.replace('/dashboard')
				}
			}, (res) => {
				console.log(res)
			});
	}

	actualizarPassword(email: string, password: string) {
		const formData = new FormData();
		formData.append('correo', email);

		let body = {
			email: email,
			password: password
		};

		this.http.put(environment.ip + `/autenticacion/actualizarPassword`, body).pipe(catchError(res => {
			let errorMessage = ''

			console.log(res);

			this.snackbar.open(res.error.message, 'Entendido', {
				duration: 5000
			})
			
			return throwError(errorMessage)
		})).subscribe(res => {
			if (res) {
				this.snackbar.open('Contraseña actualizada con éxito', 'Entendido');
			}
		}, (res) => {
			console.log(res)
		});
	}

	registrar(body) {
		return this.http.post<any>(environment.ip + `/autenticacion/registro`, body)
	}

	verificarCaptcha(body) {
		return this.http.post<any>(environment.ip + `/autenticacion/validarCaptcha`, body)
	}


	
}
