import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
    minlength: [3, 'O nome deve ter no mínimo 3 caracteres']
  },
  email: {
    type: String,
    required: [true, 'E-mail é obrigatório'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [ validator.isEmail, 'E-mail inválido' ]
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    select: false
  }
}, {
  timestamps: true
});

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model('User', userSchema);

export default User;
