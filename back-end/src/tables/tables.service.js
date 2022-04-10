const knex = require("../db/connection");
function create(table) {
  knex("tables")
    .insert(table)
    .returning("*")
    .then((createRecords) => createRecords[0]);
}
function list() {
  knex("tables").select("*");
}
function read(tables_id) {
  knex("tables").select("*").where({ tables_id: tables_id });
}

module.exports = { create, list, read };
