import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/AuthService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService,
              private router: Router) { }

  role = this.authService.getUserRole();
  ngOnInit(): void {
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('connectedUser');

    this.router.navigate(['/login']);
  }
}
