import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'InnovaTube';
  showMenu = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log('Navigated to:', event.url);
      this.showMenu = !(event.url === '/login' || event.url === '/' || event.url.startsWith('/login/'));
    });
    
    this.showMenu = !this.router.url.includes('/login');
  }
}
