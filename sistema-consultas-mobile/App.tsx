import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ConsultaCard } from "./src/components/ConsultaCard";
import { FiltroStatus } from "./src/components/FiltroStatus";
import { consultasSimuladas } from "./src/data/consultas";
import { Consulta, StatusConsulta } from "./src/types";

type FiltroOpcao = "Todas" | StatusConsulta;

export default function App() {
  // Estado para controlar o filtro ativo
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroOpcao>("Todas");

  // Estado para controlar se o painel de resumo está visível
  const [resumoVisivel, setResumoVisivel] = useState<boolean>(false);

  // Filtragem das consultas com base no filtro ativo
  const consultasFiltradas: Consulta[] =
    filtroAtivo === "Todas"
      ? consultasSimuladas
      : consultasSimuladas.filter((c) => c.status === filtroAtivo);

  // Contagens para os botões de filtro
  const contagens = {
    Todas: consultasSimuladas.length,
    Agendada: consultasSimuladas.filter((c) => c.status === "Agendada").length,
    Realizada: consultasSimuladas.filter((c) => c.status === "Realizada").length,
    Cancelada: consultasSimuladas.filter((c) => c.status === "Cancelada").length,
    Pendente: consultasSimuladas.filter((c) => c.status === "Pendente").length,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="light" />
      <StatusBar backgroundColor="#1565C0" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.titulo}>Sistema de Consultas</Text>
          <Text style={styles.subtitulo}>Gerenciamento Médico</Text>
        </View>
        <TouchableOpacity
          style={styles.btnResumo}
          onPress={() => setResumoVisivel(!resumoVisivel)}
        >
          <Text style={styles.btnResumoTexto}>
            {resumoVisivel ? "Ocultar" : "Resumo"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {/* Renderização condicional: painel de resumo */}
        {resumoVisivel && (
          <View style={styles.resumoPanel}>
            <Text style={styles.resumoTitulo}>Resumo do Sistema</Text>
            <View style={styles.resumoGrid}>
              <View style={[styles.resumoItem, { backgroundColor: "#E3F2FD" }]}>
                <Text style={[styles.resumoNum, { color: "#1565C0" }]}>
                  {contagens.Agendada}
                </Text>
                <Text style={styles.resumoLabel}>Agendadas</Text>
              </View>
              <View style={[styles.resumoItem, { backgroundColor: "#E8F5E9" }]}>
                <Text style={[styles.resumoNum, { color: "#2E7D32" }]}>
                  {contagens.Realizada}
                </Text>
                <Text style={styles.resumoLabel}>Realizadas</Text>
              </View>
              <View style={[styles.resumoItem, { backgroundColor: "#FFF8E1" }]}>
                <Text style={[styles.resumoNum, { color: "#F57F17" }]}>
                  {contagens.Pendente}
                </Text>
                <Text style={styles.resumoLabel}>Pendentes</Text>
              </View>
              <View style={[styles.resumoItem, { backgroundColor: "#FFEBEE" }]}>
                <Text style={[styles.resumoNum, { color: "#C62828" }]}>
                  {contagens.Cancelada}
                </Text>
                <Text style={styles.resumoLabel}>Canceladas</Text>
              </View>
            </View>
          </View>
        )}

        {/* Filtros de status */}
        <FiltroStatus
          filtroAtivo={filtroAtivo}
          onFiltroChange={setFiltroAtivo}
          contagens={contagens}
        />

        {/* Indicador de resultado */}
        <Text style={styles.resultadoTexto}>
          {consultasFiltradas.length}{" "}
          {consultasFiltradas.length === 1 ? "consulta encontrada" : "consultas encontradas"}
          {filtroAtivo !== "Todas" ? ` · ${filtroAtivo}` : ""}
        </Text>

        {/* Lista de consultas */}
        <FlatList
          data={consultasFiltradas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ConsultaCard consulta={item} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.vazio}>
              <Text style={styles.vazioTexto}>
                Nenhuma consulta encontrada
              </Text>
              <Text style={styles.vazioSubTexto}>
                Tente outro filtro
              </Text>
            </View>
          }
          contentContainerStyle={styles.lista}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1565C0",
  },
  header: {
    backgroundColor: "#1565C0",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  subtitulo: {
    fontSize: 13,
    color: "#90CAF9",
    marginTop: 2,
  },
  btnResumo: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  btnResumoTexto: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 16,
  },
  resumoPanel: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  resumoTitulo: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A237E",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  resumoGrid: {
    flexDirection: "row",
    gap: 8,
  },
  resumoItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  resumoNum: {
    fontSize: 22,
    fontWeight: "800",
  },
  resumoLabel: {
    fontSize: 11,
    color: "#546E7A",
    marginTop: 2,
    fontWeight: "500",
  },
  resultadoTexto: {
    fontSize: 13,
    color: "#78909C",
    marginBottom: 12,
    fontWeight: "500",
  },
  lista: {
    paddingBottom: 20,
  },
  vazio: {
    alignItems: "center",
    paddingVertical: 40,
  },
  vazioTexto: {
    fontSize: 16,
    fontWeight: "600",
    color: "#90A4AE",
  },
  vazioSubTexto: {
    fontSize: 13,
    color: "#B0BEC5",
    marginTop: 4,
  },
});
