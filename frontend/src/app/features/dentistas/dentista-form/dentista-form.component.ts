import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { DentistaService } from '../../../core/services/dentista.service';

@Component({
  selector: 'app-dentista-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule, RouterLink],
  templateUrl: './dentista-form.component.html',
  styleUrl: './dentista-form.component.scss'
})
export class DentistaFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  dentistaId?: number;

  private fb = inject(FormBuilder);
  private dentistaService = inject(DentistaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cro: ['', Validators.required],
      especialidade: ['', Validators.required],
      telefone: [''],
      email: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.dentistaId = +id;
      this.dentistaService.buscarPorId(this.dentistaId).subscribe(d => this.form.patchValue(d));
    }
  }

  salvar(): void {
    if (this.form.invalid) return;
    const dentista = this.form.value;

    if (this.isEdit && this.dentistaId) {
      this.dentistaService.atualizar(this.dentistaId, dentista).subscribe(() => this.router.navigate(['/dentistas']));
    } else {
      this.dentistaService.salvar(dentista).subscribe(() => this.router.navigate(['/dentistas']));
    }
  }
}
