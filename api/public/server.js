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


// Eventos -----------------------------------------------
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


//  ------------------         endpoint(URL)         ------------------

//  ------------------         get-devices         ------------------
app.get('/devices', function (req, res) {
  var ref = firebase.database().ref("devices");

  ref.once('value')
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
  payload['houses/' + newPostKey + '/'] = dataHouse;
  payload['devicesGroup/' + newPostKey + '/'] = dataDevices;
  payload['dwellersGroup/' + newPostKey + '/' + uid + '/'] = dataDwellersGroup;
  // payload['dwellersGroup/-KcpKTWJCiAV5Hxzz9x7/kkkkkkkkkkkkkkkkkkkkkkkkkkkk/'] = {admin:false};

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
// Cria um endpoint com o método POST que consegue receber um body com informações
// enviadas pelo app ou site para serem processadas pelo servidor.
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
