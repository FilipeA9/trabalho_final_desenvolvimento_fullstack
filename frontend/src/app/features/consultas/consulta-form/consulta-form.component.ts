import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ConsultaService } from '../../../core/services/consulta.service';
import { PacienteService } from '../../../core/services/paciente.service';
import { DentistaService } from '../../../core/services/dentista.service';
import { Paciente, Dentista } from '../../../core/models/models';

@Component({
  selector: 'app-consulta-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, MatIconModule, RouterLink],
  templateUrl: './consulta-form.component.html',
  styleUrl: './consulta-form.component.scss'
})
export class ConsultaFormComponent implements OnInit {
  form!: FormGroup;
  pacientes: Paciente[] = [];
  dentistas: Dentista[] = [];

  constructor(
    private fb: FormBuilder,
    private consultaService: ConsultaService,
    private pacienteService: PacienteService,
    private dentistaService: DentistaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      pacienteId: [null, Validators.required],
      dentistaId: [null, Validators.required],
      dataHora: ['', Validators.required]
    });

    this.pacienteService.listarTodos().subscribe(data => this.pacientes = data);
    this.dentistaService.listarTodos().subscribe(data => this.dentistas = data);
  }

  salvar(): void {
    if (this.form.invalid) return;
    this.consultaService.agendar(this.form.value).subscribe(() => this.router.navigate(['/consultas']));
  }
}
