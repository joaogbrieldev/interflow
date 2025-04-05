# :trophy: InterviewFlow - Sistema de Controle de Candidaturas

Bem-vindo ao **InterviewFlow**, uma plataforma completa para desenvolvedores gerenciarem suas candidaturas a vagas de emprego. Com InterviewFlow, você pode cadastrar empresas, criar e acompanhar candidaturas de forma intuitiva e eficiente.

---

## :rocket: Tecnologias Utilizadas

### Backend:

- [NestJS](https://nestjs.com/) - Framework robusto para Node.js
- [TypeORM](https://typeorm.io/) - ORM poderoso para manipulação do banco de dados
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional
- Autenticação JWT para segurança

### Frontend:

- [React](https://react.dev/) - Biblioteca moderna para interfaces reativas
- [Vite](https://vitejs.dev/) - Build rápido e otimizado
- [TailwindCSS](https://tailwindcss.com/) - Estilização ágil e eficiente
- Gerenciamento de estado com React Context ou Redux

---

## :pushpin: Funcionalidades

:white_check_mark: Cadastro e login de usuários (com autenticação JWT)
:white_check_mark: Cadastro de empresas
:white_check_mark: Criação e acompanhamento de candidaturas (Job Applications)
:white_check_mark: Atualização do status das candidaturas
:white_check_mark: Painel para visualizar todas as candidaturas e métricas

---

## :tools: Como Rodar o Projeto

### :wrench: Pré-requisitos

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) (opcional, mas recomendado)

### :small_blue_diamond: Backend

```bash
# Clone o repositório
git clone https://github.com/ProgramadoresSemPatria/hackaton-team2.git
cd hackaton-team2/backend

# Instale as dependências
npm install

# Configure o banco de dados (.env baseado no .env.example)
cp .env.example .env

# Rode as migrations
typeorm migration:run

# Inicie o servidor
docker-compose up  # ou npm run docker:start
```

### :small_blue_diamond: Frontend

```bash
cd ../frontend

# Instale as dependências
yarn

# Inicie o frontend
yarn dev
```

---

## :link: Endpoints Principais

### :house: Autenticação

- `POST /user` → Criar conta
- `POST /sign-in` → Fazer login

### :page_facing_up: Candidaturas

- `POST /job-applications` → Criar candidatura
- `GET /job-applications` → Listar candidaturas
- `PATCH /job-applications/:id` → Atualizar status

---

## :dart: Roadmap Futuro

- :pushpin: Integração com LinkedIn e GitHub
- :bar_chart: Dashboard com estatísticas das candidaturas
- :bell: Notificações sobre status das aplicações

---

## :handshake: Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

1. Faça um fork do projeto
2. Crie uma branch (`feature/nova-funcionalidade`)
3. Commit suas mudanças
4. Abra um PR :rocket:

---

## :scroll: Licença

Este projeto está sob a licença MIT. Sinta-se livre para utilizá-lo e contribuir!

---

:computer: Desenvolvido com :blue_heart: por [João Figueiredo, Michael, Caue, João Vitor](https://github.com/ProgramadoresSemPatria/hackaton-team2)
