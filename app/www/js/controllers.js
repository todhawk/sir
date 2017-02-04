angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  var store = [
    {nameDevice:"Luz Branca",namePlace:"Sala grande"},
    {nameDevice:"Luz Branca",namePlace:"Cozinha"},
    {nameDevice:"Luz Branca",namePlace:"Lavabo"},
    {nameDevice:"Luz Branca",namePlace:"Quarto 1"},
    {nameDevice:"Luz Branca",namePlace:"Quarto 2"},
    {nameDevice:"Luz Branca",namePlace:"Garagem"}
];
  $scope.itens = store;

})
.controller('signupCtrl', function($scope) {


})
.controller('LoginCtrl', function($scope) {


})
.controller('ProfileCtrl', function($scope) {


})
.controller('settingsCtrl', function($scope) {


})
