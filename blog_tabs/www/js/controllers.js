angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http,$timeout,$ionicLoading) {
         $ionicLoading.show({
             content: 'Loading',
             animation: 'fade-in',
             showBackdrop: false,
             maxWidth: 200,
             showDelay: 0
         });
        $timeout(function(){
            $http.get('http://kinice.top/allArticles')
                .success(function(data){
                    $scope.data = data;
                     $ionicLoading.hide();
                });
        },1000);

        $scope.doRefresh = function(){
            $http.get('http://kinice.top/allArticles')
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
.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
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
