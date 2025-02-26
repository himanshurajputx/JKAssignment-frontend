import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {LoadingComponent} from '../../loader';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard.component.html',
  imports: [
    RouterOutlet,
    RouterLink,
    LoadingComponent,
  ],
  styleUrl: './dashboard.component.css'
})
export class DashboardLayoutComponent {
  constructor(
    private readonly router: Router
  ) {
  }
  logout(){
    this.router.navigate(['/auth/login'])
    localStorage.clear()
  }
}


