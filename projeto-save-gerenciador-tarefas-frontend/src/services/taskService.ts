import { api } from "../api/api";
import { Task } from "../models/Task";

// Busca tarefas por data
export const getTasksByDate = async (date: string): Promise<Task[]> => {
  const response = await api.get<Task[]>(`/tasks?date=${date}`);
  return response.data;
};

// Cria uma nova tarefa
export const createTask = async (description: string, date: string): Promise<Task> => {
  const response = await api.post<Task>("/tasks", { description, date });
  return response.data;
};

// Atualiza uma tarefa (opcional - se for implementar edição)
export const updateTask = async (id: string, description: string): Promise<Task> => {
  const response = await api.put<Task>(`/tasks/${id}`, { description });
  return response.data;
};

// Exclui uma tarefa
export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
