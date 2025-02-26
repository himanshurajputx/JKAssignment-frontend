import { Routes } from '@angular/router';
import {AuthGuard} from '../shared/guard/authGuard';

export const routes: Routes = [
  {
    path:'',
    loadChildren:()=> import('./landing-page/landing-page.module').then(m=> m.LandingPageModule)
  },
  {
    path:'auth',
    loadChildren: () => import('../shared/layout/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'blogs',
    canActivate: [AuthGuard],
    loadChildren:()=> import('../shared/layout/dashboard/dashboard.module').then(m=> m.DashboardModule)
  }
];
