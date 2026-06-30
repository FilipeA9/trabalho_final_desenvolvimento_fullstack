import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PacienteListComponent } from './features/pacientes/paciente-list/paciente-list.component';
import { PacienteFormComponent } from './features/pacientes/paciente-form/paciente-form.component';
import { DentistaListComponent } from './features/dentistas/dentista-list/dentista-list.component';
import { DentistaFormComponent } from './features/dentistas/dentista-form/dentista-form.component';
import { ConsultaListComponent } from './features/consultas/consulta-list/consulta-list.component';
import { ConsultaFormComponent } from './features/consultas/consulta-form/consulta-form.component';
import { ProntuarioComponent } from './features/prontuario/prontuario.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pacientes', component: PacienteListComponent },
  { path: 'pacientes/novo', component: PacienteFormComponent },
  { path: 'pacientes/editar/:id', component: PacienteFormComponent },
  { path: 'dentistas', component: DentistaListComponent },
  { path: 'dentistas/novo', component: DentistaFormComponent },
  { path: 'dentistas/editar/:id', component: DentistaFormComponent },
  { path: 'consultas', component: ConsultaListComponent },
  { path: 'consultas/novo', component: ConsultaFormComponent },
  { path: 'prontuario', component: ProntuarioComponent },
];
