// Importação da biblioteca do express para dentro do nosso código
var express = require('express');
// Biblioteca que possibilita/libera o acesso a api por servidores externos
var cors = require('cors');
var firebase = require("firebase");

//  ------------------         Seus módulos         ------------------
var calc = require('./servicos/calculos');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAafDchHBhcoFdtow3Fvia9vNKruczamc8",
  authDomain: "sistemasir-5944f.firebaseapp.com",
  databaseURL: "https://sistemasir-5944f.firebaseio.com",
  storageBucket: "sistemasir-5944f.appspot.com",
  messagingSenderId: "745665908827"
};
firebase.initializeApp(config);

var app = express();
app.use(cors());

// Biblioteca que possibilita a extração dos parâmetros enviados pelo app/website
// via body no formato json
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded

//  ------------------         Funções         ------------------
var action = {};
action.newPostKey = function() {
  return firebase.database().ref().push().key;
};

var configFirstAccess = function(nameUser) {
  var user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: nameUser
  }).then(function() {
    console.log("Nome do usuario atualizado");
    console.log("\n\nNome :" , user.displayName);
    console.log("Email :" , user.email);
    console.log("Uid :" , user.uid);
    console.log("PhotoUrl :" , user.photoUrl);
    console.log("\n\n");

    // var ref = firebase.database().ref();
    // var payload = {};
    // var uid = user.uid;
    // var date = new Date();
    // var dataUser = {
    //   nome : user.displayName,
    //   email : user.email,
    //   dateCad : {
    //     dia : date.getDate(),
    //     mes : date.getMonth(),
    //     ano : date.getFullYear(),
    //     diaSemana : date.getDay(),
    //     hora : date.getHours(),
    //     minuto : date.getMinutes(),
    //     segundo : date.getSeconds()
    //   }
    // };
    // payload['users/' + uid + '/'] = dataUser;
    // ref.update(payload);
  }, function(error) {
    console.log("Nome do usuario não atualizado");
  });
};

//  ##################         EVENTS         ##################
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("Nome: " , user.displayName);
    console.log("Email: " , user.email);
    console.log("Uid: " , user.uid);
  }
});

//  ------------------         Flag detect         ------------------
firebase.database().ref("energyCompany").on("child_changed", function(snapshot, prevChildKey) {
  console.log(snapshot.val());
});

//  ##################         END_POINTS (URLs)         ##################

//  ------------------         get - suaUrl         ------------------
app.get('/suaUrl', function (req, res) {

})  //end of endpoint /suaUrl

//  ------------------         get - teste         ------------------
app.get('/teste', function (req, res) {
  res.send("A soma é: " + calc.calcSoma(10,8));
})  //end of endpoint /teste

//  ------------------         post - profileHouse         ------------------
app.post('/profileHouse', function (req, res) {
  var ref = firebase.database().ref();
  var newPostKey = firebase.database().ref().child('users').push().key;

  if (req.body.uid) {
    var payload = {};
    var profileHouse = {
      houseName : req.body.houseName,
      houseAddress : req.body.houseAddress,
      consumptionMonth : req.body.consumptionMonth,
      photoURL : req.body.photoURL,
      residentAmount : {
        adult : req.body.adult,
        children : req.body.children
      }
    };

    payload['users/' + req.body.uid + '/houses/' + newPostKey] = { status : true };
    payload['profileHouse/' + newPostKey + '/'] = profileHouse;
    ref.update(payload);
  }
})  //end of endpoint /profileHouse

//  ------------------         delete - profileHouse         ------------------
app.delete('/profileHouse', function (req, res) {

})  //end of endpoint /profileHouse

//  ------------------         post Form Landing Page         ------------------
app.post('/formlanding', function (req, res) {
  var ref = firebase.database().ref("messageLandingPage");
  var erros = []; // será preenchida com possiveis erros de autenticação

  if (!req.body.name) {     erros.push("Nome não informado");   }
  if (!req.body.email) {    erros.push("E-mail não informado"); }
  if (!req.body.message) {  erros.push("Menssagem não informada");  }

  if (erros.length > 0) {
    res.send( { status: false,  erros: erros  } );
  } else {
    var payload = {
      date : Date(),
      name : req.body.name,
      email : req.body.email,
      message : req.body.message
    };
    ref.push(payload);
    res.send("Menssagem enviada com sucesso!");
  }; //end else

})  //end of endpoint /formlanding

//  ------------------         post - flag         ------------------
app.post('/flag', function (req, res) {
  var ref = firebase.database().ref(); // para o update não precisa referenciar uma tabela neste ponto
  var payload = {}; //cria uma variável do tipo objeto

  var sendFlag = req.body.flag;

  //Neste ponto sim é mencionada uma tabela e uma filha podendo haver variasfilhas
  payload['flags/flag1/'] = sendFlag; // atribui o valor contido no objeto dataUser à payload
  ref.update(payload); // execulta o update
  res.send("ok");
})  //end of endpoint /flag

//  ------------------         consultaDoHardware         ------------------
app.get('/flag', function (req, res) {
  var ref = firebase.database().ref("flags");
  ref.child("flag1").once('value')
  .then(function(snap) {
    res.send(snap.val());
  });
  //TO DO - A cada x segundos o hardware bate nesta url e pergunta qual é o
  //        status atual gravado no db "flags" e recebe uma resposta.
  //        Caso seja diferente de seu valor atual o mesmo inverte seu estado e
  //        em seguida comunica o server de sua mudança através da url /logs.
})  //end of endpoint /flag

//  ------------------         logsDoHardware         ------------------
app.get('/logs', function (req, res) {
  var ref = firebase.database().ref("generalLogs");
  //TO DO - Verifica se o id do device esta cadastrado
  //      caso esteja recuperar o idHouse e rodar o codigo abaixo
  //      caso não esteja responder para o cliente que o mesmo devera gerar um
  //      novo id para o hardware através de seu app.
  var dataAtual = new Date();

  var dateInfo = {
    dia:dataAtual.getDate(),
    mes:dataAtual.getMonth(),
    ano:dataAtual.getFullYear(),
    diaSemana:dataAtual.getDay(),
    hora:dataAtual.getHours(),
    minuto:dataAtual.getMinutes(),
    segundo:dataAtual.getSeconds(),
    timestamp:firebase.database.ServerValue.TIMESTAMP,
    status:0
  }
  var idHouse = "-KctfiI3OLI6S6zspgNY";
  ref.child(idHouse +'/luzSala').push(dateInfo);

})  //end of endpoint /logs

//  ------------------         get-flag energy         ------------------
app.get('/flagenergy', function (req, res) {
  var ref = firebase.database().ref("energyCompany");

  ref.child("aesEletropaulo").once('value')
    .then(function(snap) {
      res.send(
        snap.val()
      );
    });
})

//  ------------------         post-therms - send data         ------------------
// app.get('/in/:therm', function(req, res){
app.post('/therm', function(req, res){
  console.log(req.body);
  var obj = req.body;

  if(obj.id == "sala01"){
    s1Store.push(obj.temp);
    console.log(s1Store);
    if (s1Store.length == qutRead) {
      calcMedia(s1Store);
    }
  }else if(obj.id == "sala02"){
    // s1Store.push(obj.temp);
  }else if(obj.id == "auditorio"){
    // s1Store.push(obj.temp);
  }else {
    console.log("ID não encontrada.");
  }


  res.send('\nok Cibele....recebi!\n\n');
});

//  ------------------         get-devices         ------------------
app.get('/devices', function (req, res) {
  var ref = firebase.database().ref("devicesGroup");

  ref.child("-KctfiI3OLI6S6zspgNY").once('value')
    .then(function(snap) {
      res.send(
        snap.val()
      );
    });
})

//  ------------------         get-users         ------------------
app.get('/users', function (req, res) {
  var ref = firebase.database().ref();

  var newPostKey = firebase.database().ref().child('users').push().key;

  var payload = {};
  var uid = "w7HwtXmYzEWNhTjXzzvJq1VuVVY2";

  var dataUser = {
    nameUser:"Daniel Alves de Souza",
    emailUser:"alvesdesouza.daniel@gmail.com",
    photoURL:"photoURL",
    houses:{
      house1:newPostKey
    }
  };

  var dataDwellersGroup = {
    admin:true
  };

  var dataHouse = {
    addressHouse:"Rua Afonso XIII, 636",
    nameHouse:"Minha Casa"
  }

  var dataDevices = {
    a:"a",
    b:"b",
    c:"c",
    d:"d"
  }

  payload['users/' + uid + '/'] = dataUser;
  payload['profileHouse/' + newPostKey + '/'] = dataHouse;
  payload['devicesGroup/' + newPostKey + '/'] = dataDevices;
  payload['dwellersGroup/' + newPostKey + '/' + uid + '/'] = dataDwellersGroup;

  res.send(payload);
  ref.update(payload);



  // // var ref = firebase.database().ref('users');
  //
  // firebase.database().ref('users').once('value')
  //   .then(function(snap) {
  //     // var userMails = snap.val();
  //     console.log(snap.val());
  //   });

})

//  ------------------         app Listen - node         ------------------
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
