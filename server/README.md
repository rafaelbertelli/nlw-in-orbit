# Pocket-JS | Server

## Tecnologias usadas

- [Typescript](https://www.typescriptlang.org/)
- [Node 20](https://nodejs.org/pt)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Fastify](https://fastify.dev/)
- [Fastify Type Provider Zod](https://github.com/turkerdev/fastify-type-provider-zod)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview)

## Como rodar o servidor

```bash
npm run dev
```

> localhost:3333

## Como rodar o banco de dados

```bash
docker-compose up -d
```

> localhost:5432

## Banco de dados (PostgreSQL + Drizzle ORM)

```bash
npm run db:migration:generate # atualiza os arquivos de migration
npm run db:migration:execute  # executa os arquivos atualizando o db
npm run db:interface          # visualização do db no browser
npm run db:seed               # popula o db com dados iniciais (para facilitar o desenvolvimento, quando não se tem nada registrado // CUIDADO, pois se tiver algo já no banco, ele será deletado!)

```

## Dicas

### IDE

[Visual Studio Code](https://code.visualstudio.com/)

### Banco de dados online - Até 500mb grátis

[Neon](https://neon.tech/)

## Comandos gerais

```bash
docker-compose up -d        # sobe o container coder
docker ps -a                # todos os containers rodando
docker logs <CONTAINER ID>  # logs do container
```
