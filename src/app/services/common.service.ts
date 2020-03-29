import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export abstract class CommonService<E> {

  constructor(protected http: HttpClient) { }

  protected miUrl: string;

  getAll(): Observable<E[]> {
    return this.http.get<E[]>(this.miUrl).pipe(catchError(this.handleError));
  }

  getOne(id: number): Observable<E> {
    return this.http.get<E>(this.miUrl + id).pipe(catchError(this.handleError));
  }

  post(entity: E): Observable<E> {
    return this.http.post<E>(this.miUrl, entity).pipe(catchError(this.handleError));
  }

  put(id: number, entity: E) {
    return this.http.put<E>(this.miUrl + id, entity).pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.miUrl + id).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    alert(`Codigo de error: ${error.status}` + `\nMensaje: ${error.error}`);
    return throwError('Por favor, intente de nuevo.');
  }
  // Service Add
  getLast(id: number): Observable<E[]> {
    return this.http.get<E[]>(this.miUrl + 'searchEmpresa/' + id
    ).pipe(catchError(this.handleError));
  }
  buscarPorNombre(texto: string) {
    return this.http.get<E[]>(this.miUrl + 'search/' + texto
    ).pipe(catchError(this.handleError));
  }
}
