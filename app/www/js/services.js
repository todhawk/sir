angular.module('starter.services', [])

.service('SignAccount',function($state) {
  var userInfo = {};
  var svc = {};

  svc.getUserInfo = function() {
    return userInfo;
  };

  svc.signEmail = function(name,email,password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    }) //end firebase.auth
    .then(function() { // Caso o Sign Up de certo o usuário será logado automaticamente
      var currentUser = firebase.auth().currentUser;
      // console.log("CurrentUser: " , currentUser);
      if (currentUser) {
        currentUser.updateProfile({
          displayName : name
        });
        userInfo = {
          name:currentUser.displayName,
          email:currentUser.email,
          photoURL:currentUser.photoURL,
          uid:currentUser.uid
        };
      $state.go('tab.dash');
      }
    });
  };

  svc.signProvider = function(provider) {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log("Result: " , result);
      if (user.emailVerified == true || token != null) {
        userInfo = {
          name:user.displayName,
          email:user.email,
          photoURL:user.photoURL,
          uid:user.uid
        };
        $state.go('tab.dash');
      };

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log("Error: " , error);
    });
  };

  return svc;
})

.factory('test', function() {


});
