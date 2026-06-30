import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dentista } from '../models/models';

@Injectable({ providedIn: 'root' })
export class DentistaService {
  private apiUrl = 'http://localhost:8081/api/dentistas';

  private http = inject(HttpClient);

  listarTodos(): Observable<Dentista[]> {
    return this.http.get<Dentista[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Dentista> {
    return this.http.get<Dentista>(`${this.apiUrl}/${id}`);
  }

  salvar(dentista: Dentista): Observable<Dentista> {
    return this.http.post<Dentista>(this.apiUrl, dentista);
  }

  atualizar(id: number, dentista: Dentista): Observable<Dentista> {
    return this.http.put<Dentista>(`${this.apiUrl}/${id}`, dentista);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
