import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../models/models';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private apiUrl = 'http://localhost:8081/api/pacientes';

  private http = inject(HttpClient);

  listarTodos(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`);
  }

  salvar(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl, paciente);
  }

  atualizar(id: number, paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/${id}`, paciente);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
