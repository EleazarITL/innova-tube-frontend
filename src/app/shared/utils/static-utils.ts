
import { MatSnackBar } from "@angular/material/snack-bar";

export class StaticUtils {

    // Variables de Clase
	private snackBar: MatSnackBar;

	constructor() {
	}

    // Funcion para validar si un valor es null, undefined o vacio
	public static isNullUndefinedVacio(Valor: any) {

		// Validamos el valor
		if (Valor === null || Valor === undefined || Valor === '' || Valor === 'null') {
			return { Valor: Valor, isValid: false };;
		} else {
			return { Valor: Valor, isValid: true };
		}
	}

    public openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 5000,
			panelClass: ["blue-snackbar"],
		});
	}

    public static get getTokenLocalStorage() {

		try {
			let token = localStorage.getItem('token');

			if (token && token !== '' && token !== null && token !== undefined) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			return false;
		}
	}
}