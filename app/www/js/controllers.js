angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  var store = [
    {id:1,order:3,type:"atuador",nameDevice:"Luz do Quarto",namePlace:"Quarto Casal",image:"img/lamp.png",statusConection:"img/success.png",status:"OFF"},
    {id:2,order:4,type:"atuador",nameDevice:"Luz da Sala",namePlace:"Sala",image:"img/abajur.png",statusConection:"img/success.png",status:"OFF"},
    {id:3,order:5,type:"atuador",nameDevice:"Luz Cozinha",namePlace:"Cozinha",image:"img/lamp.png",statusConection:"img/warning.png",status:"ON"},
    {id:4,order:2,type:"atuador",nameDevice:"Luz Cozinha",namePlace:"Cozinha",image:"img/lamp.png",statusConection:"img/warning.png",status:"OFF"},
    {id:5,order:1,type:"atuador",nameDevice:"Cibele",namePlace:"Cozinha",image:"img/lamp.png",statusConection:"img/warning.png",status:"ON"},
    {id:6,order:6,type:"temperatura",nameDevice:"Luz do Lavabo",namePlace:"Lavabo",image:"img/therm.png",statusConection:"img/success.png",status:"28ºC"}
  ];
  $scope.itens = store;

})
.controller('SignupCtrl', function($scope) {


})
.controller('LoginCtrl', function($scope) {


})
.controller('ProfileCtrl', function($scope) {


})
.controller('SettingsCtrl', function($scope) {


})
