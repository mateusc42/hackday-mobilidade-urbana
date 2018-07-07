var mongoose = require("mongoose");

var veiculoSchema = new mongoose.Schema({
  idCarro: String,
  lat: String,
  long: String,
  time: String
});

module.exports = mongoose.model("Veiculo", veiculoSchema);