angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 ,pre:'这里是简介这里是简介，这里是简介',img:'img/avatar.png',title:'This is title'},
    { title: 'Chill', id: 2 ,pre:'这里是简介这里是简介，这里是简介',img:'img/avatar.png',title:'This is title'},
    { title: 'Dubstep', id: 3 ,pre:'这里是简介这里是简介，这里是简介',img:'img/avatar.png',title:'This is title'},
    { title: 'Indie', id: 4 ,pre:'这里是简介这里是简介，这里是简介',img:'img/avatar.png',title:'This is title'},
    { title: 'Rap', id: 5 ,pre:'这里是简介这里是简介，这里是简介',img:'img/avatar.png',title:'This is title'},
    { title: 'Cowbell', id: 6 ,pre:'这里是简介这里是简介，这里是简介',img:'img/avatar.png',title:'This is title'},
    { title: 'what', id: 7 ,pre:'这里是简介这里是简介，这里是简介',img:'img/avatar.png',title:'This is title'}
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams, $ionicNavBarDelegate) {
   $scope.goBack = function(){
       $ionicNavBarDelegate.back();
   }
});
