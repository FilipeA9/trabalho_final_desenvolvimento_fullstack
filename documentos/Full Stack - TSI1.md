Universidade Federal de Goiás   
Instituto de Informática   
Prof. Dirson Santos de Campos 

**Desenvolvimento Full Stack**   
**Trabalho Incremental de Software 1 (TIS1)**

| Matrícula: 202203500 | Nome: Amanda Almeida dos Santos |
| :---- | :---- |
| **Matrícula:** 202203506 | **Nome:** Fabrício Silva Dias |
| **Matrícula:** 202203508 | **Nome:** Filipe Augusto Lima Silva |
| **Matrícula:** 202203509 | **Nome:** Guilherme Luis Andrade Borges |
| **Matrícula:** 202203512 | **Nome:** Isabela de Queiroz Rodrigues |

# **Passo 1: Definição da microaplicação**

A microaplicação a ser desenvolvida consistirá em um sistema de gerenciamento de consultas para uma clínica odontológica, com o objetivo de organizar e controlar os principais fluxos de atendimento da clínica.  
O sistema permitirá o cadastro e gerenciamento das seguintes entidades principais:

- Pacientes  
- Dentistas  
- Consultas  
- Procedimentos odontológicos

A aplicação possibilitará funcionalidades como agendamento de consultas, associação de pacientes e dentistas, registro de procedimentos realizados e acompanhamento do histórico de atendimentos.  
A modelagem de dados contará com, no mínimo, quatro tabelas principais (Paciente, Dentista, Consulta e Procedimento), sendo implementadas operações completas de CRUD para cada uma delas, atendendo aos requisitos de complexidade estabelecidos.  
O desenvolvimento será realizado do zero, sem reutilização direta de código-fonte de terceiros, utilizando apenas documentação oficial e materiais de apoio das tecnologias adotadas.

# **Passo 2: Forma de documentação do sistema**

A documentação do sistema será realizada de forma estruturada, utilizando diferentes artefatos para representar tanto a visão estática quanto dinâmica da aplicação. Serão utilizados:

- Diagrama Entidade-Relacionamento (DER), para modelagem do banco de dados  
- Diagrama de Classes, para representar a estrutura do sistema orientado a objetos  
- Diagrama de Casos de Uso, para descrever as interações entre usuários e o sistema  
- Diagrama de Sequência, para ilustrar o fluxo de execução das principais funcionalidades  
- Protótipos de interface desenvolvidos no Figma, para representar a experiência do usuário  
- Descrição textual dos requisitos funcionais e não funcionais

Essa abordagem foi escolhida por proporcionar uma visão completa e organizada do sistema.

# **Passo 3: Framework Web**

Será utilizado o framework Spring Boot no backend, devido à sua ampla adoção no mercado, facilidade de configuração e forte integração com APIs REST, persistência de dados e testes automatizados.  
No frontend, será utilizado o framework Angular, permitindo a construção de uma interface moderna, reativa e desacoplada do backend, seguindo o padrão de arquitetura de aplicações full stack.

# **Passo 4: Linguagem de programação**

A linguagem principal do backend será Java, em conjunto com o framework Spring Boot. Para o frontend, será utilizado TypeScript com Angular. A manipulação de dados será realizada utilizando SQL, considerando o uso de banco de dados relacional.

# **Passo 5: Banco de dados e mapeamento objeto-relacional**

Será utilizado o banco de dados relacional PostgreSQL, por sua robustez, conformidade com padrões SQL e ampla utilização no mercado.  
Para o mapeamento objeto-relacional, será adotado o Hibernate, integrado ao Spring Data JPA, permitindo a conversão entre entidades Java e tabelas do banco de dados, além de facilitar a implementação das operações CRUD.

# 

# **Passo 6: Estratégia de testes**

A validação do sistema será realizada por meio de uma abordagem híbrida, combinando testes manuais e testes automatizados.  
Os testes automatizados no backend serão implementados utilizando:

- JUnit para testes unitários  
- Mockito para simulação de dependências  
- MockMvc para testes de controllers e endpoints REST

Os testes manuais serão utilizados para validação da interface do usuário, fluxos de navegação e integração entre frontend e backend.

# **Conclusão**

A arquitetura proposta combina tecnologias modernas e amplamente utilizadas no mercado, como Spring Boot, Angular e PostgreSQL, além de boas práticas de modelagem, documentação e testes. Essa abordagem permite o desenvolvimento de uma aplicação organizada, escalável e alinhada com padrões profissionais de desenvolvimento de software.  
