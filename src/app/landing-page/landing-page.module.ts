import { NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';


import { ToastrModule } from 'ngx-toastr';
import {LandingPageComponent} from './landing-page.component';
import {ApiService} from '../../shared/service/api.service';
import {ErrorInterceptorService} from '../../shared/service/interceptor/error.interceptor';
import {LoaderInterceptor} from '../../shared/service/interceptor/loader.interceptor';
import {HttpServices} from '../../shared/service/http';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {BlogDetailsComponent} from '../blog-details/blog-details.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path:'blogs/details/:id',
    component: BlogDetailsComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    InfiniteScrollModule
  ],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    HttpServices
  ],
})
export class LandingPageModule { }
