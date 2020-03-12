import { LoginData } from './app.interfaces';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandler, ServerError } from 'iqb-components';


@Injectable()
export class BackendService {

  constructor(
      @Inject('SERVER_URL') private serverUrl: string,
      private http: HttpClient) {
  }

  login(name: string, password: string): Observable<LoginData | ServerError> {

    return this.http
      .put<LoginData>(this.serverUrl + 'session/admin', {name, password})
      .pipe(catchError(ErrorHandler.handle));
  }

  getLoginData(adminToken: string): Observable<LoginData | ServerError> {

    const authToken = JSON.stringify({at: adminToken});
    return this.http
      .get<LoginData>(this.serverUrl + 'sesion', {headers: {'AuthToken': authToken}})
      .pipe(catchError(ErrorHandler.handle));
  }
}
