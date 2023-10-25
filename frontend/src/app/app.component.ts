import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'posts';

  constructor(private router: Router) {}

  mostrarAppNavigation() {
    // Verifica se a rota atual não é "login" nem "signup"
    return !this.router.url.includes('/login') && !this.router.url.includes('/signup');
  }
}
