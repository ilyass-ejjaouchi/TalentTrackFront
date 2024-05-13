import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ProjectService } from "../../services/ProjectService";
import { UserService } from "../../services/UserService";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-stagaire',
  templateUrl: './manage-stagaire.component.html',
  styleUrls: ['./manage-stagaire.component.css']
})
export class ManageStagaireComponent implements OnInit {
  stagiaireForm: FormGroup;
  projets: any[] = [];
  readOnly: boolean;
  addMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<ManageStagaireComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.stagiaireForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      matricule: [''],
      titre: [''],
      diplome: [''],
      etablissement: [''],
      descriptionTaches: [''],
      email: ['', [Validators.email]],
      password: [''],
      projectId: [null]
    });

    this.readOnly = this.data.readOnly;
    this.addMode = this.data.addMode;

    if (!this.addMode && this.data.personne) {
      this.stagiaireForm.patchValue(this.data.personne);
    }
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(projects => {
      this.projets = projects;
    });
  }

  ajouterStagiaire(): void {
    if (this.stagiaireForm.valid) {
      let stagiaireData = this.stagiaireForm.value;
      stagiaireData.role = "STAGAIRE";

      if (this.addMode) {
        this.userService.addUser(stagiaireData).subscribe(response => {
          console.log('Stagiaire ajouté avec succès :', response);
          this.userService.notifyCollaboratorAdded();
          this.dialogRef.close();
        }, error => {
          console.error('Erreur lors de l\'ajout du stagiaire :', error);
        });
      } else {
        const userId = this.data.personne.id;
        this.userService.updateUser(userId, stagiaireData).subscribe(response => {
          this.userService.notifyCollaboratorAdded();
          console.log('Stagiaire mis à jour avec succès :', response);
          this.dialogRef.close();
        }, error => {
          console.error('Erreur lors de la mise à jour du stagiaire :', error);
        });
      }
    } else {
      console.error('Le formulaire est invalide');
    }
  }

  fermer(): void {
    this.dialogRef.close();
  }
}

