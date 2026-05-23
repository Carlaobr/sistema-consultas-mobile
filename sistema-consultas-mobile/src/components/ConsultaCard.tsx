import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Consulta, StatusConsulta } from "../types";

interface ConsultaCardProps {
  consulta: Consulta;
}

const statusConfig: Record<StatusConsulta, { cor: string; corTexto: string }> = {
  Agendada:  { cor: "#E3F2FD", corTexto: "#1565C0" },
  Realizada: { cor: "#E8F5E9", corTexto: "#2E7D32" },
  Cancelada: { cor: "#FFEBEE", corTexto: "#C62828" },
  Pendente:  { cor: "#FFF8E1", corTexto: "#F57F17" },
};

export const ConsultaCard: React.FC<ConsultaCardProps> = ({ consulta }) => {
  const [expandido, setExpandido] = useState<boolean>(false);
  const config = statusConfig[consulta.status];

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setExpandido(!expandido)}
      activeOpacity={0.85}
    >
      {/* Header do card */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.pacienteNome}>{consulta.paciente.nome}</Text>
          <Text style={styles.medicoNome}>{consulta.medico.nome}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: config.cor }]}>
          <Text style={[styles.statusTexto, { color: config.corTexto }]}>
            {consulta.status}
          </Text>
        </View>
      </View>

      {/* Data e horário */}
      <View style={styles.dataHora}>
        <Text style={styles.dataHoraTexto}>
          {consulta.data} às {consulta.horario}
        </Text>
        <Text style={styles.especialidade}>{consulta.medico.especialidade}</Text>
      </View>

      {/* Renderização condicional: detalhes expandidos */}
      {expandido && (
        <View style={styles.detalhes}>
          <View style={styles.separador} />
          <Text style={styles.detalheLabel}>Paciente</Text>
          <Text style={styles.detalheValor}>{consulta.paciente.nome}</Text>
          <Text style={styles.detalheValor}>CPF: {consulta.paciente.cpf}</Text>
          <Text style={styles.detalheValor}>Tel: {consulta.paciente.telefone}</Text>

          <Text style={[styles.detalheLabel, { marginTop: 8 }]}>Médico</Text>
          <Text style={styles.detalheValor}>{consulta.medico.nome}</Text>
          <Text style={styles.detalheValor}>CRM: {consulta.medico.crm}</Text>

          {consulta.observacoes ? (
            <>
              <Text style={[styles.detalheLabel, { marginTop: 8 }]}>Observações</Text>
              <Text style={styles.detalheValor}>{consulta.observacoes}</Text>
            </>
          ) : null}

          <Text style={styles.tocarParaFechar}>Toque para fechar</Text>
        </View>
      )}

      {!expandido && (
        <Text style={styles.tocarParaVer}>Toque para ver detalhes</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#1565C0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerInfo: {
    flex: 1,
    marginRight: 8,
  },
  pacienteNome: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A237E",
  },
  medicoNome: {
    fontSize: 14,
    color: "#546E7A",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusTexto: {
    fontSize: 12,
    fontWeight: "600",
  },
  dataHora: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  dataHoraTexto: {
    fontSize: 13,
    color: "#455A64",
    fontWeight: "500",
  },
  especialidade: {
    fontSize: 13,
    color: "#78909C",
  },
  detalhes: {
    marginTop: 8,
  },
  separador: {
    height: 1,
    backgroundColor: "#ECEFF1",
    marginVertical: 10,
  },
  detalheLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1565C0",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  detalheValor: {
    fontSize: 14,
    color: "#37474F",
    marginTop: 2,
  },
  tocarParaVer: {
    fontSize: 11,
    color: "#90A4AE",
    marginTop: 8,
    textAlign: "right",
  },
  tocarParaFechar: {
    fontSize: 11,
    color: "#90A4AE",
    marginTop: 12,
    textAlign: "center",
  },
});

export default ConsultaCard;
