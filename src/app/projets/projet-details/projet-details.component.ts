import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ProjectService} from "../../services/ProjectService";

@Component({
  selector: 'app-projet-details',
  templateUrl: './projet-details.component.html',
  styleUrls: ['./projet-details.component.css']
})
export class ProjetDetailsComponent implements OnInit {
  projetId!: number;
  projet: any = {};
  collaborateurs: any[] = [];

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projetId = this.route.snapshot.params['id'];
    this.loadProjetDetails();
  }

  loadProjetDetails() {
    this.projectService.getProjectById(this.projetId).subscribe(
      (projet) => {
        this.projet = projet;
        this.collaborateurs = projet.users;
      },
      (error) => {
        console.error('Erreur lors du chargement des détails du projet :', error);
      }
    );
  }
}
