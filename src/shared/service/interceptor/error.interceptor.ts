import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private _injector: Injector,
              private toastr: ToastrService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // If you use this tap method, and catch the error in the second callback, the error will also continue on the the component that made the call
      tap(
        (incoming: any) => {},
        (error: HttpErrorResponse) => {
          this.toastr.error(error.error.message || 'An API error occurred', error.error.statusCode);
          return of(error);
        }
      ),
      catchError(error => {
        // this.toastr.error(error.message || 'An API error occurred', 'error');

        return of(error);
      }),
    );
  }
}
