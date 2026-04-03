import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentUrl = '';

  constructor(router: Router) {
    router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      this.currentUrl = e.urlAfterRedirects;
    });
  }

  get isAdmin() { return this.currentUrl.startsWith('/admin'); }
  get isCajero() { return this.currentUrl.startsWith('/cajero'); }
}
