import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, catchError, shareReplay } from 'rxjs/operators';
import { take } from 'rxjs/internal/operators/take';

import { environment } from '../../../environments/environment';
import { ShipModel } from '../models/ship';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');

  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) { }

  public getAllShips(): Observable<ShipModel[]> {
    return this.http.get<ShipModel[]>(`${environment.baseUrl}`)
    .pipe(
      first(),
      shareReplay(),
      catchError(this.errorHandlingService.handleError)
    ); 
  }

  public getShipById(id: string): Observable<ShipModel> {
    return this.http.get<ShipModel>(`${environment.baseUrl}/read/${id}`)
    .pipe(take(1));
  }

  public createShip(formData: FormData | ShipModel): Observable<ShipModel> {
    return this.http.post<ShipModel>(`${environment.baseUrl}/create`, formData)
    .pipe(
      first(),
      catchError(this.errorHandlingService.handleError)
    ); 
  }

  public updateShipData(id: string, formData: FormData | ShipModel): Observable<ShipModel> {
    return this.http.patch<ShipModel>(`${environment.baseUrl}/update/${id}`, formData)
    .pipe(
      first(),
      catchError(this.errorHandlingService.handleError)
    ); 
  }

  public deleteShip(id: string): Observable<ShipModel> {
    return this.http.delete<ShipModel>(`${environment.baseUrl}/delete/${id}`)
    .pipe(
      first(),
      catchError(this.errorHandlingService.handleError)
    ); 
  }
}
