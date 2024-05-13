import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {API_URL} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = `${API_URL}/api/projects`;

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addProject(project: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, project);
  }

  updateProject(id: number, project: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
