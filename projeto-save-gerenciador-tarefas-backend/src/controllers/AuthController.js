import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/UserDTO.js';

export const findAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error });
  }
};

export const create = async (req, res) => {
  try {
    const dto = new CreateUserDTO(req.body);

    const userExists = await User.findOne({ email: dto.email });
    if (userExists) {
      return res.status(400).json({ message: "Usuário já cadastrado!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const user = new User({ ...dto, password: hashedPassword });

    await user.save();

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const dto = new UpdateUserDTO(req.body);

    const updatedUser = await User.findByIdAndUpdate(id, { name: dto.name, email: dto.email }, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Dados inválidos.' });
    }

    const user = await User.findById(id).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha atual incorreta!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Senha atualizada com sucesso!' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar senha' });
  }
};
