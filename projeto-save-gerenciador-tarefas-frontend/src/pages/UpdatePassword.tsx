import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../services/authService";
import { APIError } from "../api/api";

const UpdatePassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePassword(oldPassword, newPassword);
      
      localStorage.removeItem("token");

      navigate("/login");
    } catch(error) {
      const err = error as APIError;
      setError(err.response?.data?.message || "Erro ao alterar senha");
    }
  };

  const handleReturn = () => {
    navigate("/task");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-2xl font-bold mb-4">Alterar Senha</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Senha Atual"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="password"
          placeholder="Nova Senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 mb-4 rounded">
          Salvar
        </button>
        <button onClick={handleReturn} className="w-full bg-yellow-500 text-white p-2 rounded">
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
