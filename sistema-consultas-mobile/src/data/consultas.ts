import { Consulta } from "../types";

export const consultasSimuladas: Consulta[] = [
  {
    id: 1,
    paciente: {
      id: 1,
      nome: "Joao Silva",
      cpf: "123.456.789-00",
      telefone: "(11) 98765-4321",
    },
    medico: {
      id: 1,
      nome: "Dr. Pedro Almeida",
      especialidade: "Clinico Geral",
      crm: "CRM/SP 12345",
    },
    data: "20/03/2025",
    horario: "09:00",
    status: "Agendada",
    observacoes: "Consulta de rotina anual",
  },
  {
    id: 2,
    paciente: {
      id: 2,
      nome: "Maria Oliveira",
      cpf: "987.654.321-00",
      telefone: "(11) 91234-5678",
    },
    medico: {
      id: 2,
      nome: "Dra. Ana Costa",
      especialidade: "Cardiologia",
      crm: "CRM/SP 67890",
    },
    data: "21/03/2025",
    horario: "14:30",
    status: "Realizada",
    observacoes: "Retorno cardiologico",
  },
  {
    id: 3,
    paciente: {
      id: 3,
      nome: "Carlos Santos",
      cpf: "456.789.123-00",
      telefone: "(11) 99876-5432",
    },
    medico: {
      id: 3,
      nome: "Dr. Lucas Ferreira",
      especialidade: "Ortopedia",
      crm: "CRM/SP 11223",
    },
    data: "25/03/2025",
    horario: "11:00",
    status: "Pendente",
  },
  {
    id: 4,
    paciente: {
      id: 1,
      nome: "Joao Silva",
      cpf: "123.456.789-00",
      telefone: "(11) 98765-4321",
    },
    medico: {
      id: 2,
      nome: "Dra. Ana Costa",
      especialidade: "Cardiologia",
      crm: "CRM/SP 67890",
    },
    data: "28/03/2025",
    horario: "16:00",
    status: "Cancelada",
    observacoes: "Paciente cancelou por motivos pessoais",
  },
];
