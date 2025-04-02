import { useEffect, useState } from "react";
import { getTasksByDate, update, updateStatus, deleteTask, create } from "../services/taskService";
import { Task } from "../models/Task";

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);

  useEffect(() => {
    if (date) {
      getTasksByDate(date).then(setTasks);
    }
  }, [date]);

  const handleEdit = (id: string, field: string, value: string) => {
    setTasks(tasks.map(task => task._id === id ? { ...task, [field]: value } : task));
  };

  const handleSave = async (task: Task) => {
    await update(task._id, { description: task.description, date: task.date });
    setEditingTaskId(null);
    getTasksByDate(date).then(setTasks)
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateStatus(id, newStatus);
    getTasksByDate(date).then(setTasks)
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    getTasksByDate(date).then(setTasks)
  };

  const handleCreateTask = async () => {
    const newTask = {
      description: newTaskDescription,
      date: date,
    };

    const createdTask = await create(newTask); // Adicionando a nova tarefa ao banco
    setTasks([...tasks, createdTask]); // Atualizando a lista de tarefas com a nova tarefa
    setIsCreating(false); // Fechando o formulário de criação de tarefa
    setNewTaskDescription(""); // Limpando o campo de descrição
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendente":
        return "bg-yellow-500";
      case "Em andamento":
        return "bg-blue-500";
      case "Finalizada":
        return "bg-green-500";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Gerenciador de Tarefas</h1>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded p-2 w-full mb-4"
      />
      
      {/* Botão de Criar Tarefa */}
      {!isCreating && (
        <button
          onClick={() => setIsCreating(true)}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Criar Nova Tarefa
        </button>
      )}

      {/* Formulário para criar tarefa, visível quando isCreating é true */}
      {isCreating && (
        <div className="mb-4">
          <input
            type="text"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Descrição da tarefa"
            className="border rounded p-2 w-full mb-2"
          />
          <button
            onClick={handleCreateTask}
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Salvar Tarefa
          </button>
        </div>
      )}

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task._id} className={`border p-2 flex justify-between items-center rounded shadow ${getStatusColor(task.status)}`}>
            <div className="flex flex-col w-full">
              {editingTaskId === task._id ? (
                <input
                  type="text"
                  value={task.description}
                  onChange={(e) => handleEdit(task._id, "description", e.target.value)}
                  className="border rounded p-1 w-full mb-1"
                />
              ) : (
                <span>{task.description}</span>
              )}
              {editingTaskId === task._id ? (
                <input
                  type="date"
                  value={task.date.split("T")[0]}
                  onChange={(e) => handleEdit(task._id, "date", e.target.value)}
                  className="border rounded p-1 w-full"
                />
              ) : (
                <span>{new Date(task.date).toISOString().split("T")[0].split("-").reverse().join("/")}</span>
              )}
            </div>
            <div>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task._id, e.target.value)}
                className="border rounded p-1 mr-2"
              >
                <option value="Pendente">Pendente</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Finalizada">Finalizada</option>
              </select>
              {editingTaskId === task._id ? (
                <button onClick={() => handleSave(task)} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Salvar</button>
              ) : (
                <button onClick={() => setEditingTaskId(task._id)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Editar</button>
              )}
              <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white px-2 py-1 rounded">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
