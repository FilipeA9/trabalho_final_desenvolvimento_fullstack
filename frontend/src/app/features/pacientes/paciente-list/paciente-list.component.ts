import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { PacienteService } from '../../../core/services/paciente.service';
import { Paciente } from '../../../core/models/models';

@Component({
  selector: 'app-paciente-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatCardModule, RouterLink],
  templateUrl: './paciente-list.component.html',
  styleUrl: './paciente-list.component.scss'
})
export class PacienteListComponent implements OnInit {
  pacientes: Paciente[] = [];
  displayedColumns = ['id', 'nome', 'cpf', 'telefone', 'acoes'];

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.carregarPacientes();
  }

  carregarPacientes(): void {
    this.pacienteService.listarTodos().subscribe(data => this.pacientes = data);
  }

  excluir(id: number): void {
    if (confirm('Deseja realmente excluir este paciente?')) {
      this.pacienteService.excluir(id).subscribe(() => this.carregarPacientes());
    }
  }
}
