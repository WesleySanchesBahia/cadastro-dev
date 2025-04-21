import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Dev } from '../types/types-dev';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DevService {

  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }


  get():Observable<any>{
    return this.http.get<any>(environment.APIURL, {}).pipe(map(res => {
      return res.content;
    }),catchError(this.handleError)
  )
  }

  getByParams(name:{name:string}):Observable<any>{
    return this.http.get<any>(`${environment.APIURL}/search`, {
      params:name
    }).pipe(map(res => {
      return res.content;
    }),catchError(this.handleError)
  )
  }

  post(dev:Dev):Observable<any>{
    return this.http.post<any>(environment.APIURL, dev).pipe(map((res) => {
      return  res;
    }),catchError(this.handleError)
  )
  }


  put(dev:Dev):Observable<any> {
    return this.http.put<any>(`${environment.APIURL}/${dev._id}`, dev).pipe(map((res) => {
      return res.content;
    }),catchError(this.handleError))
  }

  delete(id:string):Observable<any>{
    return this.http.delete<any>(`${environment.APIURL}/${id}`).pipe(map((res) => {
      return res;
    }), catchError(this.handleError))
  }
}
