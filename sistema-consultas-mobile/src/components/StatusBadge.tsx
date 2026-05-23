import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusConsulta } from "../types";

interface StatusBadgeProps {
  status: StatusConsulta;
}

const CONFIG: Record<StatusConsulta, { label: string; bg: string; text: string }> = {
  agendada:  { label: "Agendada",   bg: "#EFF6FF", text: "#1D4ED8" },
  confirmada:{ label: "Confirmada", bg: "#F0FDF4", text: "#15803D" },
  cancelada: { label: "Cancelada",  bg: "#FFF1F2", text: "#BE123C" },
  concluida: { label: "Concluída",  bg: "#F5F3FF", text: "#6D28D9" },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { label, bg, text } = CONFIG[status];
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.label, { color: text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
});

export default StatusBadge;
