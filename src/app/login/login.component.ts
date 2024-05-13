import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subscription } from 'rxjs';
import { API_URL } from "../constants";
import { Router } from "@angular/router";
import { AuthService } from "../services/AuthService";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  formData: any = {};

  constructor(private http: HttpClient,
              private router: Router,
              private auth: AuthService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    const loginData = {
      email: this.formData.email,
      password: this.formData.password
    };

    this.subscription.add(
      this.http.post<any>(`${API_URL}/api/v1/auth/signin`, loginData)
        .subscribe(
          response => {
            this.handleUpdateResponse(response);
            this.retrieveUserData(loginData.email);
          },
          error => this.handleError(error)
        )
    );
  }

  handleUpdateResponse(response: any): void {
    localStorage.setItem('token', response.token);
  }

  handleError(error: any): void {
    console.error('Error:', error);
  }

  retrieveUserData(email: string): void {
    this.http.post<any>(`${API_URL}/api/v1/users/email/${email}`, null)
      .subscribe(
        userData => {
          this.handleUserData(userData);
          if (this.auth.isAdmin()){
            this.router.navigate(['documents']);
          }
          if (this.auth.isStagaire() || this.auth.isColaborateur()){
            this.router.navigate(['upload']);
          }
        },
        error => console.error('Error fetching user data:', error)
      );
  }

  handleUserData(userData: any): void {
    localStorage.setItem('connectedUser', JSON.stringify(userData));
  }


}
