angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope) {
  var infoDevice = [
    {id:1,order:3,type:"atuador",nameDevice:"Luz do Quarto",namePlace:"Quarto Casal",image:"img/lamp.png",statusConection:"img/success.png",status:"OFF"},
    {id:2,order:4,type:"atuador",nameDevice:"Luz da Sala",namePlace:"Sala",image:"img/abajur.png",statusConection:"img/success.png",status:"OFF"},
    {id:3,order:5,type:"atuador",nameDevice:"Luz Cozinha",namePlace:"Cozinha",image:"img/lamp.png",statusConection:"img/warning.png",status:"ON"},
    {id:4,order:2,type:"atuador",nameDevice:"Luz Cozinha",namePlace:"Cozinha",image:"img/lamp.png",statusConection:"img/warning.png",status:"OFF"},
    {id:5,order:1,type:"atuador",nameDevice:"Cibele",namePlace:"Cozinha",image:"img/lamp.png",statusConection:"img/warning.png",status:"ON"},
    {id:6,order:6,type:"temperatura",nameDevice:"Luz do Lavabo",namePlace:"Lavabo",image:"img/therm.png",statusConection:"img/success.png",status:"28ºC"}
  ];
  $scope.itens = infoDevice;

})
.controller('SignupCtrl', function($scope) {


})
.controller('LoginCtrl', function($scope) {


})
.controller('ProfileCtrl', function($scope,$ionicModal) {
  $scope.showPassword = function(checkButton) {
    // console.log(checkButton);
    if (checkButton == true) {
      var x = document.getElementsByTagName("INPUT")[2];
      x.getAttributeNode("type").value = "text";
      var x = document.getElementsByTagName("INPUT")[3];
      x.getAttributeNode("type").value = "text";
    }else {
      var x = document.getElementsByTagName("INPUT")[2];
      x.getAttributeNode("type").value = "password";
      var x = document.getElementsByTagName("INPUT")[3];
      x.getAttributeNode("type").value = "password";
    }
  }

  $ionicModal.fromTemplateUrl('editarPerfil', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });


})
.controller('SettingsCtrl', function($scope) {


})
