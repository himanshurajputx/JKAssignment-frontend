import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../../../app/dashboard/dashboard.component';
import {BlogsComponent} from '../../../app/blogs/blogs.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {DashboardLayoutComponent} from './dashboard-layout.component';
import {ApiService} from '../../service/api.service';
import {HttpServices} from '../../service/http';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HeaderInterceptor} from '../../service/interceptor/header.interceptor';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      // {
      //   path: '',
      //   component: DashboardComponent
      // },
      {
        path:'',
        component: BlogsComponent
      }

    ]
  },
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    DashboardComponent,
    BlogsComponent,
    HttpClientModule,
    NgbModule

  ],
  providers: [ApiService,HttpServices,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }]
})
export class DashboardModule { }
