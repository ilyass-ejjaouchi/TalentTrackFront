import { Component } from '@angular/core';
import {UserService} from "../services/UserService";
import {EmailService} from "../services/EmailService";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  searchTerm: string = '';
  users: any[] = [];
  selectedUsers: any[] = [];
  message: string = '';
  loading: boolean = false;
  emailSent: boolean = false;

  constructor(private userService: UserService,
              private snackBar: MatSnackBar,
              private emailService: EmailService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsersByRoles(['COLLABORATEUR', 'STAGAIRE']).subscribe(users => {
      this.users = users;
    }, error => {
      console.error('Error fetching users:', error);
    });
  }

  searchUsers() {
    if (this.searchTerm.trim() !== '') {
      this.userService.searchUsersByName(this.searchTerm).subscribe(users => {
        this.users = users;
      }, error => {
        console.error('Error searching users:', error);
      });
    } else {
      this.fetchUsers();
    }
  }
  sendEmail() {
    this.loading = true;
    const recipients = this.selectedUsers.map(user => user.email);
    const emailData = {
      subject: 'Notification de TalentTrack app',
      body: this.message,
      to: recipients
    };
    this.emailService.sendEmail(emailData).subscribe(response => {
      console.log('Email response:', response);
      this.loading = false;
      this.emailSent = true;
      this.selectedUsers = [];
      this.message = '';
    }, (error: HttpErrorResponse) => {
      if (error.status === 200) {
        console.log('Email sent successfully!');
        this.loading = false;
        this.selectedUsers = [];
        this.message = '';
        this.snackBar.open('Email envoyé avec succès!', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top'
        });
      } else {
        console.error('Error sending email:', error);
        this.loading = false;
      }
    });
  }

  selectUser(user: any) {
    const index = this.selectedUsers.findIndex(u => u.id === user.id);
    if (index === -1) {
      this.selectedUsers.push(user);
    } else {
      this.selectedUsers.splice(index, 1);
    }
  }

  dismissSuccessMessage() {
    this.emailSent = false;
  }
}
