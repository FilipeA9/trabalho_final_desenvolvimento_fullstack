import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ConsultaService {
  private apiUrl = 'http://localhost:8081/api/consultas';

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Consulta> {
    return this.http.get<Consulta>(`${this.apiUrl}/${id}`);
  }

  agendar(consulta: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(this.apiUrl, consulta);
  }

  atualizarStatus(id: number, status: string): Observable<Consulta> {
    return this.http.patch<Consulta>(`${this.apiUrl}/${id}/status?status=${status}`, {});
  }
}
