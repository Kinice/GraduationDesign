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

    $ionicModal.fromTemplateUrl('templates/reg.html', {
        scope: $scope
    }).then(function(modal){
        $scope.modalReg = modal;
    });
    //reg open
    $scope.reg = function(){
      $scope.modalLogin.hide();
      $scope.modalReg.show();
    }
    $scope.closeReg = function(){
      $scope.modalReg.hide();
    }
    $scope.doReg = function(){
      var values = JSON.parse(document.getElementById('regValues').value);
      $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          showDelay: 0
      });
       $.post('http://kinice.top/api/reg',values,function(data){
         $ionicLoading.hide();
         if(data == 'error1'){
           var myPopup = $ionicPopup.show({
             title: '用户名已存在',
             scope: $scope,
           });
           $timeout(function() {
             myPopup.close();
             $scope.modalLogin.hide();
           }, 2000);
         }else if(data == 'error2'){
           var myPopup = $ionicPopup.show({
             title: '数据库读取出错',
             scope: $scope,
           });
           $timeout(function() {
             myPopup.close();
             $scope.modalLogin.hide();
           }, 2000);
         }else if(data == 'success'){
           var myPopup = $ionicPopup.show({
             title: '注册成功',
             scope: $scope,
           });
           $timeout(function() {
             myPopup.close();
             $scope.modalLogin.hide();
           }, 2000);
          $scope.modalReg.hide();
          ls.set('logStatus','1');
          ls.set('username',values.name);
          ls.set('email',values.email);
         }
       });
    }
    //post and login open
    $scope.open = function(){
      var bool = ls.get('logStatus');
      if(bool=='1'){
        $scope.modalPost.show();
      }else if(bool=='0'){
        $scope.modalLogin.show();
        var myPopup = $ionicPopup.show({
          title: '请先登录',
          scope: $scope,
        });
        $timeout(function() {
          myPopup.close();
        }, 2000);
      }
    }

    $scope.closePost = function(){
      $scope.modalPost.hide();
    };

    $scope.doPost = function(){
        var values = JSON.parse(document.getElementById('postValue').value);
        values.name = ls.get('username');
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 0
        });
        $.post('http://kinice.top/api/post',values,function(data){
           $ionicLoading.hide();
           if(data == 'success'){
             var myPopup = $ionicPopup.show({
               title: '发布成功',
               scope: $scope,
             });
             $timeout(function() {
               myPopup.close();
               $scope.modalPost.hide()
             }, 2000);
           }else{
             var myPopup = $ionicPopup.show({
               title: '发布失败',
               scope: $scope,
             });
             $timeout(function() {
               myPopup.close();
             }, 2000);
           }
        });
    };
    //login
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
            location.reload(true);
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
.controller('TagCtrl', function($scope,$http,$stateParams,$ionicLoading){
  var get = function(tag){
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 200,
        showDelay: 0
    });
    $http.get('http://kinice.top/api/articleList/'+tag)
    .success(function(data){
      $scope.data = data;
      $ionicLoading.hide();
    });
  }
  get($stateParams.tag);
})
.controller('ChatDetailCtrl', function($scope, $http, $stateParams, $ionicLoading) {
  var get = function(id) {
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 200,
        showDelay: 0
    });
    $http.get('http://kinice.top/api/article/'+id)
    .success(function(data) {
      $scope.post = data;
      $ionicLoading.hide();
    });
  }
  get($stateParams.id);
})
.controller('CommentsCtrl', function($scope, $ionicPopup, $http, $timeout, $stateParams, $ionicLoading, ls){
    var get = function(id) {
      $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          showDelay: 0
      });
    $http.get('http://kinice.top/api/article/'+id)
    .success(function(data) {
      $scope.post = data;
      $ionicLoading.hide();
    });
  }
  $scope.comment = function($event){
    if($event.keyCode != 13){
      return false;
    }else{
      var comment = document.getElementById('commentinput').value;
      $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          showDelay: 0
      });
      if(comment){
        $.post('http://kinice.top/api/article/'+$stateParams.id,{
          'uname':ls.get('username'),
          'email':ls.get('email')||'szp93@126.com',
          'content':comment
        },function(data){
          console.log(data);
          $ionicLoading.hide();
          if(data == 'success'){
            var myPopup = $ionicPopup.show({
              title: '评论成功',
              scope: $scope,
            });
            $timeout(function() {
              myPopup.close();
            }, 2000);
          }else{
            var myPopup = $ionicPopup.show({
              title: '评论失败',
              scope: $scope,
            });
            $timeout(function() {
              myPopup.close();
            }, 2000);
          }
        });
      }
    }
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
.controller('MyCtrl', function($scope,$http,$stateParams,$ionicLoading,ls){
  var get = function(name){
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 200,
        showDelay: 0
    });
    $http.get('http://kinice.top/api/getArticlesByName/'+name)
    .success(function(data){
      $scope.data = data;
      $ionicLoading.hide();
    });
  }
  get(ls.get('username'));
})

.controller('AccountCtrl', function($scope,ls,$ionicPopup,$timeout){
  $scope.logStatus = ls.get('logStatus') == '1'?true:false;
  $scope.logout = function(){
    localStorage.clear();
    ls.set('logStatus','0');
    var myPopup = $ionicPopup.show({
      title: '退出成功',
      scope: $scope,
    });
    $timeout(function() {
      myPopup.close();
      location.reload(true);
    }, 2000);

  }
})

.controller('PicCtrl', function($scope, $cordovaCamera){

  document.addEventListener("deviceready", function () {

    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      alert(err);
    });

  }, false);
});
