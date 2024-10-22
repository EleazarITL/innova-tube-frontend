import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  usuario: string = localStorage.getItem('usuario'); 
  menuOpen: boolean = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario'); 
    localStorage.removeItem('usuario_id'); 
    this.router.navigate(['/login']);
  }  
}
