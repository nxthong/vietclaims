/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin')
      .controller('AuthCtrl', AuthCtrl);

  /** @ngInject */
  function AuthCtrl($scope, $firebaseSimpleLogin) {
    console.log("==>> AuthCtrl <<==");

    $scope.username = 'thongnx@email.com';
    $scope.password = '123456';
    var firebaseObj = new Firebase("https://laluna.firebaseio.com");
    var loginObj = $firebaseSimpleLogin(firebaseObj);

    $scope.authenticated = function(){
      event.preventDefault();  // To prevent form refresh
      console.log(loginObj);
     
      loginObj.$login('password', {
            email: $scope.username,
            password: $scope.password
        }).then(function(user) {
              // Success callback
              localStorage.setItem("email", user.email);
              localStorage.setItem("firebaseAuthToken", user.firebaseAuthToken);
              localStorage.setItem("uid", user.uid);
              //redirect page
              window.location.href = "/";
          }, function(error) {
              // Failure callback
              alert('Login failure');
          });
    }
  }
})();