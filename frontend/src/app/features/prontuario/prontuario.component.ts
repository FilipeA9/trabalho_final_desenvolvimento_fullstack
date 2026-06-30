import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';

import { PacienteService } from '../../core/services/paciente.service';
import { ConsultaService } from '../../core/services/consulta.service';
import { ProcedimentoService } from '../../core/services/procedimento.service';
import { Paciente, Consulta, Procedimento } from '../../core/models/models';

@Component({
  selector: 'app-prontuario',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatIconModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    MatDividerModule, MatExpansionModule, MatTableModule
  ],
  templateUrl: './prontuario.component.html',
  styleUrl: './prontuario.component.scss'
})
export class ProntuarioComponent implements OnInit {
  private pacienteService = inject(PacienteService);
  private consultaService = inject(ConsultaService);
  private procedimentoService = inject(ProcedimentoService);
  private fb = inject(FormBuilder);

  pacientes = signal<Paciente[]>([]);
  todasConsultas = signal<Consulta[]>([]);
  todosProcedimentos = signal<Procedimento[]>([]);

  selectedPacienteId = signal<number | null>(null);

  consultasDoPaciente = computed(() => {
    const pId = this.selectedPacienteId();
    if (!pId) return [];
    return this.todasConsultas().filter(c => c.pacienteId === pId);
  });

  form: FormGroup;
  colunasProcedimentos = ['descricao', 'valor', 'observacoes', 'acoes'];

  constructor() {
    this.form = this.fb.group({
      consultaId: [null, Validators.required],
      descricao: ['', Validators.required],
      valor: [null, [Validators.required, Validators.min(0)]],
      observacoes: ['']
    });
  }

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.pacienteService.listarTodos().subscribe(data => this.pacientes.set(data));
    this.consultaService.listarTodas().subscribe(data => this.todasConsultas.set(data));
    this.procedimentoService.listarTodos().subscribe(data => this.todosProcedimentos.set(data));
  }

  onPacienteChange(pacienteId: number) {
    this.selectedPacienteId.set(pacienteId);
    this.form.reset();
  }

  getProcedimentosDaConsulta(consultaId: number | undefined): Procedimento[] {
    if (!consultaId) return [];
    return this.todosProcedimentos().filter(p => p.consultaId === consultaId);
  }

  salvarProcedimento() {
    if (this.form.invalid) return;

    const proc: Procedimento = this.form.value;
    this.procedimentoService.salvar(proc).subscribe(novoProc => {
      this.todosProcedimentos.update(procs => [...procs, novoProc]);
      this.form.reset({ consultaId: proc.consultaId }); // Mantém a consulta selecionada
    });
  }

  excluirProcedimento(id: number | undefined) {
    if (!id) return;
    if (confirm('Deseja excluir este procedimento?')) {
      this.procedimentoService.excluir(id).subscribe(() => {
        this.todosProcedimentos.update(procs => procs.filter(p => p.id !== id));
      });
    }
  }
}
