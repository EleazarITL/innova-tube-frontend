import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  userName: string = 'Eleazar Corona Vázquez'; 

  cerrarSesion() {
    console.log('Cerrando sesión...');
  }  
}
