import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ManageProjectComponent } from "./manage-project/manage-project.component";
import { ProjectService } from "../services/ProjectService";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent {
  projets: any[] = [];

  constructor(private dialog: MatDialog,
              private router: Router,
              private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(projects => {
      this.projets = projects;
    });
  }

  ajouterProjet(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '80%';
    dialogConfig.width = '70%';
    dialogConfig.id = 'dialog-add-projet';
    const modalDialog = this.dialog.open(ManageProjectComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result === 'saved') {
        this.loadProjects();
      }
    });
  }

  editDetails(projet: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '80%';
    dialogConfig.width = '70%';
    dialogConfig.id = 'dialog-edit-projet';
    dialogConfig.data = { project: projet };
    const modalDialog = this.dialog.open(ManageProjectComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result === 'saved') {
        this.loadProjects();
      }
    });
  }

  delete(projet: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Êtes-vous sûr de vouloir supprimer le projet :',
        nom: projet.intitule,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'oui') {
        this.projectService.deleteProject(projet.id).subscribe(() => {
          this.loadProjects();
        });
      }
    });
  }

  viewDetails(projet: any) {
    this.router.navigate(['/projets', projet.id]);
  }
}
