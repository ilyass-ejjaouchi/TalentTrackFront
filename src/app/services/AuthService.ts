import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const role = decodedToken.role[0].authority;
      return role;
    }
    return null;
  }

  isConnected(): boolean {
    const token = localStorage.getItem('token');
    const connectedUser = localStorage.getItem('connectedUser');
    return !!token || !!connectedUser;
  }

  isAdmin(): boolean {
    const userRole = this.getUserRole();
    return userRole === 'ADMIN';
  }

  isColaborateur(): boolean {
    const userRole = this.getUserRole();
    return userRole === 'COLLABORATEUR';
  }

  isStagaire(): boolean {
    const userRole = this.getUserRole();
    return userRole === 'STAGAIRE';
  }
}
