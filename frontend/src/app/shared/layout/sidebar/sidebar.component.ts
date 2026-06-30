import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Pacientes', icon: 'people', route: '/pacientes' },
    { label: 'Dentistas', icon: 'medical_services', route: '/dentistas' },
    { label: 'Consultas', icon: 'calendar_month', route: '/consultas' },
    { label: 'Prontuário', icon: 'description', route: '/prontuario' },
  ];
}
