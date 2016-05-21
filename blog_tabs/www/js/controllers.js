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
.controller('AppCtrl', function($scope,$ionicLoading,$ionicModal,$timeout,$ionicPopup,$http,ls){
    $ionicModal.fromTemplateUrl('templates/post.html',{
      scope: $scope
    }).then(function(modal){
      $scope.modalPost = modal;
    });

    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal){
        $scope.modalLogin = modal;
    });

    $scope.open = function(){
      var bool = ls.get('logStatus');
      if(bool=='1'){
        $scope.modalPost.show();
      }else if(bool=='0'){
        $scope.modalLogin.show();
      }
    }

    $scope.closePost = function(){
      $scope.modalPost.hide();
    };

    $scope.doPost = function(){

    };

    $scope.closeLogin = function(){
        $scope.modalLogin.hide();
    };

    $scope.doLogin = function(){
      var values = JSON.parse(document.getElementById('values').value);
      $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          showDelay: 0
      });
      $.post('http://kinice.top/api/login',values,function(data){
        $ionicLoading.hide();
        if(data[0]=='success'){
          //popup part
          var myPopup = $ionicPopup.show({
            title: '登录成功',
            scope: $scope,
          });
          $timeout(function() {
            myPopup.close();
            $scope.modalLogin.hide();
          }, 2000);
          //store login Status
          ls.set('logStatus','1');
          ls.set('username',data[1].name);
          ls.set('email',data[1].email);
          ls.set('id',data[1]._id);
       }else if(data[0]=='error1'){
           var myPopup = $ionicPopup.show({
             title: '查无此人',
             scope: $scope,
           });
           $timeout(function() {
             myPopup.close();
           }, 2000);
       }else if(data[0]=='error2'){
           var myPopup = $ionicPopup.show({
             title: '密码错误',
             scope: $scope,
           });
           $timeout(function() {
             myPopup.close();
           }, 2000);
       }
      });
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

.controller('SearchCtrl', function($scope,$ionicLoading){
  $scope.search = function($event){
    if($event.keyCode!=13){
      return false;
    }else{
      $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          showDelay: 0
      });
      var searchKey = document.getElementById('searchinput').value;
      if(searchKey){
        $.get('http://kinice.top/api/search',{
          'keyword' : searchKey
        },function(data){
          $scope.data = data;
          $ionicLoading.hide();
        });
      }else{
        return false;
      }
    }
  }
})
.controller('AccountCtrl', function($scope,ls,$ionicPopup,$timeout) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.logout = function(){
    localStorage.clear();
    ls.set('logStatus','0');
    var myPopup = $ionicPopup.show({
      title: '退出成功',
      scope: $scope,
    });
    $timeout(function() {
      myPopup.close();
    }, 2000);
  }
});
