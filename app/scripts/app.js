// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'LocalStorageModule', 'pascalprecht.translate'])

  .run(function ($ionicPlatform) {
    'use strict';
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }).config(['$stateProvider', '$urlRouterProvider', '$translateProvider', '$ionicConfigProvider', 'localStorageServiceProvider',
    function ($stateProvider, $urlRouterProvider, $translateProvider, $ionicConfigProvider, localStorageServiceProvider) {
      'use strict';
      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider
        // setup an abstract state for the tabs directive
        .state('list', {
          url: '/',
          templateUrl: 'templates/list.html',
          controller: 'ListCtrl as list'
        })
        .state('detail', {
          url: '/detail/:id',
          templateUrl: '/templates/detail.html',
          controller: 'DetailCtrl as detail'
        });
      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/');

      localStorageServiceProvider
        .setPrefix('checklist')
        .setStorageType('localStorage');

      //$translateProvider.preferredLanguage('en');
      // try to find out preferred language by yourself
      $translateProvider.useStaticFilesLoader({
        prefix: '/locales/locale-',
        suffix: '.json'
      });

      $translateProvider.determinePreferredLanguage();
      $translateProvider.fallbackLanguage('zh_CN');

      $ionicConfigProvider.backButton.text('{{"BACK" | translate}}');
    }]);
