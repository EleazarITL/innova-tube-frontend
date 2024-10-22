import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
	providedIn: 'root'
})
export class VideosService {
	constructor(
		private http: HttpClient,
		private snackbar: MatSnackBar) {
	}

	searchVideos(filtros) {
		return this.http.post<any>(environment.ip + `/videos/lista`, filtros)
	}

	searchFavoritos(body) {
		return this.http.post<any>(environment.ip + `/videos/listaFavoritos`, body)
	}

	agregarFavoritos(body) {
		return this.http.post<any>(environment.ip + `/videos/agregarFavoritos`, body)
	}

	eliminarFavoritos(body) {
		return this.http.post<any>(environment.ip + `/videos/eliminarFavoritos`, body)
	}


	
}
