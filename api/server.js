// Importação da biblioteca do express para dentro do nosso código
var express = require('express');
// Biblioteca que possibilita/libera o acesso a api por servidores externos
var cors = require('cors');
var firebase = require("firebase");

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
}



//  ##################         EVENTS         ##################


//  ------------------         Detect a new user         ------------------
firebase.auth().onAuthStateChanged(function(user) {
  if (user) { // se existir um novo usuário então sera criado um novo ambiente user
    console.log("Detectado cadastro de novo usuário!");
    var ref = firebase.database().ref();
    var payload = {};
    var uid = user.uid;
    var dataUser = {
      nameUser : user.displayName,
      emailUser : user.email,
      photoURL : user.photoURL
    };
    payload['users/' + uid + '/'] = dataUser;
    ref.update(payload);

  } else {
    console.log();
    console.log("onAuthStateChanged: " , user);
  }
});

  // var ref = firebase.database().ref("users");

  // firebase.database().ref("users").on("value", function(snapshot) {
  //   console.log(snapshot.val());
  // }, function (errorObject) {
  //   console.log("The read failed: " + errorObject.code);
  // });

//   firebase.database().ref("users").on("child_added", function(snapshot, prevChildKey) {
//   var newPost = snapshot.val();
//   console.log("----------------------------------------------------");
//   console.log("Sua Chave:" + snapshot.key);
//   console.log("Nome: " + newPost.nome);
//   console.log("Email: " + newPost.email);
//   console.log("Previous Post ID: " + prevChildKey);
// });


//  ##################         END_POINTS (URLs)         ##################

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

//  ------------------         consultaDoHardware         ------------------
app.get('/flag', function (req, res) {
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

//  ------------------         signOut         ------------------
app.post('/signout', function (req, res) {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }, function(error) {
    // An error happened.
  });
})  //end of endpoint /signout

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

//  ------------------         signInEmail         ------------------
app.post('/signinEmail', function (req, res) {
  firebase.auth().signInWithEmailAndPassword("email", "password").catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Error Code: " + errorCode);
    console.log("Error Message: " + errorMessage);
  });
})  //end of endpoint /signinEmail

//  ------------------         signUpEmail         ------------------
app.post('/signupEmail', function (req, res) {
  // req.body.nome é uma variavel enviada no corpo da requisição pelo usuário
  var erros = []; // será preenchida com possiveis erros de autenticação

  if (!req.body.nome) {                         erros.push("Nome não informado");   }
  if (!req.body.email) {                        erros.push("E-mail não informado"); }
  if (!req.body.senha || !req.body.re_senha) {  erros.push("Senha não informada");  }

  if (erros.length > 0) {
    res.send( { status: false,  erros: erros  } );
  } else {
      firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.senha).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error Code: " + errorCode);
        console.log("Error Message: " + errorMessage);
      }); //end firebase.auth
    }; //end else
})  //end of endpoint /signupEmail

//  ------------------         app Listen - node         ------------------
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
