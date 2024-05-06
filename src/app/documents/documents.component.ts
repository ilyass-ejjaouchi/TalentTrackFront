import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  documents = [
    { title: 'Convention de stage', count: 24 },
    { title: 'Attestation de réussite', count: 9 },
    { title: 'Contrat de travail', count: 40 },
    { title: 'Diplôme', count: 25 },
    { title: 'Curriculum Vitae', count: 12 }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
