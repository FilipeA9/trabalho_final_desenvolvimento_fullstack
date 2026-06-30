import { Component, OnInit, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { DentistaService } from '../../../core/services/dentista.service';
import { Dentista } from '../../../core/models/models';

@Component({
  selector: 'app-dentista-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatCardModule, RouterLink],
  templateUrl: './dentista-list.component.html',
  styleUrl: './dentista-list.component.scss'
})
export class DentistaListComponent implements OnInit {
  dentistas = signal<Dentista[]>([]);
  displayedColumns = ['id', 'nome', 'cro', 'especialidade', 'acoes'];

  private dentistaService = inject(DentistaService);

  ngOnInit(): void {
    this.carregarDentistas();
  }

  carregarDentistas(): void {
    this.dentistaService.listarTodos().subscribe(data => this.dentistas.set(data));
  }

  excluir(id: number): void {
    if (confirm('Deseja realmente excluir este dentista?')) {
      this.dentistaService.excluir(id).subscribe(() => this.carregarDentistas());
    }
  }
}
