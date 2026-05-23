import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import { useConsultas } from "./src/hooks/useConsultas";
import { ConsultaCard } from "./src/components/ConsultaCard";
import { FiltroStatus, FiltroOpcao } from "./src/components/FiltroStatus";
import { Consulta } from "./src/types";

export default function App() {
  // Hook centraliza todo o gerenciamento de estado + AsyncStorage
  const { consultas, carregando, confirmar, cancelar } = useConsultas();

  // Estado do filtro ativo
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroOpcao>("Todas");

  // Filtragem reativa com base no filtro selecionado
  const consultasFiltradas: Consulta[] =
    filtroAtivo === "Todas"
      ? consultas
      : consultas.filter((c) => c.status === filtroAtivo);

  // Contagens para os botões de filtro
  const contagens: Record<FiltroOpcao, number> = {
    Todas:      consultas.length,
    Agendada:   consultas.filter((c) => c.status === "Agendada").length,
    Confirmada: consultas.filter((c) => c.status === "Confirmada").length,
    Cancelada:  consultas.filter((c) => c.status === "Cancelada").length,
    Pendente:   consultas.filter((c) => c.status === "Pendente").length,
  };

  // Renderização condicional: tela de loading enquanto o AsyncStorage carrega
  if (carregando) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1565C0" />
        <Text style={styles.loadingTexto}>Carregando consultas...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="light" />
      <StatusBar backgroundColor="#1565C0" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titulo}>🏥 Sistema de Consultas</Text>
        <Text style={styles.subtitulo}>
          {consultas.length} consulta{consultas.length !== 1 ? "s" : ""} · dados persistidos
        </Text>
      </View>

      <View style={styles.container}>
        {/* Resumo rápido de totais */}
        <View style={styles.resumo}>
          <View style={styles.resumoItem}>
            <Text style={[styles.resumoNum, { color: "#1565C0" }]}>{contagens.Agendada}</Text>
            <Text style={styles.resumoLabel}>Agendadas</Text>
          </View>
          <View style={styles.resumoItem}>
            <Text style={[styles.resumoNum, { color: "#2E7D32" }]}>{contagens.Confirmada}</Text>
            <Text style={styles.resumoLabel}>Confirmadas</Text>
          </View>
          <View style={styles.resumoItem}>
            <Text style={[styles.resumoNum, { color: "#F57F17" }]}>{contagens.Pendente}</Text>
            <Text style={styles.resumoLabel}>Pendentes</Text>
          </View>
          <View style={styles.resumoItem}>
            <Text style={[styles.resumoNum, { color: "#C62828" }]}>{contagens.Cancelada}</Text>
            <Text style={styles.resumoLabel}>Canceladas</Text>
          </View>
        </View>

        {/* Filtros por status */}
        <FiltroStatus
          filtroAtivo={filtroAtivo}
          onFiltroChange={setFiltroAtivo}
          contagens={contagens}
        />

        {/* Indicador de resultado */}
        <Text style={styles.resultadoTexto}>
          {consultasFiltradas.length}{" "}
          {consultasFiltradas.length === 1 ? "consulta" : "consultas"}
          {filtroAtivo !== "Todas" ? ` · ${filtroAtivo}` : ""}
        </Text>

        {/* Lista de consultas com botões de ação */}
        <FlatList
          data={consultasFiltradas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ConsultaCard
              consulta={item}
              onConfirmar={confirmar}
              onCancelar={cancelar}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.lista}
          // Renderização condicional: lista vazia
          ListEmptyComponent={
            <View style={styles.vazio}>
              <Text style={styles.vazioIcone}>📋</Text>
              <Text style={styles.vazioTexto}>Nenhuma consulta encontrada</Text>
              <Text style={styles.vazioSub}>Tente outro filtro</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
    gap: 12,
  },
  loadingTexto: {
    fontSize: 15,
    color: "#546E7A",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#1565C0",
  },
  header: {
    backgroundColor: "#1565C0",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  subtitulo: {
    fontSize: 13,
    color: "#90CAF9",
    marginTop: 2,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingTop: 20,
  },
  resumo: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  resumoItem: {
    flex: 1,
    alignItems: "center",
  },
  resumoNum: {
    fontSize: 24,
    fontWeight: "800",
  },
  resumoLabel: {
    fontSize: 11,
    color: "#90A4AE",
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
    paddingBottom: 24,
  },
  vazio: {
    alignItems: "center",
    paddingVertical: 50,
  },
  vazioIcone: {
    fontSize: 40,
    marginBottom: 8,
  },
  vazioTexto: {
    fontSize: 16,
    fontWeight: "600",
    color: "#90A4AE",
  },
  vazioSub: {
    fontSize: 13,
    color: "#B0BEC5",
    marginTop: 4,
  },
});
