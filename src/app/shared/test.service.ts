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
export class TestService {
	private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
	constructor(private http: HttpClient,
		private router: Router,
		private snackbar: MatSnackBar) {
	}

	Authenticate(Username: string, Password: string) {
		this.http.post<any>(environment.ip + '/login/Autenticar', { Username, Password },)
			.pipe(catchError(res => {
				let errorMessage = ''

				console.log(res);

				this.snackbar.open(res.error.Estatus ? res.error.Estatus.Message : res.error.Message ? res.error.Message : res.error, 'Entendido', {
					duration: 5000
				})
				return throwError(errorMessage)
			})).subscribe(res => {
				if (res.Token) {
					localStorage.setItem('modulos', JSON.stringify(res.Modulos));
					localStorage.setItem('token', res.Token);
					localStorage.setItem('usuario', res.Usuario_ID);
					window.location.replace('/dashboard')
					this.loggedIn.next(true);
				}
			}, (res) => {
				console.log(res)
			});
		this.loggedIn.next(true);
	}

	recuperacion(correo: string) {
		const formData = new FormData();
		formData.append('correo', correo);

		let body = {
			Correo: correo
		};

		this.http.post(environment.ip + `/recuperacion/recuperacionPassword`, body).subscribe(res => {
		});
	}

	confirmarContraseña(Correo: string, Clave: string) {

		return this.http.post<any>(environment.ip + `/recuperacion/`, { Correo, Clave })
	}

	get isLoggedIn() {
		return this.loggedIn.asObservable();
	}

	logout() {
		this.loggedIn.next(false);
		localStorage.clear();
		document.location.href = '/';
	}
}
