Gerenciador de Tarefas

Este projeto é um sistema simples de gerenciamento de tarefas, permitindo criar, editar, excluir e alterar o status das tarefas.

Tecnologias Utilizadas

Backend:
- Node.js
- Express.js
- MongoDB (com Mongoose)

Frontend:
- React (Vite)
- TailwindCSS para estilização
---

Deploy

Backend
O backend está hospedado no Render, na seguinte URL: https://projeto-save-gerenciador-tarefas-backend.onrender.com


Frontend
O frontend está hospedado no Vercel e pode ser acessado em: https://projeto-save-gerenciador-tarefas-frontend.vercel.app/

---

Como Rodar o Projeto Localmente:

1. Clonar o Repositório
git clone https://github.com/mateusriegel/projeto-save-gerenciador-tarefas.git

2. Configuração do Backend
- Entre na pasta do backend:
   cd projeto-save-gerenciador-tarefas-backend

- Instale as dependências:
    npm install

- Crie um arquivo .env na raiz do backend e adicione:
    MONGO_URI=mongodb+srv://mateusriegel:ghWiltkv5hF9EWvI@projeto-save.deigcl4.mongodb.net/projeto-save?retryWrites=true&w=majority&appName=projeto-save
    JWT_SECRET=38df3dc44b1f0b1dcbf107460b60adf90dec3c5411f18da45f87dfeed8327749

4. Inicie o servidor:
   npm start

5. O backend estará rodando em: http://localhost:5000

3. Configuração do Frontend

1. Entre na pasta do frontend:
   cd projeto-save-gerenciador-tarefas-backend

2. Instale as dependências:
   npm install

4. Inicie o frontend:
   npm run dev

5. O frontend estará acessível em: http://localhost:5173

---

Endpoints
Autenticação
    POST /api/auth/register -> Criar usuário
    POST /api/auth/login -> Login e obter token
    POST /api/user/password -> Alterar Senha

Tarefas
    POST /api/task -> Criar nova tarefa
    PUT /api/task/:id -> Atualizar tarefa
    PATCH /api/task/:id/status -> Alterar status da tarefa
    DELETE /api/task/:id -> Excluir tarefa

---

Este projeto foi desenvolvido como parte de um desafio técnico. Qualquer dúvida, fico a disposição!

