import pool from "./pool.js";

export async function getAll() {
  const { rows } = await pool.query(
    "select * from messages order by created desc",
  );
  return rows;
}

export async function getOne(id) {
  const { rows } = await pool.query("select * from messages where id = $1", [
    id,
  ]);
  return rows;
}

export async function insert(author, content, created) {
  await pool.query(
    "insert into messages(author, content, created) values ($1, $2, $3)",
    [author, content, created],
  );
}
