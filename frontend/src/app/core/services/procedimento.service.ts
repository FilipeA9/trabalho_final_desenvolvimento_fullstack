import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Procedimento } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ProcedimentoService {
  private apiUrl = 'http://localhost:8081/api/procedimentos';

  private http = inject(HttpClient);

  listarTodos(): Observable<Procedimento[]> {
    return this.http.get<Procedimento[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Procedimento> {
    return this.http.get<Procedimento>(`${this.apiUrl}/${id}`);
  }

  salvar(procedimento: Procedimento): Observable<Procedimento> {
    if (procedimento.id) {
      return this.http.put<Procedimento>(`${this.apiUrl}/${procedimento.id}`, procedimento);
    }
    return this.http.post<Procedimento>(this.apiUrl, procedimento);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
