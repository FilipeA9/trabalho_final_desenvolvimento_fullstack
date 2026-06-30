import { Component, OnInit, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { ConsultaService } from '../../../core/services/consulta.service';
import { Consulta } from '../../../core/models/models';

@Component({
  selector: 'app-consulta-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatChipsModule, RouterLink],
  templateUrl: './consulta-list.component.html',
  styleUrl: './consulta-list.component.scss'
})
export class ConsultaListComponent implements OnInit {
  consultas = signal<Consulta[]>([]);
  displayedColumns = ['id', 'pacienteNome', 'dentistaNome', 'dataHora', 'status', 'acoes'];

  statusColors: Record<string, string> = {
    'AGENDADA': 'primary',
    'CONCLUIDA': 'accent',
    'CANCELADA': 'warn'
  };

  private consultaService = inject(ConsultaService);

  ngOnInit(): void {
    this.carregarConsultas();
  }

  carregarConsultas(): void {
    this.consultaService.listarTodas().subscribe(data => this.consultas.set(data));
  }

  cancelar(id: number): void {
    if (confirm('Deseja realmente cancelar esta consulta?')) {
      this.consultaService.atualizarStatus(id, 'CANCELADA').subscribe(() => this.carregarConsultas());
    }
  }

  concluir(id: number): void {
    this.consultaService.atualizarStatus(id, 'CONCLUIDA').subscribe(() => this.carregarConsultas());
  }


}
