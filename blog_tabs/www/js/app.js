angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform,ls) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    if(ls.get('username')){
      ls.set('logStatus','1');
    }else{
      ls.set('logStatus','0');
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.platform.android.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');

  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'AppCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.card', {
      url: '/card',
      views: {
          'tab-card': {
              templateUrl: 'templates/tab-card.html',
              controller: 'SearchCtrl'
          }
      }
      })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.search-detial',{
      url: '/search/:id',
      views: {
        'tab-card':{
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('tab.chat-comment',{
      url: '/chat/comment/:id',
      views: {
        'tab-chats':{
          templateUrl: 'templates/comments.html',
          controller: 'CommentsCtrl'
        }
      }
    })
    .state('tab.dash-detial',{
      url: '/dashs/:id',
      views: {
        'tab-dash':{
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chat/:id',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('tab.chat-tag',{
      url: '/chats/:tag',
      views:{
        'tab-chats':{
          templateUrl:'templates/tag.html',
          controller:'TagCtrl'
        }
      }
    })
    .state('tab.my',{
      url: '/account/my',
      views:{
        'tab-account':{
          templateUrl:'templates/my.html',
          controller:'MyCtrl'
        }
      }
    })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
