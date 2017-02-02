angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  var store = [
    {nameDevice:"Luz Branca",namePlace:"Sala"},
    {nameDevice:"Luz Branca",namePlace:"Cozinha"},
    {nameDevice:"Luz Branca",namePlace:"Lavabo"},
    {nameDevice:"Luz Branca",namePlace:"Quarto 1"},
    {nameDevice:"Luz Branca",namePlace:"Quarto 2"},
    {nameDevice:"Luz Branca",namePlace:"Garagem"}
];
  $scope.itens = store;

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
