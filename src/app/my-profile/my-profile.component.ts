import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../services/UserService";
import { ProjectService } from "../services/ProjectService";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  profileForm!: FormGroup;
  connectedUser: any;
  projects: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.loadConnectedUser();
    this.loadProjects();

    console.log(this.connectedUser)
    this.profileForm = this.formBuilder.group({
      nom: [this.connectedUser?.nom || '', Validators.required],
      prenom: [this.connectedUser?.prenom || '', Validators.required],
      matricule: [this.connectedUser?.matricule || '', Validators.required],
      titre: [this.connectedUser?.titre || '', Validators.required],
      email: [this.connectedUser?.email || '', Validators.required],
      projectId: [null]
    });
  }

  loadConnectedUser(): void {
    const userFromLocalStorage = localStorage.getItem('connectedUser');
    this.connectedUser = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : {};
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  sauvegarder(): void {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
      this.userService.updateUserProfile(formData).subscribe(response => {
        console.log('Profile updated successfully:', response);
      }, error => {
        console.error('Error updating profile:', error);
      });
    }
  }
}
