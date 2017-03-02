angular.module('starter.services', [])

.service('SignAccount',function($state) {
  var userInfo = {};
  var svc = {};

  svc.getUserInfo = function() {
    return userInfo;
  };

  svc.createUserEmail = function(name,email,password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    }) //end catch
    .then(function() { // Caso o Sign Up de certo o usuário será logado automaticamente
      if (firebase.auth().currentUser) {
        firebase.auth().currentUser.updateProfile({
          displayName : name,
          photoURL : "https://firebasestorage.googleapis.com/v0/b/sistemasir-5944f.appspot.com/o/photoUser-basic.png?alt=media&token=598f950b-94be-4f06-a146-45a299746f4d"
        }).then(function() {
          var currentUser = firebase.auth().currentUser;
          // console.log("CurrentUser: " , currentUser);
          userInfo = {
            name:currentUser.displayName,
            email:currentUser.email,
            photoURL:currentUser.photoURL,
            uid:currentUser.uid
          };
          $state.go('tab.dash');
        });
      }
    }); //end then
  };


  svc.signInEmail = function(email,password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
     .catch(function(error) {
       console.log(error);
     }) //end catch
     .then(function() { // Caso o Sign Up de certo o usuário será logado automaticamente
       var currentUser = firebase.auth().currentUser;
       // console.log("CurrentUser: " , currentUser);
       if (currentUser) {
         userInfo = {
           name:currentUser.displayName,
           email:currentUser.email,
           photoURL:currentUser.photoURL,
           uid:currentUser.uid
         };
       $state.go('tab.dash');
       }
     }); //end then
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
