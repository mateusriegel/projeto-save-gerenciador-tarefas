export interface Task {
    _id: string;
    description: string;
    date: string; // Formato: YYYY-MM-DD
    status: string; // Ex: "Pendente", "Em andamento", "Finalizada"
  }