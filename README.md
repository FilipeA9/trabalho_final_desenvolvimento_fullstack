# 🦷 OdontoSystem — Sistema de Gestão Odontológica

Sistema web fullstack para gerenciamento de uma clínica odontológica, desenvolvido como trabalho final da disciplina de **Desenvolvimento Fullstack (TIS1)**.

O sistema permite o cadastro de pacientes e dentistas, agendamento de consultas com validação de conflitos de horário, registro de procedimentos e consulta de prontuários.

Alunos:

* Matrícula: 202203500, Nome: Amanda Almeida dos Santos
* Matrícula: 202203506, Nome: Fabrício Silva Dias
* Matrícula: 202203508, Nome: Filipe Augusto Lima Silva
* Matrícula: 202203509, Nome: Guilherme Luis Andrade Borges
* Matrícula: 202203512, Nome: Isabela de Queiroz Rodrigues



---

## 📋 Índice

- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Rodar o Projeto](#-como-rodar-o-projeto)
- [Rotas do Frontend (UI)](#-rotas-do-frontend-ui)
- [Endpoints da API (Backend)](#-endpoints-da-api-backend)
- [Documentação da API (Swagger)](#-documentação-da-api-swagger)

---

## 🛠 Tecnologias Utilizadas

| Camada     | Tecnologia                          | Versão    |
|------------|-------------------------------------|-----------|
| Backend    | Java                                | 21        |
| Backend    | Spring Boot                         | 4.1.0     |
| Backend    | Spring Data JPA / Hibernate         | 7.4.1     |
| Backend    | Lombok                              | —         |
| Backend    | SpringDoc OpenAPI (Swagger)         | 3.0.3     |
| Frontend   | Angular                             | 19        |
| Frontend   | Angular Material                    | 19        |
| Banco      | PostgreSQL                          | 16        |
| Infra      | Docker / Docker Compose             | —         |

---

## ✅ Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

| Ferramenta          | Versão Mínima | Download                                                              |
|---------------------|---------------|-----------------------------------------------------------------------|
| **Java JDK**        | 21+           | [Oracle JDK](https://www.oracle.com/java/technologies/downloads/)     |
| **Node.js**         | 22+           | [Node.js](https://nodejs.org/)                                        |
| **npm**             | 10+           | (incluso com Node.js)                                                 |
| **Docker Desktop**  | 4.x           | [Docker Desktop](https://www.docker.com/products/docker-desktop/)     |

> **Nota:** O Maven Wrapper (`mvnw`) já está incluído no projeto, não é necessário instalar o Maven separadamente.

---

## 📁 Estrutura do Projeto

```
Trabalho final dev fullstack/
├── backend/                    # API REST (Spring Boot + Java 21)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/odontologico/backend/
│   │   │   │   ├── controller/     # Controllers REST
│   │   │   │   ├── dto/            # Data Transfer Objects
│   │   │   │   ├── exception/      # Tratamento de exceções
│   │   │   │   ├── model/          # Entidades JPA
│   │   │   │   ├── repository/     # Interfaces Spring Data
│   │   │   │   └── service/        # Regras de negócio
│   │   │   └── resources/
│   │   │       └── application.yml # Configurações do backend
│   │   └── test/                   # Testes unitários
│   ├── mvnw / mvnw.cmd            # Maven Wrapper
│   └── pom.xml                     # Dependências Maven
│
├── frontend/                   # SPA (Angular 19 + Material)
│   ├── src/app/
│   │   ├── core/
│   │   │   ├── models/            # Interfaces TypeScript
│   │   │   └── services/          # Services HTTP
│   │   ├── features/
│   │   │   ├── dashboard/         # Tela inicial
│   │   │   ├── pacientes/         # CRUD de Pacientes
│   │   │   ├── dentistas/         # CRUD de Dentistas
│   │   │   ├── consultas/         # Agendamento de Consultas
│   │   │   └── prontuario/        # Prontuário
│   │   └── shared/layout/         # Navbar e Sidebar
│   └── package.json
│
├── documentos/                 # Documentação do projeto (requisitos, DER, UML)
└── docker-compose.yml          # PostgreSQL via Docker
```

---

## 🚀 Como Rodar o Projeto

### 1. Subir o Banco de Dados (PostgreSQL via Docker)

Na raiz do projeto, execute:

```bash
docker-compose up -d
```

Isso irá criar e iniciar um container PostgreSQL com as seguintes credenciais:

| Parâmetro | Valor            |
|-----------|------------------|
| Host      | `localhost`      |
| Porta     | `5433`           |
| Database  | `odontologico`   |
| Usuário   | `admin`          |
| Senha     | `adminpassword`  |

> O banco será criado automaticamente. As tabelas são geradas pelo Hibernate na primeira execução do backend (`ddl-auto: update`).

---

### 2. Rodar o Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

> No Windows, use `mvnw.cmd spring-boot:run` caso o comando acima não funcione.

O backend estará disponível em: **http://localhost:8081**

---

### 3. Rodar o Frontend (Angular)

Em outro terminal:

```bash
cd frontend
npm install       # apenas na primeira vez
npm start
```

O frontend estará disponível em: **http://localhost:4200**

---

## 🖥 Rotas do Frontend (UI)

Acesse no navegador a partir de `http://localhost:4200`:

| Rota                         | Descrição                              |
|------------------------------|----------------------------------------|
| `/dashboard`                 | Painel inicial com atalhos             |
| `/pacientes`                 | Listagem de pacientes cadastrados      |
| `/pacientes/novo`            | Formulário para cadastrar paciente     |
| `/pacientes/editar/:id`      | Formulário para editar paciente        |
| `/dentistas`                 | Listagem de dentistas cadastrados      |
| `/dentistas/novo`            | Formulário para cadastrar dentista     |
| `/dentistas/editar/:id`      | Formulário para editar dentista        |
| `/consultas`                 | Listagem de consultas agendadas        |
| `/consultas/novo`            | Formulário para agendar nova consulta  |
| `/prontuario`                | Visualização de prontuários            |

---

## 🔌 Endpoints da API (Backend)

Base URL: `http://localhost:8081/api`

### Pacientes (`/api/pacientes`)

| Método   | Endpoint              | Descrição                   |
|----------|-----------------------|-----------------------------|
| `GET`    | `/api/pacientes`      | Listar todos os pacientes   |
| `GET`    | `/api/pacientes/{id}` | Buscar paciente por ID      |
| `POST`   | `/api/pacientes`      | Cadastrar novo paciente     |
| `PUT`    | `/api/pacientes/{id}` | Atualizar paciente          |
| `DELETE` | `/api/pacientes/{id}` | Excluir paciente            |

### Dentistas (`/api/dentistas`)

| Método   | Endpoint              | Descrição                   |
|----------|-----------------------|-----------------------------|
| `GET`    | `/api/dentistas`      | Listar todos os dentistas   |
| `GET`    | `/api/dentistas/{id}` | Buscar dentista por ID      |
| `POST`   | `/api/dentistas`      | Cadastrar novo dentista     |
| `PUT`    | `/api/dentistas/{id}` | Atualizar dentista          |
| `DELETE` | `/api/dentistas/{id}` | Excluir dentista            |

### Consultas (`/api/consultas`)

| Método   | Endpoint                       | Descrição                        |
|----------|--------------------------------|----------------------------------|
| `GET`    | `/api/consultas`               | Listar todas as consultas        |
| `GET`    | `/api/consultas/{id}`          | Buscar consulta por ID           |
| `POST`   | `/api/consultas`               | Agendar nova consulta            |
| `PATCH`  | `/api/consultas/{id}/status`   | Atualizar status (query param)   |

### Procedimentos (`/api/procedimentos`)

| Método   | Endpoint                    | Descrição                       |
|----------|-----------------------------|---------------------------------|
| `GET`    | `/api/procedimentos`        | Listar todos os procedimentos   |
| `GET`    | `/api/procedimentos/{id}`   | Buscar procedimento por ID      |
| `POST`   | `/api/procedimentos`        | Cadastrar novo procedimento     |
| `PUT`    | `/api/procedimentos/{id}`   | Atualizar procedimento          |
| `DELETE` | `/api/procedimentos/{id}`   | Excluir procedimento            |

---

## 📖 Documentação da API (Swagger)

Com o backend rodando, acesse a documentação interativa gerada automaticamente pelo **SpringDoc/Swagger UI**:

| Recurso                  | URL                                              |
|--------------------------|--------------------------------------------------|
| **Swagger UI**           | http://localhost:8081/swagger-ui/index.html       |
| **OpenAPI JSON**         | http://localhost:8081/v3/api-docs                 |

No Swagger UI você pode visualizar todos os endpoints, seus parâmetros, e testá-los diretamente pelo navegador clicando em **"Try it out"**.

---

## 📄 Documentação do Projeto

Os documentos de requisitos, diagramas DER e UML estão localizados na pasta `documentos/`:

```
documentos/
├── Documentação de Software - Sistema Odontológico TIS1 (1).md
└── Full Stack - TSI1.md
```

---

## 🧪 Testes

Para executar os testes unitários do backend:

```bash
cd backend
./mvnw clean test
```

Os testes incluem validação da regra de negócio **RF04** (conflito de horários de consultas para o mesmo dentista).

---

## 📌 Regras de Negócio Implementadas

- **RF01** — Cadastro de pacientes com CPF único
- **RF02** — Cadastro de dentistas com CRO único
- **RF03** — Agendamento de consultas vinculando paciente e dentista
- **RF04** — Validação de conflito de horário (um dentista não pode ter duas consultas no mesmo horário)
- **RF05** — Registro de procedimentos vinculados a consultas
- **RF06** — Atualização de status da consulta (AGENDADA → CONCLUÍDA / CANCELADA)
