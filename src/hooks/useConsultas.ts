import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Consulta, StatusConsulta } from "../types";
import { consultasIniciais } from "../data/consultas";

// Chave padrão de persistência (conforme requisito do professor)
const STORAGE_KEY = "@consultas:consulta_atual";

interface UseConsultasReturn {
  consultas: Consulta[];
  carregando: boolean;
  confirmar: (id: number) => Promise<void>;
  cancelar: (id: number) => Promise<void>;
}

export function useConsultas(): UseConsultasReturn {
  // Estado principal da lista de consultas
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  // Estado de loading enquanto lê o AsyncStorage
  const [carregando, setCarregando] = useState<boolean>(true);

  // useEffect: carrega dados persistidos ao iniciar o app
  useEffect(() => {
    carregarDados();
  }, []);

  // Lê do AsyncStorage; se não existir, usa os dados iniciais
  async function carregarDados(): Promise<void> {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json !== null) {
        const dadosSalvos: Consulta[] = JSON.parse(json);
        setConsultas(dadosSalvos);
      } else {
        // Primeira vez: salva os dados iniciais e já usa
        setConsultas(consultasIniciais);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(consultasIniciais));
      }
    } catch (erro) {
      console.error("Erro ao carregar consultas:", erro);
      setConsultas(consultasIniciais);
    } finally {
      setCarregando(false);
    }
  }

  // Atualiza estado + persiste no AsyncStorage de uma vez
  async function salvarDados(novasConsultas: Consulta[]): Promise<void> {
    try {
      setConsultas(novasConsultas);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novasConsultas));
    } catch (erro) {
      console.error("Erro ao salvar consultas:", erro);
    }
  }

  // Altera status de uma consulta e persiste automaticamente
  async function alterarStatus(id: number, novoStatus: StatusConsulta): Promise<void> {
    const atualizadas = consultas.map((c) =>
      c.id === id ? { ...c, status: novoStatus } : c
    );
    await salvarDados(atualizadas);
  }

  // Confirmar consulta: Agendada/Pendente → Confirmada
  async function confirmar(id: number): Promise<void> {
    await alterarStatus(id, "Confirmada");
  }

  // Cancelar consulta: qualquer status → Cancelada
  async function cancelar(id: number): Promise<void> {
    await alterarStatus(id, "Cancelada");
  }

  return { consultas, carregando, confirmar, cancelar };
}
