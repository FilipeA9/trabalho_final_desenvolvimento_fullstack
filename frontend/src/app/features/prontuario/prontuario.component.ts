import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-prontuario',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './prontuario.component.html',
  styleUrl: './prontuario.component.scss'
})
export class ProntuarioComponent {}
