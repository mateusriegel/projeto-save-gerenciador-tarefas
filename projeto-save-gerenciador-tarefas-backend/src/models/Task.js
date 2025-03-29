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
    required: [true, 'E-mail é obrigatório']
  },
  status: {
    type: String,
    enum: Object.values(TaskStatusEnum),
    default: TaskStatusEnum.PENDING
  }
}, {
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

export default Task;