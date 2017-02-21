angular.module('starter.controllers', ['ionic', 'firebase'])

.controller('DashCtrl', function($scope,$http) {
  $http({
    method: 'GET',
    url: 'http://localhost:3000/devices'
  }).then(function successCallback(response) {
    $scope.itens = response.data;
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

})

.controller('SignupCtrl', function($scope,$state) {
  $scope.goToLogin = function() {
    $state.go('login');
  }


})

.controller('LoginCtrl', function($scope,$state,SignAcounts) {
  $scope.googleBtn = function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    SignAcounts.sign(provider);
  };

  $scope.facebookBtn = function() {
    var provider = new firebase.auth.FacebookAuthProvider();
    SignAcounts.sign(provider);
  };

  $scope.goToSignup = function() {
    $state.go('signup');
  };


})

.controller('ProfileCtrl', function($scope, $ionicModal, SignAcounts, $firebaseArray) {

  // Conecta a variavel tabelaRef a uma tabela no firebase chamada "messages"
  // var tabelaRef = firebase.database().ref("notifications").child("-KctfiI3OLI6S6zspgNY");
  // sincroniza a variavel de escopo com a tabela
  // $scope.daniel = $firebaseArray(tabelaRef);
  // console.log($scope.daniel);

  $scope.userInfo = SignAcounts.getUserInfo();

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

.controller('NotificationsCtrl', function($scope) {
  var ref = firebase.database().ref("notifications").child("-KctfiI3OLI6S6zspgNY");
  ref.on('value', function(snap) {
    $scope.notifications = snap.val();
  });
})

.controller('SceneCtrl', function($scope) {

})
