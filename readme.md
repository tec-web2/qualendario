# Qualendario

## Descrição

**Qualendario** é uma plataforma de agendamento de quadras esportivas desenvolvida como parte da disciplina de **Tecnologias Web 2**. O projeto oferece uma solução completa para gerenciamento de reservas, integrando tecnologias de Front-End e Back-End. A plataforma foi desenvolvida em equipe, proporcionando uma experiência prática em levantamento de requisitos, desenvolvimento e ciclos de trabalho colaborativo.

Os usuários podem realizar agendamentos de quadras de maneira prática, utilizando funcionalidades como busca por CPF, e-mail, ou data específica. O sistema também envia e-mails de confirmação e lembretes automáticos para os usuários. A interface foi desenvolvida para oferecer uma experiência de uso simples e eficiente.

## Funcionalidades

### Funcionalidades Básicas

- **Busca por CPF e e-mail**: 
  - Permite a consulta rápida de agendamentos realizados por CPF ou e-mail. O backend utiliza o MongoDB para buscar e retornar as informações associadas ao usuário, que são exibidas no frontend.
  
- **Envio de e-mail de confirmação**: 
  - Após realizar um agendamento, o usuário recebe um e-mail automático com os detalhes da reserva (data, horário, quadra). O backend utiliza serviços de e-mail como NodeMailer ou SendGrid para essa automação.

- **Envio de e-mail agendado**: 
  - Sistema de lembrete automatizado que envia e-mails antes do horário reservado, utilizando bibliotecas como `node-cron` para agendar as mensagens.

### Funcionalidades Avançadas

- **Busca por dia**: 
  - Permite que o usuário encontre quadras disponíveis em uma data específica. O sistema realiza uma consulta no MongoDB e retorna as opções de quadras ainda disponíveis.

- **Adicionar/Excluir quadras**: 
  - Administradores podem gerenciar quadras esportivas, adicionando ou removendo quadras disponíveis no sistema.

- **Segurança**: 
  - Implementação de segurança utilizando **JWT** para autenticação de usuários, criptografia de dados sensíveis e armazenamento seguro de senhas utilizando hashing com `salt`.

## Arquitetura da Aplicação

A aplicação segue uma arquitetura em camadas, facilitando a modularidade e manutenção do sistema:

1. **Camada de Apresentação**:
   - Interface desenvolvida com **HTML5**, **Tailwind CSS**, **Next.js** e **TypeScript**. Segue os princípios SOLID, garantindo separação de responsabilidades.

2. **Camada de Negócios**:
   - Contém a lógica de negócios e regras de aplicação, implementada com **Node.js**. A camada segue os princípios SOLID para facilitar a expansão e manutenção do código.

3. **Camada de Persistência**:
   - Gerencia o armazenamento e recuperação de dados no banco **MongoDB Atlas**, utilizando abstrações e boas práticas para desacoplar a lógica de negócios das implementações de persistência.

## Tecnologias Utilizadas

- **HTML5**: Estrutura básica das páginas web, com suporte a recursos modernos.
- **Tailwind CSS**: Framework CSS para estilização eficiente e responsiva.
- **TypeScript**: Linguagem que adiciona tipagem estática ao JavaScript, trazendo maior segurança ao código.
- **Next.js**: Framework React para otimização do front-end, incluindo renderização no lado do servidor (SSR).
- **Node.js**: Executa o código JavaScript no lado do servidor, integrando o front-end com o banco de dados.
- **MongoDB Atlas**: Banco de dados NoSQL para gerenciamento flexível e seguro das informações de agendamento.

## Como Executar o Projeto

### Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

### Passo a Passo

1. **Clone o repositório:**

   Clone o repositório do GitHub para a sua máquina local.
   ```bash
   git clone https://github.com/seuusuario/qualendario.git
   ```

2. **Acesse o diretório do projeto:**
    
    Navegue até o diretório do projeto clonado.
    ```bash
    cd qualendario
    ```
3. **Instale as dependências:**
    
    Instale as dependências necessárias utilizando npm ou Yarn.
    - Com npm:
        ```bash
        npm install
        ```
    - Com Yarn:
        ```bash
        yarn install
        ```
4. Configure as variáveis de ambiente:
    Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:
    ```bash
    MONGODB_URI=<sua_conexao_mongodb>
    JWT_SECRET=<seu_segredo_jwt>
    EMAIL_SERVICE=<servico_de_email>
    EMAIL_USER=<seu_usuario_de_email>
    EMAIL_PASS=<sua_senha_de_email>
    ```
5. Inicie o servidor de desenvolvimento:
    Inicie o servidor localmente.
    - Com npm:
        ```bash
        npm run dev
        ```
    - Com Yarn:
        ```bash
        yarn dev
        ```
6. Acesse o projeto:
    O projeto estará rodando localmente em `http://localhost:3000`.

### Scripts Disponíveis
- `npm run dev` ou `yarn dev` — Inicia o servidor de desenvolvimento.
- `npm run build` ou `yarn build` — Faz o build do projeto para produção.
- `npm run start` ou `yarn start` — Inicia o servidor em ambiente de produção.