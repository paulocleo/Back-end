var request = require('request-promise-native');
var cheerio = require('cheerio');
var URL = require('url-parse');
var fs = require('file-system');
var dateFormat = require('dateformat');
var datetime = require('node-datetime');
var banco = require('./persistencia.js');

var linkBuilded = "";

fs = require('fs')
fs.readFile('./config.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    //dateFormat(now, "isoDateTime")
    dataSplit = data.split(';');

    var origemBanco = dataSplit[0];
    var retornoBanco = dataSplit[1];
    var dataIda = dateFormat(dataSplit[2], "isoDateTime");
    dataIda = dataIda.substring(0, dataIda.length - 5);
    var dataVolta = dateFormat(dataSplit[3], "isoDateTime");
    dataVolta = dataVolta.substring(0, dataVolta.length - 5);
    console.log("" + origemBanco + "|" + retornoBanco + "|" + dataIda + "|" + dataVolta);
    executaIdaVolta(origemBanco, retornoBanco, dataIda, dataVolta);
});
//------------------------------- IDA ------------------------------- 
//searchDate(arrayDados[0], arrayDados[1], arrayDados[2],arrayDados[3]);
//searchDate('vix', 'gru', '2017-06-09T00:00:00', '2017-06-11T00:00:00');
//------------------------------- IDA + VOLTA ------------------------------- 
//linkBuilded = buildLinkRoundTrip(origem, destino, dataIda, dataVolta);
//getPriceRoundTrip(linkBuilded);

function executaIdaVolta(origem, destino, DateBegin, DateEnd) {

    searchDate(origem, destino, DateBegin, DateEnd);
    searchDate(destino, origem, DateBegin, DateEnd);
    //searchDate(destino, origem, DateEnd, DateBegin);
    //searchDate(destino, origem, DateEnd, DateBegin);
}

//Faz consulta por ano e mes: Resultado é a inserção dos dias mais baratos do de um mês.
function searchDate(origem, destino, DateBegin, DateEnd) {

    var dataTempIda = "";

    dayDepart = dateFormat(DateBegin, "dd"); // traz o dia - 1 Ex: dia 25 será 24 
    //dayDepart = dateFormat + 1;
    dayDepartNumber = parseInt(dayDepart);
    dayDepartNumber = dayDepartNumber + 1;
    if (dayDepartNumber < 10) {
        dayDepart = "0" + dayDepartNumber.toString();
    } else {
        dayDepart = dayDepartNumber.toString();
    }

    monthDepart = dateFormat(DateBegin, "mm"); // traz o mes - 1 Ex: dia 25 será 24
    yearDepart = dateFormat(DateBegin, "yyyy"); // traz o ano - 1 Ex: dia 25 será 24

    dayBack = dateFormat(DateEnd, "dd"); // traz o dia - 1 Ex: dia 25 será 24 
    //dayBack = dayBack + 1;
    monthBack = dateFormat(DateEnd, "mm"); // traz o mês - 1 Ex: dia 25 será 24 
    yearBack = dateFormat(DateEnd, "yyyy"); // traz o ano - 1 Ex: dia 25 será 24 

    console.log("" + dayDepart + "|" + monthDepart + "|" + yearDepart + "|" + dayBack + "|" + monthBack + "|" + yearBack);

    dataTempIda = yearDepart + "-" + monthDepart + "-" + dayDepart;
    dataTempVolta = yearBack + "-" + monthBack + "-" + dayBack;

    linkBuilded = buildLinkDepart(origem, destino, dataTempIda);

    //Executa busca de preço de ida
    getPriceDepart(linkBuilded);

    var dataTempIdaISO = addOneDay(dataTempIda);
    if (dataTempIda != dataTempVolta) {
        searchDate(origem, destino, dataTempIdaISO, DateEnd);
    }
}

function addOneDay(data) {
    var dtDepart = datetime.create(data + " 00:00:00");
    dtDepart.offsetInDays(1);
    var auxDateDepart = dateFormat(new Date(dtDepart.getTime()), "isoDateTime");
    //console.log(auxDateDepart);
    auxDateDepart = auxDateDepart.split("-0300"); // Split somente para remover o -0300  
    return auxDateDepart[0];
}

//Passa link com data de ida e seu melhor preço do dia
function getPriceDepart(link) {
    var result = 0;
    request.get(
        {
            headers:
            {
                'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13'
            },
            uri: link
        }, function (error, response, body) {
            try {

                var receiveJSON = JSON.parse(body);

                var items = receiveJSON.result.data.items;
                var index = 0
                var menorValor = items[0].emissionPrice.total.fare.amount;
                var dataPassagemIda = items[0].itinerariesBox.outboundRoutes[0].departureDateTime.raw;

                for (i = 1; i < items.length; i++) {
                    if (menorValor > items[i].emissionPrice.total.fare.amount) {
                        menorValor = items[i].emissionPrice.total.fare.amount;
                    }
                    index = index++;

                }
                result = menorValor;

                /* Log dos dados recebidos 
                console.log("Codigo da Empresa   |" + items[0].itinerariesBox.outboundRoutes[0].segments[0].operatingCarrier.code);
                console.log("menorPreco          |" + items[0].emissionPrice.total.fare.amount);
                console.log("origem              |" + items[0].itinerariesBox.outboundLocations.departure.city.code);
                console.log("aeroportoOrigem     |" + items[0].itinerariesBox.outboundLocations.departure.airport.code);
                console.log("destino             |" + items[0].itinerariesBox.outboundLocations.arrival.city.code);
                console.log("aeroportoDestino    |" + items[0].itinerariesBox.outboundLocations.arrival.airport.code);
                console.log("dataIda             |" + items[0].itinerariesBox.outboundRoutes[0].departureDateTime.raw);
                */
                // Prepara objeto para inseir no banco.
                var dadosDia = {
                    des_empresa: items[0].itinerariesBox.outboundRoutes[0].segments[0].operatingCarrier.code,
                    menorPreco: items[0].emissionPrice.total.fare.amount,
                    origem: items[0].itinerariesBox.outboundLocations.departure.city.code,
                    destino: items[0].itinerariesBox.outboundLocations.arrival.city.code,
                    aeroportoOrigem: items[0].itinerariesBox.outboundLocations.departure.airport.code,
                    aeroportoDestino: items[0].itinerariesBox.outboundLocations.arrival.airport.code,
                    dataIda: items[0].itinerariesBox.outboundRoutes[0].departureDateTime.raw
                };
                banco.salvaDadosDia(dadosDia, index);

            }
            catch (error) {
                console.log('Erro: ' + error);
            }
        });
}

// Monta o link que possui o JSON
function buildLinkDepart(origem, destino, dataIda) {
    var link = "https://www.decolar.com/shop/flights/data/search/oneway/" + origem + "/" + destino + "/" + dataIda + "/1/0/0/TOTALFARE/ASCENDING/NA/NA/NA/NA";
    console.log(link);
    return link;
}

// Monta o link que possui o JSON
function buildLinkRoundTrip(origem, destino, dataIda, dataVolta) {
    var link = "https://www.decolar.com/shop/flights/data/search/roundtrip/" + origem + "/" + destino + "/" + dataIda + "/" + dataVolta + "/1/0/0/TOTALFARE/ASCENDING/NA/NA/NA/NA/NA";
    return link;
}

//Busca o preço de ida e volta
function getPriceRoundTrip(link) {
    request.get(
        {
            headers:
            {
                'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13'
            },
            uri: link
        }, function (error, response, body) {
            try {

                var receiveJSON = JSON.parse(body);

                var items = receiveJSON.result.data.items;
                var menorValor = items[0].emissionPrice.total.fare.amount;
                for (i = 1; i < items.length; i++) {
                    if (menorValor > items[i].emissionPrice.total.fare.amount) {
                        menorValor = items[i].emissionPrice.total.fare.amount;
                    }

                }
                console.log("Menor preço (ida e volta) : R$ " + menorValor);
            }
            catch (error) {
                console.log('Erro: ' + error);
            }
        });
}