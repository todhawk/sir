var compatibilidadeTotal = 80; //Valor em %
var difMin = 1; //Valor da Diferença Mínima em porcentagem [(V1-V2)/V2]*100 [%]

// quantidade de pessoas dever ser equivalente

// compreensão de período
  // manhã = 0h as 11:59
  // tarde = 12h as 18:59
  // noite = 19h as 23:59

// x == y    - 100% compativel
// x > y

// 0:00 as 0:59
// 1:00 as 1:59
// 2:00 as 2:59
// 3:00 as 3:59
// 4:00 as 4:59
// 5:00 as 5:59
// 6:00 as 6:59
// 7:00 as 7:59
// 8:00 as 8:59
// 9:00 as 9:59
// 10:00 as 10:59
// 11:00 as 11:59
// 12:00 as 12:59
// 13:00 as 13:59
// 14:00 as 14:59
// 15:00 as 15:59
// 16:00 as 16:59
// 17:00 as 17:59
// 18:00 as 18:59
// 19:00 as 19:59
// 20:00 as 20:59
// 21:00 as 21:59
// 22:00 as 22:59
// 23:00 as 23:59



var resultado = 0;

var casaA = {
  qutMoradores:3,
  periodos : { //consumos por periodo
    manha : 320,
    tarde : 1,
    noite : 979
  }
}

var casaB = {
  qutMoradores:3,
  periodos : { //consumos por periodo
    manha : 250,
    tarde : 150,
    noite : 980
  }
}


if (casaA.qutMoradores == casaB.qutMoradores) {
  if (casaA.periodos.manha > casaB.periodos.manha) {
    resultado = ((casaA.periodos.manha - casaB.periodos.manha)/casaB.periodos.manha)*100;
  }else {
    resultado = ((casaB.periodos.manha - casaA.periodos.manha)/casaA.periodos.manha)*100;
  }
  if (resultado >= difMin) {
    console.log("Manhã: " , resultado , "%");
  }else {
    console.log("Diferença inferior a " , difMin , "% - " , resultado);
  }


  if (casaA.periodos.tarde > casaB.periodos.tarde) {
    resultado = ((casaA.periodos.tarde - casaB.periodos.tarde)/casaB.periodos.tarde)*100;
  }else {
    resultado = ((casaB.periodos.tarde - casaA.periodos.tarde)/casaA.periodos.tarde)*100;
  }
  if (resultado >= difMin) {
    console.log("Tarde: " , resultado , "%");
  }else {
    console.log("Diferença inferior a " , difMin , "% - " , resultado);
  }


  if (casaA.periodos.noite > casaB.periodos.noite) {
    resultado = ((casaA.periodos.noite - casaB.periodos.noite)/casaB.periodos.noite)*100;
  }else {
    resultado = ((casaB.periodos.noite - casaA.periodos.noite)/casaA.periodos.noite)*100;
  }
  if (resultado >= difMin) {
    console.log("Noite: " , resultado , "%");
  }else {
    console.log("Diferença inferior a " , difMin , "% - " , resultado);
  }
}
