var app = angular.module('web', ["firebase"]);

app.controller("SampleCtrl", function($scope, $firebaseArray) {
  var dispositivos = [
    {id:1,order:3,type:"atuador",nameDevice:"Luz do Quarto",namePlace:"Quarto Casal",image:"img/lamp.png",status:"OFF"},
    {id:2,order:4,type:"atuador",nameDevice:"Luz da Sala",namePlace:"Sala",image:"img/abajur.png",status:"OFF"},
    {id:3,order:5,type:"atuador",nameDevice:"Luz Cozinha",namePlace:"Cozinha",image:"img/lamp.png",status:"ON"},
    {id:4,order:2,type:"atuador",nameDevice:"Luz Cozinha",namePlace:"Cozinha",image:"img/lamp.png",status:"OFF"},
    {id:5,order:1,type:"atuador",nameDevice:"Cibele",namePlace:"Cozinha",image:"img/lamp.png",status:"ON"},
    {id:6,order:6,type:"temperatura",nameDevice:"Luz do Lavabo",namePlace:"Lavabo",image:"img/therm.png",status:"28"}
  ];

  var ref = firebase.database().ref().child("messages");
  // create a synchronized array
  console.log($firebaseArray(ref));
  $scope.messages = $firebaseArray(ref);
  // add new items to the array
  // the message is automatically added to our Firebase database!
  $scope.addMessage = function() {
    for (var i = 0; i < dispositivos.length; i++) {
      $scope.messages.$add(dispositivos[i]);
    };
  };
  // click on `index.html` above to see $remove() and $save() in action
});


app.controller('dashboard',function($scope) {

var dispositivos = [
  {id:1,order:3,type:"atuador",nameDevice:"Luz do Quarto",namePlace:"Quarto Casal",image:"img/lamp.png",status:"OFF"},
  {id:2,order:4,type:"atuador",nameDevice:"Luz da Sala",namePlace:"Sala",image:"img/abajur.png",status:"OFF"},
  {id:3,order:5,type:"atuador",nameDevice:"Luz Cozinha",namePlace:"Cozinha",image:"img/lamp.png",status:"ON"},
  {id:4,order:2,type:"atuador",nameDevice:"Luz Cozinha",namePlace:"Cozinha",image:"img/lamp.png",status:"OFF"},
  {id:5,order:1,type:"atuador",nameDevice:"Cibele",namePlace:"Cozinha",image:"img/lamp.png",status:"ON"},
  {id:6,order:6,type:"temperatura",nameDevice:"Luz do Lavabo",namePlace:"Lavabo",image:"img/therm.png",status:"28"}
];
  $scope.devices = dispositivos;

  $scope.clickToOpen = function(index) {
    $scope.openModal = dispositivos[index];
  }


});
