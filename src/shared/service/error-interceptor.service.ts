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
              private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // If you use this tap method, and catch the error in the second callback, the error will also continue on the the component that made the call
      tap(
        (incoming: any) => {},
        (error: HttpErrorResponse) => {
          console.error('error in http',error.message);

          this.toastr.error(error.message || 'An API error occurred', 'error');

          return of(error);
        }
      ),
      // If you use this catchError function, the error stops here and does not continue back to the component that made the call.
      catchError(error => {
        console.error('error in catchError',error.message);

        this.toastr.error(error.message || 'An API error occurred', 'error');

        return of(error);
      }),
    );
  }
}
