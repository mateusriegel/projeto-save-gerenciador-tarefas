import Task from '../models/Task.js';
import TaskStatusEnum from '../models/TaskStatusEnum.js';
import { CrudTaskDTO } from '../dtos/TaskDTO.js';

export const findAll = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id, date: req.query.date });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefas', error });
  }
};

export const create = async (req, res) => {
  try {
    const dto = new CrudTaskDTO(req.body);

    const task = new Task({ 
      ...dto,
      user: req.user.id  
    });
    await task.save();
    
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.errors?.description?.message || "Erro ao criar tarefa" });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const dto = new CrudTaskDTO(req.body);

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id },
      dto,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.errors?.description?.message || "Erro ao atualizar tarefa" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!Object.values(TaskStatusEnum).includes(status)) {
      return res.status(400).json({ message: 'Status inválido' });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.errors?.description?.message || "Erro ao atualizar status da tarefa" });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
  
    const deletedTask = await Task.findOneAndDelete({ _id: id, user: req.user.id });
  
    if (!deletedTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
  
    res.status(200).json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.errors?.description?.message || "Erro ao deletar tarefa" });
  }
};

