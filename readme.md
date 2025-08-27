
---

# Leilão Fácil - API Backend 🏡

![Badge](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js)
![Badge](https://img.shields.io/badge/Express-5.1.0-blue?logo=express)
![Badge](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Badge](https://img.shields.io/badge/MongoDB-6.x-47A248?logo=mongodb)
![Badge](https://img.shields.io/badge/JWT-Auth-yellow?logo=jsonwebtokens)

Projeto acadêmico da **FATEC Zona Leste** em parceria com uma empresa imobiliária.

---

## 📌 Descrição

Este repositório contém o código-fonte do **backend** do projeto **Leilão Fácil - Buscador de Imóveis**.  
A API foi desenvolvida em Node.js com Express e TypeScript, conectando-se a um banco de dados MongoDB.  
Ela fornece endpoints REST para autenticação, cadastro de usuários, gerenciamento de imóveis e sistema de favoritos.

---

## 🚀 Funcionalidades

- **Autenticação JWT:** Login seguro e rotas protegidas.
- **Cadastro e gerenciamento de usuários:** Incluindo permissões de administrador.
- **Cadastro e listagem de imóveis:** Integração com web scraping de bancos parceiros.
- **Sistema de favoritos:** Usuários podem adicionar e remover imóveis favoritos.
- **Permissões:** Apenas administradores podem cadastrar novos usuários.

---

## 📚 Tecnologias Utilizadas

- **Framework:** Express
- **Linguagem:** TypeScript
- **Banco de Dados:** MongoDB
- **Autenticação:** JWT (JSON Web Token)
- **Validação e Hash de Senha:** bcrypt

---

## 🔗 Rotas Principais

### Imóveis

- `GET /imoveis`  
  Lista todos os imóveis cadastrados.  
  **Acesso:** Público

- `GET /imoveis/favoritos`  
  Lista os imóveis favoritos do usuário autenticado.  
  **Acesso:** Requer autenticação (JWT)

### Usuário

- `POST /usuario`  
  Cadastra um novo usuário.  
  **Acesso:** Requer autenticação e permissão de administrador (JWT + admin)

- `POST /usuario/login`  
  Realiza login e retorna um token JWT.  
  **Acesso:** Público

- `PATCH /usuario`  
  Atualiza dados do usuário.  
  **Acesso:** Público (recomenda-se proteger)

- `PATCH /usuario/favoritos`  
  Adiciona um imóvel aos favoritos do usuário autenticado.  
  **Acesso:** Requer autenticação (JWT)  
  **Body:**  
  ```json
  { "imovelId": "ID_DO_IMOVEL" }
  ```

- `PATCH /usuario/favoritos/remover`  
  Remove um imóvel dos favoritos do usuário autenticado.  
  **Acesso:** Requer autenticação (JWT)  
  **Body:**  
  ```json
  { "imovelId": "ID_DO_IMOVEL" }
  ```

---

## 🔒 Autenticação

- As rotas protegidas exigem o envio do token JWT no header:  
  ```
  Authorization: Bearer SEU_TOKEN_AQUI
  ```
- Apenas administradores podem cadastrar novos usuários.

---

## 🏫 Sobre o Projeto

Este projeto é parte de um trabalho acadêmico da FATEC Zona Leste, em parceria com uma empresa do ramo imobiliário. O objetivo é aplicar conhecimentos técnicos em um contexto real, resolvendo uma dor do mercado.

---