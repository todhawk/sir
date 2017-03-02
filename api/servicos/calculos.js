//  ------------------         configuração do recebimento de temperaturas         ------------------
var qutRead = 4;
var s1Store = []; //Sala 01
var s2Store = []; //Sala 02
var s3Store = []; //Sala 03

var calcMedia = function(sense8) {
  var soma = 0;
  for(var i=0 ; i<sense8.length ; i++){
    soma += parseFloat(sense8[i]);
  }
  console.log("Média" + soma/4 + "\n");
  s1Store = [];

  var ref = firebase.database().ref("notifications");
  var dataAtual = new Date();
  var payload = {
    data : dataAtual.getDate() + "/" + dataAtual.getMonth() + "/" + dataAtual.getFullYear(),
    message : "Olá! A Sala 01 encontra-se com temperatura de " + soma/4 + " °C",
    read : false
  };
  ref.child("-KctfiI3OLI6S6zspgNY").push(payload);
  console.log("Menssagem enviada para o banco de dados!");
};












var calculos = {};


// calculos.calcSoma = function(num1,num2) {
//   return num1+num2;
// };

exports.nameCalc = "Soma";

exports.calcSoma = function(num1,num2) {
  return num1+num2;
};
