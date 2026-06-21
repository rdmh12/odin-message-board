import { Client } from "pg";

const messages = [
  {
    content:
      "Morbi ut felis vel felis accumsan volutpat. Donec aliquam ut arcu nec tincidunt. Nam id diam sed libero porta lacinia ac quis purus. Ut in sollicitudin arcu. Aliquam laoreet, nibh ut euismod maximus, est erat dictum odio, bibendum euismod metus turpis sit amet libero. Quisque iaculis tincidunt posuere. Mauris pretium rhoncus arcu nec ultrices. Cras rutrum volutpat tortor, id aliquet neque molestie sit amet. Vestibulum vel mi vitae arcu ultrices convallis ut nec leo.",
    author: "User 1",
    created: new Date(),
  },
  {
    content:
      "Duis eget lectus massa. Nam dignissim nisi in maximus convallis. Vivamus quis lacinia ipsum, nec cursus dolor. Phasellus sagittis nisi lorem, sit amet iaculis odio tincidunt id. Proin nisi ipsum, dictum id elit sed, tristique suscipit tortor. Fusce sodales rutrum nibh id fermentum. Proin turpis sem, fringilla nec scelerisque sed, sodales vitae nisi.",
    author: "User 2",
    created: new Date(),
  },
];

const create = `
  create table if not exists messages (
    id      integer primary key generated always as identity,
    author  varchar(16) not null check (author <> ''),
    content text not null check (content <> ''),
    created timestamp not null
  );
`;

const insert =
  "insert into messages (author, content, created) values ($1, $2, $3)";

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE,
  });

  await client.connect();
  await client.query(create);
  await client.query(insert, [
    messages[0].author,
    messages[0].content,
    messages[0].created,
  ]);
  await client.query(insert, [
    messages[1].author,
    messages[1].content,
    messages[1].created,
  ]);

  await client.end();
}

main();
