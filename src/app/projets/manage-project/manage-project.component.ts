import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {ProjectService} from "../../services/ProjectService";

@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrls: ['./manage-project.component.css']
})
export class ManageProjectComponent implements OnInit {
  project: any;
  intitule: string = '';
  description: string = '';

  constructor(
    public dialogRef: MatDialogRef<ManageProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.project = this.data.project;
    if (this.project) {
      this.intitule = this.project.intitule;
      this.description = this.project.description;
    }
  }

  saveProject(): void {
    const projectData = {
      intitule: this.intitule,
      description: this.description
    };

    if (this.project) {
      // Editing existing project
      this.projectService.updateProject(this.project.id, projectData).subscribe(
        () => {
          this.dialogRef.close('saved');
        },
        (error) => {
          console.error('Error updating project:', error);
        }
      );
    } else {
      this.projectService.addProject(projectData).subscribe(
        () => {
          this.dialogRef.close('saved');
        },
        (error) => {
          console.error('Error adding project:', error);
        }
      );
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
