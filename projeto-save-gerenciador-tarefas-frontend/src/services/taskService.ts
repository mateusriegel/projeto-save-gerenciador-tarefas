import { api } from "../api/api";
import { Task, CrudTask } from "../models/Task";

const taskUrl='/task'

export const getTasksByDate = async (date: string): Promise<Task[]> => {
  const response = await api.get<Task[]>(`${taskUrl}?date=${date}`);
  return response.data;
};

export const create = async (resource: CrudTask): Promise<Task> => {
  const response = await api.post<Task>(`${taskUrl}`, resource);

  return response.data;
};

export const update = async (id: string, resource: CrudTask): Promise<Task> => {
  const response = await api.put<Task>(`${taskUrl}/${id}`, resource);
  return response.data;
};

export const updateStatus = async (id: string, status: string): Promise<Task> => {
  const response = await api.put<Task>(`${taskUrl}/${id}/status`, { status });
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`${taskUrl}/${id}`);
};
