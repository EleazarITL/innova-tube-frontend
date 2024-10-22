import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MenuComponent } from "./menu/menu.component";
import { VideosComponent } from "./videos/videos.component";
import { FavoritosComponent } from "./favoritos/favoritos.component";
import { RegistroComponent } from "./registro/registro.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from "./shared/material.module";
import { RecaptchaModule } from "ng-recaptcha";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    DashboardComponent,
    VideosComponent,
    FavoritosComponent,
    RegistroComponent
  ],
  exports: [
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    RecaptchaModule
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ],
})
export class AppModule {}
