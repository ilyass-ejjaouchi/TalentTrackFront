import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from "../constants";

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  private baseUrl = `${API_URL}/api/v1/export`;

  constructor(private http: HttpClient) { }

  exportUsersByRoleToExcel(role: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/users/${role}`, { responseType: 'blob' });
  }
}
