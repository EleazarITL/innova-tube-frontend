import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StaticUtils } from './shared/utils/static-utils';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isLoggedIn = StaticUtils.getTokenLocalStorage; // Verificar si existe un token valido y activo
    if (isLoggedIn) {
      return true; // El usuario está logueado, permite el acceso
    } else {
      this.router.navigate(['/login']); // Redirige al login si no está logueado
      return false; // Bloquea el acceso
    }
  }
}
