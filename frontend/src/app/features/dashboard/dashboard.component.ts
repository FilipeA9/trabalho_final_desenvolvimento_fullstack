import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  cards = [
    { title: 'Pacientes', icon: 'people', route: '/pacientes', description: 'Gerenciar cadastro de pacientes', color: '#1565c0' },
    { title: 'Dentistas', icon: 'medical_services', route: '/dentistas', description: 'Gerenciar cadastro de dentistas', color: '#0d47a1' },
    { title: 'Consultas', icon: 'calendar_month', route: '/consultas', description: 'Agendar e gerenciar consultas', color: '#1976d2' },
    { title: 'Prontuário', icon: 'description', route: '/prontuario', description: 'Consultar prontuários dos pacientes', color: '#1e88e5' },
  ];
}
