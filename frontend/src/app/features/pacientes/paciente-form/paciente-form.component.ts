import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { PacienteService } from '../../../core/services/paciente.service';

@Component({
  selector: 'app-paciente-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule, RouterLink],
  templateUrl: './paciente-form.component.html',
  styleUrl: './paciente-form.component.scss'
})
export class PacienteFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  pacienteId?: number;

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      telefone: [''],
      endereco: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.pacienteId = +id;
      this.pacienteService.buscarPorId(this.pacienteId).subscribe(p => this.form.patchValue(p));
    }
  }

  salvar(): void {
    if (this.form.invalid) return;
    const paciente = this.form.value;

    if (this.isEdit && this.pacienteId) {
      this.pacienteService.atualizar(this.pacienteId, paciente).subscribe(() => this.router.navigate(['/pacientes']));
    } else {
      this.pacienteService.salvar(paciente).subscribe(() => this.router.navigate(['/pacientes']));
    }
  }
}
