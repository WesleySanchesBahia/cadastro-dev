import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../types/types-user';

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
      return res;
    }),catchError(this.handleError)
  )
  }

  getByParams(name:{name:string}):Observable<any>{
    return this.http.get<any>(`${this.url}/search`, {
      params:name
    }).pipe(map(res => {
      return res;
    }),catchError(this.handleError)
  )
  }

  post(dev:User):Observable<boolean>{
    return this.http.post<boolean>(this.url, dev).pipe(map(() => {
      return true;
    }),catchError(this.handleError)
  )
  }


  put(user:User):Observable<boolean> {
    return this.http.put<User>(`${this.url}/${user._id}`, user).pipe(map(user => {
      return true;
    }),catchError(this.handleError))
  }
}
