/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.revenue').controller('RevenueCtrl', RevenueCtrl);

  /** @ngInject */
  function RevenueCtrl( $scope,
                        $filter,
                        editableOptions,
                        editableThemes,
                        $firebase,
                        ngDialog,
                        $firebaseSimpleLogin,
                        toastr,
                        toastrConfig ) {
    console.log("==>> RevenueCtrl <<==");

    var email = localStorage.getItem("email");
    var openedToasts = [];

    $scope.clearLastToast = function () {
      var toast = openedToasts.pop();
      toastr.clear(toast);
    };
    $scope.clearToasts = function () {
      toastr.clear();
    };
    $scope.$on('$destroy', function iVeBeenDismissed() {
      angular.extend(toastrConfig, defaultConfig);
    });

    if(email !== undefined && email !== null ) {
      var firebaseAuthToken = localStorage.getItem("firebaseAuthToken");
      var uid = localStorage.getItem("uid");

      var ref = new Firebase("https://laluna.firebaseio.com/revenues");
      var sync = $firebase(ref);

      $scope.DB = sync.$asArray();

      $scope.add = function(rev) {
        var value = rev.value;
        var date = rev.date.getFullYear() +
                        ((rev.date.getMonth() + 1) > 10 ? "/" : "/0") + (rev.date.getMonth() + 1) +
                        ((rev.date.getDate() + 1) > 10 ? "/" : "/0") + rev.date.getDate();
        //check exists
        if( $filter('filter')($scope.DB, { date: date }).length !== 0 ) {
          //open toast
          openedToasts.push(toastr["warning"]('Date is exits! Please check agian...', 'Laluna message', {}));
          $scope.optionsStr = "toastr.warning(\'Date is exits! Please check agian...\', \'Laluna message', " + JSON.stringify({}, null, 2) + ")";
        } else {
          var created_by_value = uid;
          var created_at_value = Date.now();
          var updated_by_value = uid;
          var updated_at_value = Date.now();

          $scope.app = {
                          date: date,
                          value: value,
                          created_by: created_by_value,
                          created_at: created_at_value,
                          updated_by: updated_by_value,
                          updated_at: updated_at_value
                        }
          $scope.DB.$add($scope.app);
          //open toast
          openedToasts.push(toastr["info"]('Add new revenue successfully...', 'Laluna message', {}));
          $scope.optionsStr = "toastr.info(\'Add new revenue successfully...\', \'Laluna message', " + JSON.stringify({}, null, 2) + ")";
        }        

        $scope.DB.splice($scope.DB.length - 1, 1);
      }

      $scope.addRow = function() {
        $scope.inserted = {
          id: null,
          date: '',
          value: null
        };
        $scope.DB.push($scope.inserted);
      };

      editableOptions.theme = 'bs3';
      editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
      editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
    
      $scope.removeRev = function (rev) {
        $scope.dialog = ngDialog.open({ 
                        template: '<div class="form-group">'
                                  +'<div class="form-group">'
                                    +'<label for="exampleInputPassword1">Please type password to confirm</label>'
                                    +'<input type="password" ng-model="passwordConfirm" class="form-control" id="exampleInputPassword1" placeholder="Password">'
                                  +'</div>'
                                  +'<div class="checkbox">'
                                    +'<label class="custom-checkbox">'
                                      +'<input type="checkbox" ng-model="askAgain">'
                                      +'<span>Do not ask again?</span>'
                                    +'</label>'
                                  +'</div>'
                                  +'<button type="button" class="btn btn-danger" ng-click="confirmDel()">Submit</button>',
                        resolve:{
                          rev: function(){
                            return rev;
                          },
                          db: function(){
                            return $scope.DB;
                          },
                          fbLogin: function(){
                            return $firebaseSimpleLogin;
                          },
                          email: function(){
                            return email;
                          }
                        },
                        controller: function($scope, rev, db, fbLogin, email){
                          $scope.rev = rev;
                          $scope.email = email;
                           
                          if (localStorage.getItem("passwordRemember") === "" || localStorage.getItem("passwordRemember") === null) {
                            $scope.passwordConfirm = "";
                            $scope.askAgain = false;  
                          } else {
                            $scope.passwordConfirm = localStorage.getItem("passwordRemember");
                            $scope.askAgain = true;  
                          }


                          $scope.confirmDel = function() {
                            $scope.askAgain;
                            var firebaseObj = new Firebase("https://laluna.firebaseio.com");
                            var loginObj = fbLogin(firebaseObj);

                            loginObj.$login('password', {
                                email: $scope.email,
                                password: $scope.passwordConfirm
                              }).then(function(user) {
                                // Success callback
                                closeDialog();        
                                db.$remove($scope.rev);
                                //save password
                                if($scope.askAgain === true) {
                                  localStorage.setItem("passwordRemember", $scope.passwordConfirm);
                                } else {
                                  localStorage.setItem("passwordRemember", "");
                                }

                                //open toast
                                openedToasts.push(toastr["info"]('Deleted revenue successfully...', 'Laluna message', {}));
                                $scope.optionsStr = "toastr.info(\'Deleted revenue successfully...\', \'Laluna message', " + JSON.stringify({}, null, 2) + ")";
                              }, function(error) {
                                // Failure callback
                                openedToasts.push(toastr["error"]('Password not march! Please try again...',
                                                                    'Laluna message',
                                                                    { allowHtml: true }));
                                $scope.optionsStr = "toastr.error(\'Password not march! Please try again...\', \'Laluna message', " + JSON.stringify({ allowHtml: true } || {}, null, 2) + ")";
                              });
                          }
                        },
                        plain: true
                      });
      };

      $scope.updateRev = function(rev) {
        $scope.dialog = ngDialog.open({ 
                        template: '<div class="form-group">'
                                    +'<label for="exampleInputPassword1">Date</label>'
                                    +'<input type="date" ng-model="dateUpdate" class="form-control" id="exampleInputPassword1">'
                                  +'</div>'
                                  +'<div class="form-group">'
                                    +'<label for="exampleInputPassword1">Value</label>'
                                    +'<input type="value" ng-model="valueUpdate" class="form-control" value="valueUpdate|currency : "" : 0 || 0">'
                                  +'</div>'
                                  +'<button type="button" class="btn btn-danger" ng-click="confirmUpdate()">Submit</button>',
                        resolve:{
                          rev: function(){
                            return rev;
                          },
                          db: function(){
                            return $scope.DB;
                          },
                          fbLogin: function(){
                            return $firebaseSimpleLogin;
                          },
                          email: function(){
                            return email;
                          }
                        },
                        controller: function($scope, rev, db, fbLogin, email){
                          console.log(rev);
                          $scope.email = email;
                           
                          $scope.dateUpdate = new Date(rev.date);//rev.date;
                          $scope.valueUpdate = rev.value;

                          $scope.confirmUpdate = function() {
                            //check exists
                            var dateToString = $scope.dateUpdate.getFullYear() +
                                           (($scope.dateUpdate.getMonth() + 1) > 10 ? "/" : "/0") + ($scope.dateUpdate.getMonth() + 1) +
                                           (($scope.dateUpdate.getDate() + 1) > 10 ? "/" : "/0") + $scope.dateUpdate.getDate();
                            
                            if( $filter('filter')(db, { date: dateToString }).length === 0 
                                || ($filter('filter')(db, { date: dateToString }).length === 1 && dateToString === rev.date)) {
                              rev.date = dateToString;
                              rev.value = $scope.valueUpdate;
                              rev.updated_by = localStorage.getItem("uid");
                              rev.updated_at = Date.now();
  
                              db.$save(rev);
                              closeDialog();
                              
                              //open toast
                              openedToasts.push(toastr["info"]('Updated revenue successfully...', 'Laluna message', {}));
                              $scope.optionsStr = "toastr.info(\'Updated revenue successfully...\', \'Laluna message', " + JSON.stringify({}, null, 2) + ")";
                            }
                            else {
                              //open toast
                              openedToasts.push(toastr["warning"]('Date is exits! Please check agian...', 'Laluna message', {}));
                              $scope.optionsStr = "toastr.warning(\'Date is exits! Please check agian...\', \'Laluna message', " + JSON.stringify({}, null, 2) + ")";
                            }
                          }
                        },
                        plain: true
                      });
      }

      var closeDialog = function(){
        $scope.dialog.close();
        $scope.dialog.close();
      };


    } else {
      window.location.href = "login";
    }
  }
})();