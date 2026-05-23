import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Consulta, StatusConsulta } from "../types";

interface ConsultaCardProps {
  consulta: Consulta;
  onConfirmar: (id: number) => Promise<void>;
  onCancelar: (id: number) => Promise<void>;
}

// Configuração visual por status
const statusConfig: Record<StatusConsulta, { cor: string; corTexto: string; icone: string }> = {
  Agendada:   { cor: "#E3F2FD", corTexto: "#1565C0", icone: "🗓️" },
  Confirmada: { cor: "#E8F5E9", corTexto: "#2E7D32", icone: "✅" },
  Cancelada:  { cor: "#FFEBEE", corTexto: "#C62828", icone: "❌" },
  Pendente:   { cor: "#FFF8E1", corTexto: "#F57F17", icone: "⏳" },
};

export const ConsultaCard: React.FC<ConsultaCardProps> = ({
  consulta,
  onConfirmar,
  onCancelar,
}) => {
  // Estado local: controla se os detalhes estão expandidos (renderização condicional)
  const [expandido, setExpandido] = useState<boolean>(false);

  const config = statusConfig[consulta.status];

  // Permite ação apenas se não estiver finalizada
  const podeConfirmar: boolean =
    consulta.status === "Agendada" || consulta.status === "Pendente";
  const podeCancelar: boolean = consulta.status !== "Cancelada";

  function handleConfirmar(): void {
    Alert.alert(
      "Confirmar Consulta",
      `Deseja confirmar a consulta de ${consulta.paciente.nome}?`,
      [
        { text: "Não", style: "cancel" },
        { text: "Sim", onPress: () => onConfirmar(consulta.id) },
      ]
    );
  }

  function handleCancelar(): void {
    Alert.alert(
      "Cancelar Consulta",
      `Deseja cancelar a consulta de ${consulta.paciente.nome}?`,
      [
        { text: "Não", style: "cancel" },
        { text: "Cancelar", style: "destructive", onPress: () => onCancelar(consulta.id) },
      ]
    );
  }

  return (
    <View style={styles.card}>
      {/* Cabeçalho do card */}
      <TouchableOpacity
        onPress={() => setExpandido(!expandido)}
        activeOpacity={0.8}
      >
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <Text style={styles.pacienteNome}>{consulta.paciente.nome}</Text>
            <Text style={styles.medicoNome}>{consulta.medico.nome}</Text>
            <Text style={styles.especialidade}>{consulta.medico.especialidade}</Text>
          </View>
          {/* Badge de status */}
          <View style={[styles.badge, { backgroundColor: config.cor }]}>
            <Text style={styles.badgeIcone}>{config.icone}</Text>
            <Text style={[styles.badgeTexto, { color: config.corTexto }]}>
              {consulta.status}
            </Text>
          </View>
        </View>

        {/* Data e horário */}
        <View style={styles.dataRow}>
          <Text style={styles.dataTexto}>📅 {consulta.data}</Text>
          <Text style={styles.dataTexto}>🕐 {consulta.horario}</Text>
        </View>
      </TouchableOpacity>

      {/* Renderização condicional: detalhes expandidos */}
      {expandido && (
        <View style={styles.detalhes}>
          <View style={styles.separador} />
          <Text style={styles.detalheLabel}>Dados do Paciente</Text>
          <Text style={styles.detalheValor}>CPF: {consulta.paciente.cpf}</Text>
          <Text style={styles.detalheValor}>Tel: {consulta.paciente.telefone}</Text>
          <Text style={[styles.detalheLabel, { marginTop: 8 }]}>Dados do Médico</Text>
          <Text style={styles.detalheValor}>CRM: {consulta.medico.crm}</Text>
          {consulta.observacoes ? (
            <>
              <Text style={[styles.detalheLabel, { marginTop: 8 }]}>Observações</Text>
              <Text style={styles.detalheValor}>{consulta.observacoes}</Text>
            </>
          ) : null}
        </View>
      )}

      {/* Botões de ação — só aparecem se a consulta ainda pode ser alterada */}
      {(podeConfirmar || podeCancelar) && consulta.status !== "Confirmada" && (
        <View style={styles.acoes}>
          {/* Botão Confirmar */}
          {podeConfirmar && (
            <TouchableOpacity
              style={[styles.btnAcao, styles.btnConfirmar]}
              onPress={handleConfirmar}
            >
              <Text style={styles.btnTexto}>✅ Confirmar</Text>
            </TouchableOpacity>
          )}

          {/* Botão Cancelar */}
          {podeCancelar && (
            <TouchableOpacity
              style={[styles.btnAcao, styles.btnCancelar]}
              onPress={handleCancelar}
            >
              <Text style={[styles.btnTexto, { color: "#C62828" }]}>❌ Cancelar</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Renderização condicional: mensagem se já foi finalizada */}
      {consulta.status === "Cancelada" && (
        <Text style={styles.finalizadoTexto}>Esta consulta foi cancelada.</Text>
      )}
      {consulta.status === "Confirmada" && (
        <Text style={[styles.finalizadoTexto, { color: "#2E7D32" }]}>
          ✅ Consulta confirmada com sucesso!
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
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
    fontSize: 13,
    color: "#546E7A",
    marginTop: 2,
  },
  especialidade: {
    fontSize: 12,
    color: "#90A4AE",
    marginTop: 1,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 4,
  },
  badgeIcone: {
    fontSize: 11,
  },
  badgeTexto: {
    fontSize: 12,
    fontWeight: "700",
  },
  dataRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 10,
  },
  dataTexto: {
    fontSize: 13,
    color: "#455A64",
    fontWeight: "500",
  },
  detalhes: {
    marginTop: 4,
  },
  separador: {
    height: 1,
    backgroundColor: "#ECEFF1",
    marginVertical: 10,
  },
  detalheLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1565C0",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  detalheValor: {
    fontSize: 13,
    color: "#37474F",
    marginTop: 2,
  },
  acoes: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
  },
  btnAcao: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1.5,
  },
  btnConfirmar: {
    backgroundColor: "#E8F5E9",
    borderColor: "#2E7D32",
  },
  btnCancelar: {
    backgroundColor: "#FFEBEE",
    borderColor: "#C62828",
  },
  btnTexto: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2E7D32",
  },
  finalizadoTexto: {
    fontSize: 12,
    color: "#90A4AE",
    marginTop: 10,
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default ConsultaCard;
