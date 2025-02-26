import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Constant} from "../../constant";

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptor implements HttpInterceptor {
  constructor(
  ) {}
  authenticatedRequest:any ;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
    // @ts-ignore
  ): Observable<HttpEvent<any>> {
    const endPoint = request.url.split('/');
    const point = endPoint.map(item => item == 'login');


    // @ts-ignore
    const accessToken: string = localStorage.getItem(Constant.SET_TOKEN);

    // Set headers for requests that require authorization.
    if (accessToken) {

      this.authenticatedRequest = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
      });
      // Request with authorization headers
      return next.handle(this.authenticatedRequest);
    } else {
      // Request without authorization header
      return next.handle(request);
    }
  }
}
