angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http,$timeout,$ionicLoading) {
         $ionicLoading.show({
             content: 'Loading',
             animation: 'fade-in',
             showBackdrop: false,
             maxWidth: 200,
             showDelay: 0
         });
        $http.get('http://kinice.top/api/allArticles')
            .success(function(data){
                $scope.data = data;
                $ionicLoading.hide();
            });

        $scope.doRefresh = function(){
            $http.get('http://kinice.top/api/allArticles')
                .success(function(newdata){
                    $scope.data=newdata;
                })
                .finally(function(){
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }
})
.controller('AppCtrl', function($scope,$ionicModal){
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal){
        $scope.modal = modal;
    });

    $scope.closeLogin = function(){
        $scope.modal.hide();
    };

    $scope.login = function(){
        $scope.modal.show();
    };

    $scope.doLogin = function(){

    }
})
.controller('ChatsCtrl', function($scope, $http,$timeout,$ionicLoading) {
  $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 200,
      showDelay: 0
  });
 $http.get('http://kinice.top/api/allArticles')
     .success(function(data){
         $scope.data = data;
         $ionicLoading.hide();
     });
 $scope.doRefresh = function(){
     $http.get('http://kinice.top/api/allArticles')
         .success(function(newdata){
             $scope.data=newdata;
         })
         .finally(function(){
             $scope.$broadcast('scroll.refreshComplete');
         });
 }
})

.controller('ChatDetailCtrl', function($scope, $http, $stateParams, $ionicLoading) {
  var get = function(id) {
    $http.get('http://kinice.top/api/article/'+id)
    .success(function(data) {
      $scope.post = data;
    });
  }
  get($stateParams.id);
})

.controller('SearchCtrl', function($scope){
  $scope.search = function($event){
    if($event.keyCode!=13){
      return false;
    }else{
      alert('search!');
    }
  }
})
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
