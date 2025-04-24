import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../../core/config/config.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);

  get<T>(endpoint: string, params?: any): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get<T>(endpoint, { params: httpParams });
  }

  getById<T>(endpoint: string, id: string): Observable<T> {
    return this.http.get<T>(`${endpoint}/${id}`);
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(endpoint, body);
  }

  put<T>(endpoint: string, id: string, body: any): Observable<T> {
    return this.http.put<T>(`${endpoint}/${id}`, body);
  }

  delete<T>(endpoint: string, id: string): Observable<T> {
    return this.http.delete<T>(`${endpoint}/${id}`);
  }

  getFullUrl(endpoint: string): string {
    return `${this.configService.getApiBaseUrl()}/${endpoint}`;
  }
}