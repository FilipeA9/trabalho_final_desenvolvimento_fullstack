import { Component, OnInit, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

import { PacienteService } from '../../core/services/paciente.service';
import { ConsultaService } from '../../core/services/consulta.service';
import { Consulta, Paciente } from '../../core/models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterLink, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private pacienteService = inject(PacienteService);
  private consultaService = inject(ConsultaService);

  totalPacientes = signal<number>(0);
  consultasMes = signal<number>(0);
  consultasHoje = signal<number>(0);

  // Configuração do Gráfico de Pizza (Status)
  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Agendada', 'Concluída', 'Cancelada'],
    datasets: [{ data: [0, 0, 0], backgroundColor: ['#1976d2', '#388e3c', '#d32f2f'] }]
  };
  public pieChartOptions: ChartConfiguration['options'] = { responsive: true };
  public isChartReady = signal<boolean>(false);

  cards = [
    { title: 'Pacientes', icon: 'people', route: '/pacientes', description: 'Gerenciar cadastro', color: '#1565c0' },
    { title: 'Dentistas', icon: 'medical_services', route: '/dentistas', description: 'Gerenciar cadastro', color: '#0d47a1' },
    { title: 'Consultas', icon: 'calendar_month', route: '/consultas', description: 'Agendamentos', color: '#1976d2' },
    { title: 'Prontuário', icon: 'description', route: '/prontuario', description: 'Registros clínicos', color: '#1e88e5' },
  ];

  ngOnInit() {
    this.pacienteService.listarTodos().subscribe(pacientes => {
      this.totalPacientes.set(pacientes.length);
    });

    this.consultaService.listarTodas().subscribe(consultas => {
      this.calcularMetricas(consultas);
    });
  }

  private calcularMetricas(consultas: Consulta[]) {
    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();
    const hojeStr = hoje.toISOString().split('T')[0]; // "YYYY-MM-DD"

    let cMes = 0;
    let cHoje = 0;
    let stAgendada = 0;
    let stConcluida = 0;
    let stCancelada = 0;

    consultas.forEach(c => {
      const dataC = new Date(c.dataHora);
      
      // Contagem do mês
      if (dataC.getMonth() === mesAtual && dataC.getFullYear() === anoAtual) {
        cMes++;
      }
      // Contagem de hoje
      if (c.dataHora.startsWith(hojeStr)) {
        cHoje++;
      }
      // Status
      if (c.status === 'AGENDADA') stAgendada++;
      if (c.status === 'CONCLUIDA') stConcluida++;
      if (c.status === 'CANCELADA') stCancelada++;
    });

    this.consultasMes.set(cMes);
    this.consultasHoje.set(cHoje);

    this.pieChartData = {
      labels: ['Agendada', 'Concluída', 'Cancelada'],
      datasets: [{ data: [stAgendada, stConcluida, stCancelada], backgroundColor: ['#1976d2', '#388e3c', '#d32f2f'] }]
    };
    this.isChartReady.set(true);
  }
}
