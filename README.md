# PORTAL-FINANCE-WS

## Instalando docker para usar o Postgres

```shell
docker run \
    --name postgres \
    -e POSTGRES_USER=douglasgmsantos \
    -e POSTGRES_PASSWORD=123456 \
    -e POSTGRES_DB=myfinanceapp \
    -p 5432:5432 \
    -d \
    postgres

docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer
```

## Instalando dependencias e criando tabelas com sequelize utilizando o yarn.

- Execute o comando `yarn add`, para adicionar **dependencias**.
- Execute o comando `yarn sequelize db:migrate`, para criação das tabelas.
- Execute o comando `yarn dev`, para rodar projeto.
