/**
 * List handler for reservation resources
 */
const resService = require("./reservations.service");
const asyncErrorBoundary= require("../errors/asyncErrorBoundary")
const hasProperties = require("../errors/hasProperties")
//MIDDLEWARE//




async function list(req, res) {
  const data = await resService.list();
  res.json({ data });
}

async function create(req, res) {
  console.log(req.body.data);
  const data = await resService.create(req.body.data);
  
  res.status(201).json({ data });
}

module.exports = {
  list,
  create: asyncErrorBoundary(create),
};
