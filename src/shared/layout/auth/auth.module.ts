import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationComponent} from '../../../app/authentication/authentication.component';
import {ApiService} from '../../service/api.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { ToastrModule } from 'ngx-toastr';
import {HttpServices} from '../../service/http';
import {ErrorInterceptorService} from '../../service/interceptor/error.interceptor';
import {LoaderInterceptor} from '../../service/interceptor/loader.interceptor';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: AuthenticationComponent
      },

    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    AuthenticationComponent,
    SocialLoginModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        lang: 'en',
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '209876101638-vrll444she6dn00i7joiq93nt36pc44h.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
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
export class AuthModule { }
