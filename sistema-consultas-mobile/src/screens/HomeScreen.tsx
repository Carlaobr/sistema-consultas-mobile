import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Consulta, StatusConsulta } from "../types";
import { consultasSimuladas } from "../data/consultas";
import ConsultaCard from "../components/ConsultaCard";
import FiltroStatus from "../components/FiltroStatus";

type FiltroOption = StatusConsulta | "todas";

const HomeScreen: React.FC = () => {
  // Estado do filtro ativo
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroOption>("todas");

  // Estado para a lista de consultas (poderia receber de uma API)
  const [consultas] = useState<Consulta[]>(consultasSimuladas);

  // Filtragem reativa com base no filtro selecionado
  const consultasFiltradas: Consulta[] =
    filtroAtivo === "todas"
      ? consultas
      : consultas.filter((c) => c.status === filtroAtivo);

  // Renderização condicional — lista vazia
  const listaVazia: boolean = consultasFiltradas.length === 0;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Cabeçalho — título do sistema */}
      <View style={styles.header}>
        <Text style={styles.titulo}>🏥 Sistema de Consultas</Text>
        <Text style={styles.subtitulo}>
          {consultas.length} consulta{consultas.length !== 1 ? "s" : ""} no total
        </Text>
      </View>

      {/* Resumo rápido */}
      <View style={styles.resumo}>
        <View style={styles.resumoItem}>
          <Text style={styles.resumoNumero}>
            {consultas.filter((c) => c.status === "agendada").length}
          </Text>
          <Text style={styles.resumoLabel}>Agendadas</Text>
        </View>
        <View style={styles.resumoItem}>
          <Text style={[styles.resumoNumero, { color: "#15803D" }]}>
            {consultas.filter((c) => c.status === "confirmada").length}
          </Text>
          <Text style={styles.resumoLabel}>Confirmadas</Text>
        </View>
        <View style={styles.resumoItem}>
          <Text style={[styles.resumoNumero, { color: "#6D28D9" }]}>
            {consultas.filter((c) => c.status === "concluida").length}
          </Text>
          <Text style={styles.resumoLabel}>Concluídas</Text>
        </View>
        <View style={styles.resumoItem}>
          <Text style={[styles.resumoNumero, { color: "#BE123C" }]}>
            {consultas.filter((c) => c.status === "cancelada").length}
          </Text>
          <Text style={styles.resumoLabel}>Canceladas</Text>
        </View>
      </View>

      {/* Filtros de status */}
      <View style={styles.filtroWrapper}>
        <FiltroStatus
          filtroAtivo={filtroAtivo}
          onFiltroChange={setFiltroAtivo}
        />
      </View>

      {/* Renderização condicional — lista ou estado vazio */}
      {listaVazia ? (
        <View style={styles.vazio}>
          <Text style={styles.vazioIcone}>📋</Text>
          <Text style={styles.vazioTexto}>
            Nenhuma consulta encontrada para este filtro.
          </Text>
        </View>
      ) : (
        <FlatList
          data={consultasFiltradas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ConsultaCard consulta={item} />}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 2,
  },
  subtitulo: {
    fontSize: 14,
    color: "#64748B",
  },
  resumo: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: 2,
  },
  resumoItem: {
    alignItems: "center",
  },
  resumoNumero: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1D4ED8",
  },
  resumoLabel: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 2,
  },
  filtroWrapper: {
    paddingHorizontal: 16,
  },
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  vazio: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
  },
  vazioIcone: {
    fontSize: 48,
    marginBottom: 12,
  },
  vazioTexto: {
    fontSize: 15,
    color: "#94A3B8",
    textAlign: "center",
  },
});

export default HomeScreen;
