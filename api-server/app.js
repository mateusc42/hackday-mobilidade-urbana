let express = require("express");
let mongoose = require("mongoose");
let bodyParser  = require("body-parser");
let app = express();

mongoose.connect("mongodb://admin:admin123@ds129821.mlab.com:29821/hackday-mobilidade-urbana", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));

var Veiculo = require("./models/veiculo");

app.set("view engine", "ejs");

app.post("/data", function(req, res){
    linha = req.body.key.split(",");
    Veiculo.create({idCarro: linha[0], lat: linha[6], long: linha[7], time: linha[3]}, function(err, veiculo){
        console.log("Veiculo adicionado");
    });
});

app.get("/stats", function(req, res){
    Veiculo.find(function(err, veiculos){
        res.render("map", {veiculos: veiculos});
    });
});

let port = 4000;
app.listen(port, function() {
    console.log(`Servidor rodando em http://localhost:${port}`)
})