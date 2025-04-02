import { useEffect, useState } from "react";
import { getTasksByDate, update, updateStatus, deleteTask, create } from "../services/taskService";
import { Task } from "../models/Task";
import { useNavigate } from "react-router-dom";

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const navigate = useNavigate();

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
    getTasksByDate(date).then(setTasks);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateStatus(id, newStatus);
    getTasksByDate(date).then(setTasks);
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    getTasksByDate(date).then(setTasks);
  };

  const handleCreateTask = async () => {
    const newTask = {
      description: newTaskDescription,
      date: date,
    };

    await create(newTask);
    setIsCreating(false);
    setNewTaskDescription("");
    getTasksByDate(date).then(setTasks);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleUpdatePassword = () => {
    navigate("/password");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendente": return "bg-yellow-500";
      case "Em andamento": return "bg-blue-500";
      case "Finalizada": return "bg-green-500";
      default: return "";
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gerenciador de Tarefas</h1>
        <button onClick={handleUpdatePassword} className="bg-blue-500 text-white px-2 py-1 rounded">Alterar Senha</button>
        <button onClick={handleLogout} className="bg-red-500 text-white px-2 py-1 rounded">Sair</button>
      </div>
      
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded p-2 w-full mb-4"
      />
      
      {!isCreating && (
        <button onClick={() => setIsCreating(true)} className="bg-green-500 text-white px-4 py-2 rounded mb-4 w-full">
          Criar Nova Tarefa
        </button>
      )}

      {isCreating && (
        <div className="mb-4">
          <input
            type="text"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Descrição da tarefa"
            className="border rounded p-2 w-full mb-2"
          />
          <button onClick={handleCreateTask} className="bg-green-500 text-white px-4 py-2 rounded w-full">
            Salvar Tarefa
          </button>
        </div>
      )}

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task._id} className={`border p-2 flex justify-between items-center rounded shadow ${getStatusColor(task.status)}`}>
            <div className="flex flex-col w-full mr-2">
              {editingTaskId === task._id ? (
                <input
                  type="text"
                  value={task.description}
                  onChange={(e) => handleEdit(task._id, "description", e.target.value)}
                  className="border rounded p-1 w-full mb-1"
                />
              ) : (
                <span className="text-white font-medium">{task.description}</span>
              )}
              {editingTaskId === task._id ? (
                <input
                  type="date"
                  value={task.date.split("T")[0]}
                  onChange={(e) => handleEdit(task._id, "date", e.target.value)}
                  className="border rounded p-1 w-full"
                />
              ) : (
                <span className="text-white">{new Date(task.date).toISOString().split("T")[0].split("-").reverse().join("/")}</span>
              )}
            </div>
            <div className="flex items-center">
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task._id, e.target.value)}
                className="border rounded p-1 mr-2"
              >
                <option className="text-black" value="Pendente">Pendente</option>
                <option className="text-black" value="Em andamento">Em andamento</option>
                <option className="text-black" value="Finalizada">Finalizada</option>
              </select>
              {editingTaskId === task._id ? (
                <button onClick={() => handleSave(task)} className="bg-green-500 text-white px-2 py-1 rounded border border-white mr-1">Salvar</button>
              ) : (
                <button onClick={() => setEditingTaskId(task._id)} className="bg-blue-500 text-white px-2 py-1 rounded border border-white mr-1">Editar</button>
              )}
              <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white px-2 py-1 rounded border border-white mr-1">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
