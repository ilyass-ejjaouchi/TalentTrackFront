import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ProjectService } from "../../services/ProjectService";
import { UserService } from "../../services/UserService";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-collaborateur',
  templateUrl: './add-collaborateur.component.html',
  styleUrls: ['./add-collaborateur.component.css']
})
export class AddCollaborateurComponent implements OnInit {
  collaborateurForm: FormGroup;
  projets: any[] = [];
  readOnly: boolean;
  addMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddCollaborateurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.collaborateurForm = this.fb.group({
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
      this.collaborateurForm.patchValue(this.data.personne);
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

  ajouterCollaborateur(): void {
    if (this.collaborateurForm.valid) {
      let collaborateurData = this.collaborateurForm.value;
      collaborateurData.role = "COLLABORATEUR";

      if (this.addMode) {
        this.userService.addUser(collaborateurData).subscribe(response => {
          console.log('Collaborateur ajouté avec succès :', response);
          this.userService.notifyCollaboratorAdded();
          this.dialogRef.close();
        }, error => {
          console.error('Erreur lors de l\'ajout du collaborateur :', error);
        });
      } else {
        const userId = this.data.personne.id;
        this.userService.updateUser(userId, collaborateurData).subscribe(response => {
          this.userService.notifyCollaboratorAdded();
          console.log('Collaborateur mis à jour avec succès :', response);
          this.dialogRef.close();
        }, error => {
          console.error('Erreur lors de la mise à jour du collaborateur :', error);
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
