import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VideosComponent } from './videos/videos.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
