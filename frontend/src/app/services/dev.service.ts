import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Dev } from '../types/types-dev';

@Injectable({
  providedIn: 'root'
})
export class DevService {

  constructor(private http: HttpClient) {}
  private url:string = "http://localhost:3000/dev"

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
    return this.http.get<any>(this.url, {}).pipe(map(res => {
      return res.content;
    }),catchError(this.handleError)
  )
  }

  getByParams(name:{name:string}):Observable<any>{
    return this.http.get<any>(`${this.url}/search`, {
      params:name
    }).pipe(map(res => {
      return res.content;
    }),catchError(this.handleError)
  )
  }

  post(dev:Dev):Observable<any>{
    return this.http.post<any>(this.url, dev).pipe(map((res) => {
      return  res;
    }),catchError(this.handleError)
  )
  }


  put(dev:Dev):Observable<any> {
    return this.http.put<any>(`${this.url}/${dev._id}`, dev).pipe(map((res) => {
      return res.content;
    }),catchError(this.handleError))
  }

  delete(id:string):Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`).pipe(map((res) => {
      return res;
    }), catchError(this.handleError))
  }
}
