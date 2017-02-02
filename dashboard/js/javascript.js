var app = angular.module('web', []);
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
