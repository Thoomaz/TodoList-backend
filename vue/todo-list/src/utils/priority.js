export const priorityLabels = {
  0: "🟢 Baixa",
  1: "🟡 Média",
  2: "🔴 Alta",
};

export function formatPriority(value) {
  return priorityLabels[value] || "Desconhecida";
}
