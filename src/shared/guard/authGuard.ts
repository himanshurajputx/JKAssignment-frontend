import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { routes } from '../../app/app.routes';
import {Constant} from '../constant';

@Injectable({
  providedIn: 'root' // Use `providedIn` for better dependency injection
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const url: string = state.url.replace(/\//g, "");
    const validRoutes = routes.map(route => route.path);

    const isRouteValid = validRoutes.includes(url);

    if (this.isLoggedIn()) {
      if (url === 'login') {
        return this.router.createUrlTree(['/dashboard']); // Redirect logged-in users from login to dashboard
      }
      return true; // Allow access to valid routes
    } else {
      if (isRouteValid) {
        return this.router.createUrlTree(['/auth/login']); // Redirect unauthenticated users to login
      } else {
        return this.router.createUrlTree(['/auth/login']); // Redirect to login for unknown routes
      }
    }
  }

  private isLoggedIn(): boolean {
    // Implement your actual authentication check logic (e.g., check token in localStorage)
    return !!localStorage.getItem(Constant.SET_TOKEN);
  }
}
