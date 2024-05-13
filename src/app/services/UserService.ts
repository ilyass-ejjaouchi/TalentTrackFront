import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { API_URL } from "../constants";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${API_URL}/api/v1/users`;
  private collaboratorAddedSubject: Subject<void> = new Subject<void>();
  private connectedUser!: any;

  constructor(private http: HttpClient) {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser') || '{}');
  }

  getUsersByRole(role: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/byRole/${role}`);
  }

  addUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, userData);
  }

  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${userId}`, userData);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${userId}`);
  }

  notifyCollaboratorAdded(): void {
    this.collaboratorAddedSubject.next();
  }

  getCollaboratorAddedNotifier(): Observable<void> {
    return this.collaboratorAddedSubject.asObservable();
  }

  updateUserProfile(userData: any): Observable<any> {
    const userId = this.connectedUser.id;
    return this.http.put<any>(`${this.baseUrl}/update/${userId}`, userData);
  }

  getUser(): Observable<any> {
    const userId = this.connectedUser.id;
    return this.http.get<any>(`${this.baseUrl}/${userId}`);
  }

  getUsersByRoles(roles: string[]): Observable<any[]> {
    const rolesStr = roles.join(',');
    const params = new HttpParams().set('roles', rolesStr);
    return this.http.get<any[]>(`${this.baseUrl}/selectByRoles`, { params });
  }

  searchUsersByName(searchTerm: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/search`, { params: { searchTerm: searchTerm } });
  }
}
