import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {HttpServices} from './http';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(
    private httpServices: HttpServices,
  ) {
  }
   headers = new HttpHeaders().set('Content-Type', 'application/json');

  API_URL: string = "http://localhost:3000/api/"


  /**************************************************
   * File Creation date   : Feb-25-2025
   * File Updation date   : Feb-25-2025
   * Description          : Get Blog Data,
   * @Author              : HIMANSHU RAJPUT
   *************************************************/
  public getBlogs(limit?: any, page?: any): Observable<any> {
    let url = this.API_URL + `blogs?limit=${limit}&page=${page}`;
    return this.httpServices.get(
      url, {headers: this.headers, observe: 'response'})
      .pipe(map(response => response));
  }

  /**************************************************
   * File Creation date   : Feb-25-2025
   * File Updation date   : Feb-25-2025
   * Description          : Get Blog Data,
   * @Author              : HIMANSHU RAJPUT
   *************************************************/
  public getBlogsDetails(blogId: string | null): Observable<any> {
    let url = this.API_URL + `blogs/get-details/${blogId}`;
    return this.httpServices.get(
      url, {headers: this.headers, observe: 'response'})
      .pipe(map(response => response));
  }

  /**************************************************
   * File Creation date   : Feb-23-2025
   * File Updation date   : Feb-25-2025
   * Description          : USER  LOGIN,
   * @Author              : HIMANSHU RAJPUT
   *************************************************/
  public userLogin(data: Object): Observable<any> {
    let url = this.API_URL + 'authentication/login';
    return this.httpServices.post(
      url, data, {headers: this.headers, observe: 'response',withCredentials: true})
      .pipe(map(response => response));
  }

  public getBlogsList(limit?: any, page?: any): Observable<any> {
    let url = this.API_URL + `blogs/blog-list?limit=${limit}&page=${page}`;
    return this.httpServices.get(
      url, {headers: this.headers, observe: 'response'})
      .pipe(map(response => response));
  }

  public deleteBlog(id: any): Observable<any> {
    let url = this.API_URL + `blogs/${id}`;
    return this.httpServices.delete(
      url, {headers: this.headers, observe: 'response'})
      .pipe(map(response => response));
  }

  public googleLogin(){
    return this.httpServices.get(this.API_URL+'google').pipe(map(response => response))
  }


}
