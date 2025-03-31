import React, { useState, useEffect } from "react";
import { getTasksByDate, createTask, deleteTask } from "../services/taskService";
import { Task } from "../models/Task";

const Tasks: React.FC = () => {
  // Data selecionada; por padrão, a data atual
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksList = await getTasksByDate(date);
        setTasks(tasksList);
      } catch (error) {
        console.error("Erro ao buscar tarefas", error);
      }
    };
  
    fetchTasks();
  }, [date]);
  

  // Adiciona uma nova tarefa
  const handleAddTask = async () => {
    if (!newTaskDescription.trim()) return;
    try {
      const task = await createTask(newTaskDescription, date);
      setTasks((prev) => [...prev, task]);
      setNewTaskDescription("");
    } catch (error) {
      console.error("Erro ao criar tarefa", error);
    }
  };

  // Remove uma tarefa
  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Erro ao deletar tarefa", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Minhas Tarefas</h1>
      
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Selecione a data:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Adicionar nova tarefa</h2>
        <div className="flex">
          <input
            type="text"
            placeholder="Descrição da tarefa"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            className="flex-1 border p-2 rounded-l"
          />
          <button
            onClick={handleAddTask}
            className="bg-green-500 text-white p-2 rounded-r"
          >
            Adicionar
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">
          Tarefas para {date}
        </h2>
        {tasks.length === 0 ? (
          <p>Nenhuma tarefa encontrada para essa data.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li
                key={task._id}
                className="border p-2 rounded mb-2 flex justify-between items-center"
              >
                <span>{task.description}</span>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Tasks;
