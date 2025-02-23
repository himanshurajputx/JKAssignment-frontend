import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('../shared/layout/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren:()=> import('../shared/layout/dashboard/dashboard.module').then(m=> m.DashboardModule)
  }
];
