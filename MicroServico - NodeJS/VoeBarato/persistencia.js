
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'voebarato',
    password: 'ewq321#@!',
    database: 'voebarato'
});

var dados = "dadosVazio";

connection.connect();

exports.consultadados = function () {


    connection.beginTransaction(function (err) {
        connection.query('SELECT dat_inicio, dat_fim, aeroporto_origem, aeroporto_destino from tb_configuracao', function (err, rows, fields) {


            //if (!err) {
            //console.log(rows);
            //var qtdLinhas = rows.length;
            //for (var i =0 ; i < qtdLinhas; i++) {
            //console.log('Aeroporto Origem: ',  rows[0].aeroporto_origem);
            //console.log('Aeroporto Destino: ', rows[0].aeroporto_destino);
            //console.log('Data Ida: ',          rows[0].dat_inicio);
            console.log('Data Volta: ', rows[0].dat_fim);

            dados = rows[0].aeroporto_origem + ';' + rows[0].aeroporto_destino + ';' + rows[0].dat_inicio + ';' + rows[0].dat_fim;

            var fs = require('fs');
            fs.writeFile("./config.txt", dados , function (err) {
                if (err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });
        });
    });
};

exports.salvaDadosDia = function (dadosDia, indice) {

    var query = 'INSERT INTO tb_voo_dia (des_empresa, menorPreco, origem, destino, aeroportoOrigem, aeroportoDestino, dataIda) VALUES ("' + dadosDia.des_empresa + '","' + dadosDia.menorPreco + '","' + dadosDia.origem + '","' + dadosDia.destino + '","' + dadosDia.aeroportoOrigem + '", "' + dadosDia.aeroportoDestino + '", "' + dadosDia.dataIda + '")';
    connection.query(query, function (err, res) {

        if (err) {
            console.log("erro: " + err);
            throw err;
        }
        console.log('O ultimo Id inserido:', res.insertId);
    });
};
