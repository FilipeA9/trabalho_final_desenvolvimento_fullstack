export interface Paciente {
  id?: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  telefone?: string;
  endereco?: string;
}

export interface Dentista {
  id?: number;
  nome: string;
  cro: string;
  especialidade: string;
  telefone?: string;
  email?: string;
}

export interface Consulta {
  id?: number;
  pacienteId: number;
  dentistaId: number;
  dataHora: string;
  status?: 'AGENDADA' | 'CONCLUIDA' | 'CANCELADA';
  pacienteNome?: string;
  dentistaNome?: string;
}

export interface Procedimento {
  id?: number;
  consultaId: number;
  descricao: string;
  valor: number;
  observacoes?: string;
}
