import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private apiUrl = 'http://localhost:5111/api/bikes';

  constructor(private http: HttpClient) { }

  list(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(bike: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, bike);
  }
}
