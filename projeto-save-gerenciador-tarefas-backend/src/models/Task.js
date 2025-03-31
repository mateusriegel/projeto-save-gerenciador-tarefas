import mongoose from 'mongoose';
import TaskStatusEnum from './TaskStatusEnum.js';

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Data é obrigatória']
  },
  status: {
    type: String,
    enum: Object.values(TaskStatusEnum),
    default: TaskStatusEnum.PENDING
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Tarefa deve estar associada a um usuário']
  }
}, {
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
