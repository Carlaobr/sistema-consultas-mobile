// Tipos e interfaces do Sistema de Consultas Mobile

export type StatusConsulta = "Agendada" | "Realizada" | "Cancelada" | "Pendente";

export interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
}

export interface Medico {
  id: number;
  nome: string;
  especialidade: string;
  crm: string;
}

export interface Consulta {
  id: number;
  paciente: Paciente;
  medico: Medico;
  data: string;
  horario: string;
  status: StatusConsulta;
  observacoes?: string;
}
