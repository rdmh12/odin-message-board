import { Client } from "pg";

const sql = `
  create table if not exists messages (
    id      integer primary key generated always as identity,
    author  varchar(16) not null check (author <> ''),
    content text not null check (content <> ''),
    created timestamp not null
  );
`;

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE,
  });

  await client.connect();
  await client.query(sql);
  await client.end();
}

main();
