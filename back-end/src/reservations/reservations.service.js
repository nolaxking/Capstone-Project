const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createRecords) => createRecords[0]);
}
function list() {
  return knex("reservations")
    .select("*")
}

function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
}

function update(reservation_id, updatedRes) {
  return knex("reservations")
    .where({ reservation_id: reservation_id })
    .update(updatedRes, "*");
}


module.exports = {
  create,
  list,
  read,
  update,
  
};