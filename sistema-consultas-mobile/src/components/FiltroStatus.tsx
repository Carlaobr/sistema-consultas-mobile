import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { StatusConsulta } from "../types";

type FiltroOpcao = "Todas" | StatusConsulta;

interface FiltroStatusProps {
  filtroAtivo: FiltroOpcao;
  onFiltroChange: (filtro: FiltroOpcao) => void;
  contagens: Record<FiltroOpcao, number>;
}

const opcoes: FiltroOpcao[] = ["Todas", "Agendada", "Realizada", "Pendente", "Cancelada"];

export const FiltroStatus: React.FC<FiltroStatusProps> = ({
  filtroAtivo,
  onFiltroChange,
  contagens,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {opcoes.map((opcao) => (
        <TouchableOpacity
          key={opcao}
          style={[styles.botao, filtroAtivo === opcao && styles.botaoAtivo]}
          onPress={() => onFiltroChange(opcao)}
        >
          <Text
            style={[styles.texto, filtroAtivo === opcao && styles.textoAtivo]}
          >
            {opcao}
          </Text>
          <View
            style={[styles.badge, filtroAtivo === opcao && styles.badgeAtivo]}
          >
            <Text
              style={[
                styles.badgeTexto,
                filtroAtivo === opcao && styles.badgeTextoAtivo,
              ]}
            >
              {contagens[opcao]}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  content: {
    paddingHorizontal: 4,
    gap: 8,
  },
  botao: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#ECEFF1",
    gap: 6,
  },
  botaoAtivo: {
    backgroundColor: "#1565C0",
  },
  texto: {
    fontSize: 13,
    fontWeight: "600",
    color: "#546E7A",
  },
  textoAtivo: {
    color: "#FFFFFF",
  },
  badge: {
    backgroundColor: "#CFD8DC",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  badgeAtivo: {
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  badgeTexto: {
    fontSize: 11,
    fontWeight: "700",
    color: "#546E7A",
  },
  badgeTextoAtivo: {
    color: "#FFFFFF",
  },
});

export default FiltroStatus;
