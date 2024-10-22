import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  usuario: string = localStorage.getItem('usuario'); 

  constructor(
    private router: Router
  ) {

  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario'); 
    localStorage.removeItem('usuario_id'); 
		this.router.navigate([`/login`]);
  }  
}
